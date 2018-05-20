module.exports = {
  Product: {
    list: ({ stripe_account, limit = 10 }, ctx) => {
      // if (!stripe_account) throw new Error("No vendor id passed")
      return ctx.stripe.products
        .list({ limit }, { stripe_account })
        .then(({ data }) => data)
    }
  }
}
