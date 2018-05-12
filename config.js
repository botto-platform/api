"use strict"

module.exports = {
  // App name.
  appName: "b0tt0",
  port: 4000,
  stripe: {
    clientId: "ca_CjEXuPBQbWvbsUWGIkz6sSclMnvLIcTK",
    secretKey: "sk_test_UUaImoZfh5JMtRPiYAfbpJnf",
    publishableKey: "pk_test_wz9EjKBqEABZWp9wNTYOgktc",
    authorizeUri: "https://connect.stripe.com/auth/authorize",
    tokenUri: "https://connect.stripe.com/oauth/token"
  },

  // Configuration for Google Cloud (only useful if you want to deploy to GCP).
  gcloud: {
    projectId: "botto-api"
  }
}
