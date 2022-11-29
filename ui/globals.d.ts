/* eslint-disable no-unused-vars */
// Declaring this interface provides type safety for message keys
type Messages = typeof import('./messages/en-US.json')
declare interface IntlMessages extends Messages {}

type Repository = {
  name: string
  description: string
  url: string
  stars: number
  language: string
}

type Article = {
  title: string
  description: string
  url: string
}

type Issue = {
  id: number
  title: string
  publishedDate?: string
  articles: Article[]
}
