const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./schema/typeDefs')
const { resolvers } = require('./schema/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { name: "Anastasia" }
  },
})

server.listen().then(({ url }) => {
  console.log(`Yout API is running at ${url}`)
})
