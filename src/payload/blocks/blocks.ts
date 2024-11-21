import { DisqusComments } from '@contentql/core/client'
import dynamic from 'next/dynamic'

// import { Details } from './Details';
// import { FormBlock } from './Form';
// import { Home } from './Home';
// import { List } from './List';
// import { Newsletter } from './Newsletter';

const Details = dynamic(() => import('./Details/component'))
const FormBlock = dynamic(() => import('./Form/component'))
const Home = dynamic(() => import('./Home/component'))
const List = dynamic(() => import('./List/component'))
const Newsletter = dynamic(() => import('./Newsletter/Component'))

export const blocksJSX = {
  Home,
  Details,
  List,
  Newsletter,
  DisqusComments,
  FormBlock,
}
