import { RequiredDataFromCollectionSlug } from 'payload'

export type AuthorDataType = RequiredDataFromCollectionSlug<'users'>

export const authorsData: AuthorDataType[] = [
  {
    username: 'author-1',
    email: 'author.1@gmail.com',
    password: 'Welcome@123',
    role: 'author',
  },
  {
    username: 'author-2',
    email: 'author.2@gmail.com',
    password: 'Welcome@123',
    role: 'author',
  },
  {
    username: 'author-3',
    email: 'author.3@gmail.com',
    password: 'Welcome@123',
    role: 'author',
  },
  {
    username: 'author-4',
    email: 'author.4@gmail.com',
    password: 'Welcome@123',
    role: 'author',
  },
  {
    username: 'author-5',
    email: 'author.5@gmail.com',
    password: 'Welcome@123',
    role: 'author',
  },
  {
    username: 'author-6',
    email: 'author.6@gmail.com',
    password: 'Welcome@123',
    role: 'author',
  },
]
