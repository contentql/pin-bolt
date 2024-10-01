import { env } from '@env'
import { Media } from '@payload-types'
import { toast } from 'sonner'

async function uploadMedia(file: File): Promise<Media | undefined> {
  if (!file) {
    toast.info(`please select a file to upload`)
    throw new Error(`Please select a file to upload`)
  }

  const formData = new FormData()

  formData.append('file', file)

  try {
    const response = await fetch(env.NEXT_PUBLIC_PUBLIC_URL + '/api/media', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const { doc }: { doc: Media } = await response.json()

    return doc
  } catch (error) {
    if (error instanceof Error) {
      console.error('Upload failed', error.message)
    }
  }
}

export default uploadMedia
