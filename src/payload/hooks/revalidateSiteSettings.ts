import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

export const revalidateSiteSettings: GlobalAfterChangeHook = async ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating site-settings`)
  revalidateTag('site-settings')
  return doc
}
