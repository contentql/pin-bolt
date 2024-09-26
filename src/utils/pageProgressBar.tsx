'use client'

import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'

/**
 * `PageLoader` is a React component that automatically displays a progress bar when navigating between pages.
 * It utilizes nProgress to display the progress bar and handles both anchor clicks and history state changes.
 *
 * @returns {null} This component does not render anything visible to the DOM.
 *
 * @example
 * ```tsx
 * import { PageLoader } from './PageLoader'
 *
 * function MyApp() {
 *   return (
 *     <>
 *       <PageLoader />
 *       <MyComponent />
 *     </>
 *   )
 * }
 * ```
 */
export const PageLoader = (): null => {
  useEffect(() => {
    nProgress.configure({ showSpinner: false })

    const handleAnchorClick = (event: Event) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href
      const currentUrl = window.location.href
      if (targetUrl !== currentUrl) {
        nProgress.start()
      }
    }

    const handleMutation = () => {
      const anchorElements = document.querySelectorAll('a[href]')
      anchorElements.forEach(anchor =>
        anchor.addEventListener('click', handleAnchorClick),
      )
    }

    const mutationObserver = new MutationObserver(handleMutation)
    mutationObserver.observe(document, { childList: true, subtree: true })

    const handlePopState = () => {
      nProgress.done()
    }

    window.addEventListener('popstate', handlePopState)

    const originalPushState = window.history.pushState
    window.history.pushState = function (
      data: any,
      title: string,
      url?: string | URL | null,
    ): void {
      nProgress.done()
      return originalPushState.apply(window.history, [data, title, url])
    }

    const originalReplaceState = window.history.replaceState
    window.history.replaceState = function (
      data: any,
      title: string,
      url?: string | URL | null,
    ): void {
      nProgress.done()
      return originalReplaceState.apply(window.history, [data, title, url])
    }

    return () => {
      mutationObserver.disconnect()
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return null
}
