/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import { importMap } from '../importMap.js'
import config from '@payload-config'

/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { RootPage } from '@payloadcms/next/views'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, importMap, searchParams })

export default Page
