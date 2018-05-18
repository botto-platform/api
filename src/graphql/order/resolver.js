module.exports = {
  Mutation: {
    createOrder: (parent, args, ctx) => ctx.models.Order.create(args, ctx),
    payOrder: (parent, args, ctx) => ctx.models.Order.pay(args, ctx),
    pushOrder: (parent, args, ctx) => ctx.models.Order.push(args, ctx)
  },
  Query: {
    orders: (parent, args, ctx) => ctx.models.Order.list(args, ctx)
  }
}
