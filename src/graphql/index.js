const path = require("path")
const {
  mergeResolvers,
  mergeTypes,
  fileLoader
} = require("merge-graphql-schemas")

const resolversArray = fileLoader(path.join(__dirname, "./**/*resolver.*"))
const modelsArray = fileLoader(path.join(__dirname, "./**/*model.*"))
const typesArray = fileLoader(path.join(__dirname, "./**/*.graphql"))

const resolvers = mergeResolvers(resolversArray)
const models = mergeResolvers(modelsArray)
const typeDefs = mergeTypes(typesArray)

module.exports = { typeDefs, resolvers, models }
