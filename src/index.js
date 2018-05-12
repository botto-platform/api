const { GraphQLServer } = require("graphql-yoga")

const config = require("../config")
const stripe = require("stripe")(config.stripe.secretKey)

const { typeDefs, resolvers } = require("./graphql")

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => {
    return {
      stripe,
      vendor: {
        stripeId: req.request.get("vendor")
      }
    }
  }
})

server.start(() => console.log("Server is running on localhost:4000"))
