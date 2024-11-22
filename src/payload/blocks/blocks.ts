import { DisqusComments } from '@contentql/core/client'
import dynamic from 'next/dynamic'

// import { Details } from './Details'
// import { FormBlock } from './Form'
// import { Home } from './Home'
// import { List } from './List'
// import { Newsletter } from './Newsletter'

const Details = dynamic(() => import('./Details/component'), { ssr: false })
const FormBlock = dynamic(() => import('./Form/component'), { ssr: false })
const Home = dynamic(() => import('./Home/component'), { ssr: false })
const List = dynamic(() => import('./List/component'), { ssr: false })
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
