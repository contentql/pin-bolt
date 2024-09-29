'use client'

import { useDebouncedEffect } from '@payloadcms/ui'
import {
  type Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  createAction,
  useKBar,
  useMatches,
  useRegisterActions,
} from 'kbar'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { trpc } from '@/trpc/client'

import Button from './common/Button'

const CommandBar = () => {
  const [formattedSearchResults, setFormattedSearchResults] = useState<
    Action[]
  >([])

  // if we return state that time only getting the searchQuery, visualState
  const { query, searchQuery, visualState } = useKBar(state => {
    return state
  })
  // const debouncedSearchTerm = useDebounce(searchQuery, 800)

  const { mutate: globalSearchMutate } = trpc.search.globalSearch.useMutation({
    // during mutation adding searching text
    onMutate: () => {
      const loadingAction = createAction({
        name: `Searching...`,
        subtitle: searchQuery,
      })

      setFormattedSearchResults([loadingAction])
    },
    // on success adding those results
    onSuccess: data => {
      if (data && data.length > 0) {
        const list = data.map(result => {
          return {
            id: result.id,
            name: result.parsedValues?.title || '',
            subtitle: result.parsedValues?.description || '',
            perform: () => alert(result?.parsedValues?.path),
            section: result?.parsedValues?.category,
            priority: result.priority as number,
          }
        })

        setFormattedSearchResults(list)
      } else {
        const noResultsAction = createAction({
          name: `No results Found!`,
          subtitle: searchQuery,
        })

        setFormattedSearchResults([noResultsAction])
      }
    },
    // on error adding no results found
    onError: () => {
      const noResultsAction = createAction({
        name: `No results Found!`,
        subtitle: searchQuery,
      })

      setFormattedSearchResults([noResultsAction])
    },
  })

  useDebouncedEffect(
    () => {
      // not calling the API on initial mount
      if (visualState === 'hidden') return

      globalSearchMutate({ search: searchQuery })
    },
    800,
    [searchQuery],
  )

  // This hook will update the kbar actions
  useRegisterActions(formattedSearchResults, [formattedSearchResults])

  const { results } = useMatches()

  return (
    <>
      <Button
        size='icon'
        onClick={() => {
          // in case of no results found clearing the search results
          if (formattedSearchResults.length > 0) {
            formattedSearchResults.forEach(item => {
              if (item?.name?.includes('No results found')) {
                setFormattedSearchResults([])
                return
              }
            })
          }

          // this will toggle the search-bar
          query.toggle()
        }}>
        <Search size={16} />
      </Button>

      <KBarPortal>
        <KBarPositioner className='z-[70] h-full bg-black/50 backdrop-blur-sm'>
          <KBarAnimator className='w-full max-w-lg'>
            <div className='mx-auto w-full rounded-lg bg-popover p-4'>
              <div className='relative'>
                <Search
                  size={20}
                  className='absolute left-2 top-2.5 text-secondary'
                />

                <KBarSearch
                  defaultPlaceholder='Search'
                  className='block w-full rounded-md border bg-inherit stroke-slate-600 py-2 pl-9  pr-3.5 text-secondary outline-none placeholder:text-secondary sm:text-sm sm:leading-6'
                />
              </div>

              {results && results.length > 0 ? (
                <div className='mt-2'>
                  <KBarResults
                    items={results}
                    onRender={({ item, active }) =>
                      typeof item === 'string' ? (
                        <div className='pb-2 text-sm capitalize text-secondary'>
                          {item}
                        </div>
                      ) : (
                        <div
                          className='block rounded-md p-2 hover:cursor-pointer data-[active-item=true]:bg-secondary/10'
                          data-active-item={active}>
                          <p>{item.name}</p>

                          {/* here hiding the description when no results found or during API loading */}
                          {!['No results Found!', 'Searching'].includes(
                            item.name,
                          ) && (
                            <p className='overflow-hidden text-ellipsis text-nowrap text-sm text-secondary'>
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      )
                    }
                  />
                </div>
              ) : null}
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </>
  )
}

export default CommandBar
