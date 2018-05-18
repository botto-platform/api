module.exports = {
  User: {
    connect: async ({ code }, { db, user, stripe }) => {
      if (!user) throw new Error("not authorized")

      const { stripe_user_id } = await stripe.connect(code)
      await db
        .ref("users")
        .child(user.uid)
        .set({ stripeId: stripe_user_id })

      return stripe_user_id
    }
  }
}
