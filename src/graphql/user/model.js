module.exports = {
  User: {
    signin: async ({ email, password }, { auth, db }) =>
      auth.signInWithEmailAndPassword(email, password).then(async res => {
        console.log(res.user)
        await db
          .ref("users")
          .child(res.user.uid)
          .update({ email: res.user.email })
        const token = await res.user.getIdToken()
        return { token }
      }),
    signup: async ({ email, password }, { db, auth }) =>
      auth.createUserWithEmailAndPassword(email, password).then(snap => {
        const { email, uid } = snap.val()
        return db
          .ref("users")
          .child(uid)
          .set({ id: uid, email })
      }),
    connect: async ({ code }, { db, user, stripe }) => {
      const { stripe_user_id, livemode, ...rest } = await stripe.connect(code)
      await db
        .ref("users")
        .child(user.uid)
        .update({ stripe_user_id, livemode })
      console.log(rest)

      return stripe_user_id
    },
    query: ({ id }, { db }) => {
      // return { id, email: "asd" }
      return db
        .ref("users")
        .child(id)
        .once("value")
        .then(snap => {
          console.log(snap.val())
          const user = snap.val()

          console.log("user", { id, ...user })

          return { id, ...user }
        })
    }
  }
}
