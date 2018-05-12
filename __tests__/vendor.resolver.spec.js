const { vendor } = require("../src/graphql/vendor/resolver").Query

describe("Vendor", () => {
  const context = {
    stripe: {
      orders: {
        list: jest.fn().mockReturnValue({
          data: []
        })
      }
    },
    vendor: { stripeId: "foo" }
  }
  it("should list vendor orders", async done => {
    const data = {}
    const actual = await vendor(null, data, context)
    const { calls } = context.stripe.orders.list.mock

    expect(calls[0][0]).toEqual({ limit: 10 })
    expect(calls[0][1]).toEqual({ stripe_account: context.vendor.stripeId })
    done()
  })
})
