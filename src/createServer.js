const { GraphQLServer } = require("graphql-yoga")

const { models, typeDefs, resolvers, directiveResolvers } = require("./graphql")

module.exports = ({ auth, db, stripe }) => {
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    directiveResolvers,
    context: async ({ request }) => {
      const { authorization = "", vendor } = request.headers
      const token = authorization.split("Bearer ")[1]
      const user = token ? await auth.verifyIdToken(token) : null

      return {
        auth,
        db,
        models,
        stripe,
        user,
        vendor // Is it secure to expose Stripe account ids?
      }
    }
  })

  // TODO: Handle incoming Stripe events
  // https://stripe.com/docs/api#events
  // https://stripe.com/docs/webhooks
  server.post("/stripe/events", async (req, res) => {
    throw new Error("Not implemented")
    // Push google analytics event
    // Push notification
  })

  // TODO: Add Apollo Engine
  // https://www.apollographql.com/engine

  return server
}
