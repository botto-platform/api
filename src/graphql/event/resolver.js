module.exports = {
  Mutation: {},
  Query: {
    // TODO: @auth directive
    events: (parent, args, ctx) => ctx.models.Event.list(args, ctx)
  },
  Event: {}
}
