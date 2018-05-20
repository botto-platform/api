module.exports = {
  Event: {
    list: ({ stripe_account, limit = 10 }, ctx) =>
      ctx.stripe.events
        .list({ limit }, { stripe_account })
        .then(({ data }) => data)
  }
}
