const { ApolloClient } = require('apollo-client')
const { HttpLink } = require('apollo-link-http')
const { ApolloLink, concat } = require('apollo-link')
const { InMemoryCache } = require('apollo-cache-inmemory')
const fetch = require('node-fetch')

export const GITHUB_USER: string = 'jiyuujin'
export const GITHUB_REPO_NAME: string = 'admin'
const GITHUB_API_V4: string = 'https://api.github.com/graphql'

export const createGithubClient = () => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: `bearer ${process.env.NUXT_APP_GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v4.idl',
      }
    })
    return forward(operation)
  })

  const httpLink = new HttpLink({
    uri: GITHUB_API_V4,
    fetch
  })

  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache()
  })      
}