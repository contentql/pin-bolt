// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import { DetailsConfig } from './Details'
import { FormConfig } from './Form'
import { HomeConfig } from './Home'
import { ListConfig } from './List'
import { NewsletterConfig } from './Newsletter'

// Exporting an object that maps block names (as keys) to their corresponding JSX components (as values)
// This object allows dynamic rendering of components based on the block names

// Exporting an array that consolidates all block configurations
// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocksConfig = [
  HomeConfig,
  DetailsConfig,
  ListConfig,
  NewsletterConfig,
  FormConfig,
]
