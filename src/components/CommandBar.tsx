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
import { useState } from 'react'

import { trpc } from '@/trpc/client'

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

  // useEffect(() => {

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedSearchTerm, globalSearchMutate])

  // This hook will update the kbar actions
  useRegisterActions(formattedSearchResults, [formattedSearchResults])

  const { results } = useMatches()

  return (
    <>
      <button
        type='button'
        className='rounded-full bg-primary p-2 text-sm font-medium text-white hover:bg-primary/80 lg:static lg:bottom-0 lg:right-0'
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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-4 stroke-slate-900'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </button>

      <KBarPortal>
        <KBarPositioner className='z-50 h-full bg-black/50 backdrop-blur-sm'>
          <KBarAnimator className='w-full max-w-lg'>
            <div className='mx-auto w-full rounded-lg bg-slate-900 p-4'>
              <div className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='absolute left-2 top-2.5 size-5 stroke-slate-600'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>

                <KBarSearch
                  defaultPlaceholder='Search'
                  className='block w-full rounded-md border bg-inherit stroke-slate-600 py-2 pl-9  pr-3.5 text-slate-400 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6'
                />
              </div>

              {results && results.length > 0 ? (
                <div className='mt-2'>
                  <KBarResults
                    items={results}
                    onRender={({ item, active }) =>
                      typeof item === 'string' ? (
                        <div className='pb-2 text-sm capitalize text-slate-400'>
                          {item}
                        </div>
                      ) : (
                        <div
                          className='block rounded-md p-2 hover:cursor-pointer data-[active-item=true]:bg-slate-400/10'
                          data-active-item={active}>
                          <p>{item.name}</p>

                          {/* here hiding the description when no results found or during API loading */}
                          {!['No results Found!', 'Searching'].includes(
                            item.name,
                          ) && (
                            <p className='overflow-hidden text-ellipsis text-nowrap text-sm text-slate-500'>
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
