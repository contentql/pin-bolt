import { payloadSlateToHtmlConfig, slateToHtml } from '@slate-serializers/html'
import { Element } from 'domhandler'
import DOMPurify from 'isomorphic-dompurify'

type ContentType = {
  [k: string]: unknown
}[]

/**
 *
 * Pass the content field from the blog collection & get parsed HTML
 */
export const getHTML = (content: ContentType) => {
  const html = slateToHtml(content || [], {
    ...payloadSlateToHtmlConfig,
    markMap: {
      ...payloadSlateToHtmlConfig.markMap,
      mark: ['mark'],
      kbd: ['kbd'],
      iframe: ['iframe'],
      pre: ['pre'],
      strong: ['strong'],
    },
    markTransforms: {
      'custom-iframe': ({ node }) => {
        return new Element('iframe', {
          src: node.text,
        })
      },
    },
    elementTransforms: {
      ...payloadSlateToHtmlConfig.elementTransforms,
      upload: ({ node }) => {
        // for video returning video element
        if (node && node?.value) {
          const mimeType = node?.value?.mimeType ?? ''
          if (mimeType.includes('video')) {
            return new Element('video', {
              src: node?.value?.url,
              controls: 'true',
            })
          }
        }

        return payloadSlateToHtmlConfig.elementTransforms.upload({ node })
      },
    },
  })

  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target'], // Allow the "target" attribute
    ADD_TAGS: ['iframe'], // You can also add other tags if needed (optional)
  })
}
