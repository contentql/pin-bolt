import { Media } from '@payload-types'
import { toast } from 'sonner'

async function uploadMedia(file: File) {
  if (!file) {
    toast.info(`please select a file to upload`)
    throw new Error(`Please select a file to upload`)
  }

  const formData = new FormData()

  formData.append('file', file)

  try {
    const url = typeof window !== 'undefined' ? window.location.origin : ''

    const response = await fetch(url + '/api/media', {
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

    throw new Error('Failed to upload file')
  }
}

export default uploadMedia
