import gql from 'graphql-tag'

import { client } from '../plugins/apollo'

export const fetchRepositories = async () => {
  let issues: Array<{
    repositoryName: string
    title: string
    url: string
    createdAt: string
    updatedAt: string
  }> = []
  let pullRequests: Array<{
    repositoryName: string
    title: string
    url: string
    createdAt: string
    updatedAt: string
  }> = []

  await client
    .query({
      query: gql`
        {
          viewer {
            login
            repositories(last: 80) {
              edges {
                node {
                  id
                  url
                  name
                  issues(
                    last: 40
                    orderBy: { field: UPDATED_AT, direction: DESC }
                    filterBy: { states: OPEN }
                  ) {
                    nodes {
                      title
                      url
                      state
                      createdAt
                      updatedAt
                    }
                  }
                  pullRequests(
                    last: 40
                    orderBy: { field: UPDATED_AT, direction: DESC }
                    states: OPEN
                  ) {
                    nodes {
                      title
                      url
                      state
                      createdAt
                      updatedAt
                    }
                  }
                }
              }
            }
          }
        }
      `
    })
    .then((res) => {
      res.data.viewer.repositories.edges.map((e: any) => {
        e.node.issues.nodes.map((n: any) => {
          issues.push({
            repositoryName: e.node.name,
            title: n.title,
            url: n.url,
            createdAt: n.createdAt,
            updatedAt: n.updatedAt
          })
        })
      })
      res.data.viewer.repositories.edges.map((e: any) => {
        e.node.pullRequests.nodes.map((n: any) => {
          pullRequests.push({
            repositoryName: e.node.name,
            title: n.title,
            url: n.url,
            createdAt: n.createdAt,
            updatedAt: n.updatedAt
          })
        })
      })
    })

  return {
    issues: issues.sort((a, b) => {
      if (a.updatedAt < b.updatedAt) return 1
      if (a.updatedAt > b.updatedAt) return -1
      return 0
    }),
    pullRequests: pullRequests.sort((a, b) => {
      if (a.updatedAt < b.updatedAt) return 1
      if (a.updatedAt > b.updatedAt) return -1
      return 0
    })
  }
}
