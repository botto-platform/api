module.exports = {
  Mutation: {},
  Query: {
    async vendor(parent, args, ctx, info) {
      if (!ctx.vendor.stripeId) {
        throw new Error("No vendor id")
      }
      const orders = await ctx.stripe.orders.list(
        { limit: 10 },
        { stripe_account: ctx.vendor.stripeId }
      )

      return {
        orders: orders.data
      }
    }
  }
}
