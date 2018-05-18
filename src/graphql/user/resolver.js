module.exports = {
  Query: {},
  Mutation: {
    connect: (parent, args, ctx) => {
      if (!ctx.user) throw new Error("not authorized")
      return ctx.models.User.connect(args, ctx)
    }
  }
}
