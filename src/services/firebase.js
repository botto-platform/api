global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const { firebase } = require("@firebase/app")
require("@firebase/auth")
const admin = require("firebase-admin")

module.exports = config => {
  firebase.initializeApp(config)
  admin.initializeApp({
    projectId: config.projectId,
    credential: admin.credential.cert(config.credential),
    databaseURL: config.databaseURL
  })

  const db = admin.database()
  const auth = firebase.auth()

  auth.verifyIdToken = token =>
    admin
      .auth()
      .verifyIdToken(token)
      .catch(err => console.log(err))

  return {
    auth,
    db
  }
}
