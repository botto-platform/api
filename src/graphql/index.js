const path = require("path")
const {
  mergeResolvers,
  mergeTypes,
  fileLoader
} = require("merge-graphql-schemas")

const resolversArray = fileLoader(path.join(__dirname, "./**/*resolver.*"))
const typesArray = fileLoader(path.join(__dirname, "./**/*.graphql"))

const resolvers = mergeResolvers(resolversArray)
const typeDefs = mergeTypes(typesArray)

module.exports = { typeDefs, resolvers }
