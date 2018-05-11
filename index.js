const { graphqlHandler, graphqlError } = require("graphql-serverless")
const { transpileSchema } = require("graphql-s2s").graphqls2s
const { app } = require("webfunc")
const { makeExecutableSchema } = require("graphql-tools")
const glue = require("schemaglue")

const { schema, resolver } = glue("./src/graphql")

const executableSchema = makeExecutableSchema({
  typeDefs: transpileSchema(schema),
  resolvers: resolver
})

const graphqlOptions = {
  schema: executableSchema,
  graphiql: {
    endpoint: "/graphiql"
  },
  context: {
    graphqlError
  }
}

app.all(["/", "/graphiql"], graphqlHandler(graphqlOptions))

eval(app.listen("app", 4000))

if (process.env.NODE_ENV === "test") {
  module.exports.api = app
}
