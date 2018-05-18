module.exports = {
  Order: {
    list: ({ limit = 10 }, ctx) =>
      ctx.stripe.orders
        .list({ limit }, { stripe_account: ctx.vendor })
        .then(({ data }) => data),

    create: ({ currency, email, items }, ctx) =>
      ctx.stripe.orders.create(
        {
          currency,
          items,
          email,
          metadata: {
            status: "created"
          }
        },
        { stripe_account: ctx.vendor }
      ),

    pay: ({ id, source }, ctx) =>
      ctx.stripe.orders.pay(
        id,
        {
          source: "tok_visa" || source.id // enable in production
        },
        { stripe_account: ctx.vendor }
      ),

    push: ({ id, action, status }, ctx) =>
      ctx.stripe.orders.update(
        id,
        {
          metadata: { status: pushStatus(status, action) }
        },
        { stripe_account: ctx.vendor }
      )
  }
}

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
