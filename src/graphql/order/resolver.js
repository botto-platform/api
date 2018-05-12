module.exports = {
  Mutation: {
    async createOrder(parent, args, ctx, info) {
      const { currency, email, items } = args
      const order = await ctx.stripe.orders.create(
        {
          currency,
          items,
          email,
          metadata: {
            status: "created"
          }
        },
        { stripe_account: ctx.vendor.stripeId }
      )
      // push subscription
      return order
    },
    async payOrder(parent, { id, source }, ctx, info) {
      return ctx.stripe.orders.pay(
        id,
        {
          source: "tok_visa"
        },
        { stripe_account: ctx.vendor.stripeId }
      )
    },
    async pushOrder(parent, { id, action, status }, ctx, info) {
      return ctx.stripe.orders.update(
        id,
        {
          metadata: { status: pushStatus(status, action) }
        },
        { stripe_account: ctx.vendor.stripeId }
      )
    }
  },
  Query: {
    // order: _ => ({})
  }
}

const stripeActions = ["fulfilled", "cancelled"]
function pushStatus(current, action) {
  const statusMap = {
    created: {
      PUSH: "processing",
      CANCEL: "cancelled"
    },
    processing: {
      PUSH: "pickup_available",
      CANCEL: "cancelled"
    },
    pickup_available: {
      PUSH: "fulfilled"
    }
  }
  return statusMap[current][action]
}
