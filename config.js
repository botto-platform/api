const {
  FIREBASE_API_KEY,
  STRIPE_CLIENT_ID,
  STRIPE_SECRET_KEY,
  STRIPE_PUBLIC_KEY
} = process.env

module.exports = {
  firebase: {
    apiKey: FIREBASE_API_KEY,
    authDomain: "botto-api.firebaseapp.com",
    projectId: "botto-api",
    storageBucket: "botto-api.appspot.com",
    messagingSenderId: "979940090208",
    databaseURL: "https://botto-api.firebaseio.com",
    credential: require("./key.json")
  },
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
