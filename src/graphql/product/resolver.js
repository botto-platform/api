module.exports = {
  Mutation: {},
  Query: {
    products: (parent, args, ctx) =>
      ctx.models.Product.list({ ...args, stripe_account: ctx.vendor }, ctx)
  },
  Product: {
    skus: ({ skus }) => skus.data
  }
}
