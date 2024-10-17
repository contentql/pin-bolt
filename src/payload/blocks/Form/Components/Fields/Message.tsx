import { getHTML } from '@/utils/slateToHTML'

interface MessageField {
  message?:
    | {
        [k: string]: unknown
      }[]
    | null
  id?: string | null
  blockName?: string | null
  blockType: 'message'
}
const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <div className=' text-base-content/80 prose-h1:text-primary-content prose-h2:text-primary-content prose-h3:text-primary-content prose-h4:text-primary-content prose-h5:text-primary-content prose-h6:text-primary-content prose !max-w-none text-justify md:prose-xl  [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded'>
      <div dangerouslySetInnerHTML={{ __html: getHTML(message!) }} />
    </div>
  )
}
export default Message
