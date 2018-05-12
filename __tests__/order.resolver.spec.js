const {
  createOrder,
  payOrder,
  pushOrder
} = require("../src/graphql/order/resolver").Mutation

describe("Orders", () => {
  const context = {
    stripe: {
      orders: {
        create: jest.fn(),
        pay: jest.fn(),
        update: jest.fn()
      }
    },
    vendor: { stripeId: "foo" }
  }
  describe("Create order", () => {
    it("should create a stripe order", async done => {
      const data = { email: "foo@bar.com", currency: "sek", items: [] }
      const actual = await createOrder(null, data, context)

      const { calls } = context.stripe.orders.create.mock
      expect(calls[0][0]).toEqual({ ...data, metadata: { status: "created" } })
      expect(calls[0][1]).toEqual({ stripe_account: context.vendor.stripeId })
      done()
    })
  })
  describe("Pay order", () => {
    it("should set a stripe order as paid", async done => {
      const data = { id: "foo", source: "tok_visa" }
      const actual = await payOrder(null, data, context)

      const { calls } = context.stripe.orders.pay.mock
      expect(calls[0][0]).toEqual(data.id)
      expect(calls[0][1]).toEqual({ source: data.source })
      expect(calls[0][2]).toEqual({ stripe_account: data.id })
      done()
    })
  })
  describe("Push order", () => {
    it("should set a stripe order metadata to next status", async done => {
      const data = { id: "foo", action: "PUSH", status: "created" }
      const actual = await pushOrder(null, data, context)

      const { calls } = context.stripe.orders.update.mock
      expect(calls[0][0]).toEqual(data.id)
      expect(calls[0][1]).toEqual({ metadata: { status: "processing" } })
      expect(calls[0][2]).toEqual({ stripe_account: context.vendor.stripeId })
      done()
    })
  })
})
