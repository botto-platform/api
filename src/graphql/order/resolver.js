exports.resolver = {
  Query: {
    orders(root, { id }, context) {
      return "[]"
    }
  },

  Mutation: {
    createOrder(root, { data }, context) {
      return {}
    }
  }
}
