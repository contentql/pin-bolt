import { DisqusComments } from '@contentql/core/client'
import dynamic from 'next/dynamic'

// import { Details } from './Details'
import List from './List/component'


const Details = dynamic(() => import('./Details/component'), {
  ssr: false,
  loading: () => <p className='text-text'>Loading Details...</p>,
})
const FormBlock = dynamic(() => import('./Form/component'), { ssr: false })
const Home = dynamic(() => import('./Home/component'), { ssr: false })
const Newsletter = dynamic(() => import('./Newsletter/Component'), {
  ssr: false,
})


export const blocksJSX = {
  Home,
  Details,
  List,
  Newsletter,
  DisqusComments,
  FormBlock,
}
