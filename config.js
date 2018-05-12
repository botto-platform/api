const { STRIPE_CLIENT_ID, STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } = process.env

module.exports = {
  appName: "b0tt0",
  port: 4000,
  stripe: {
    clientId: STRIPE_CLIENT_ID,
    secretKey: STRIPE_SECRET_KEY,
    publishableKey: STRIPE_PUBLIC_KEY,
    authorizeUri: "https://connect.stripe.com/auth/authorize",
    tokenUri: "https://connect.stripe.com/oauth/token"
  },
  gcloud: {
    projectId: "botto-api"
  }
}
