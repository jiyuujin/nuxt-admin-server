const { ApolloClient } = require('apollo-client')
const { HttpLink } = require('apollo-link-http')
const { ApolloLink, concat } = require('apollo-link')
const { InMemoryCache } = require('apollo-cache-inmemory')
const fetch = require('node-fetch')

const GITHUB_API_V4: string = 'https://api.github.com/graphql'

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `bearer ${process.env.NUXT_APP_GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v4.idl'
    }
  })
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: GITHUB_API_V4,
  fetch
})

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})
