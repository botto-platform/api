module.exports = {
  Query: {
    user: (parent, args, ctx) => {
      if (!ctx.user) throw new Error("not authorized")

      return ctx.models.User.query({ id: ctx.user.uid }, ctx)
    }
  },
  Mutation: {
    signup: (parent, args, ctx) => ctx.models.User.signup(args, ctx),
    signin: (parent, args, ctx) => ctx.models.User.signin(args, ctx),
    connect: (parent, args, ctx) => {
      if (!ctx.user) throw new Error("not authorized")
      return ctx.models.User.connect(args, ctx)
    }
  },
  User: {
    orders: (parent, args, ctx) => ctx.models.Order.list({ limit: 50 }, ctx),
    products: (parent, args, ctx) => ctx.models.Product.list({ limit: 50 }, ctx)
  }
}
