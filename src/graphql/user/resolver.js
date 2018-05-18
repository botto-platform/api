module.exports = {
  Query: {},
  Mutation: {
    connect: (parent, args, ctx) => ctx.models.User.connect(args, ctx)
  }
}
