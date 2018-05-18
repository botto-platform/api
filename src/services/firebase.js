const admin = require("firebase-admin")

module.exports = config => {
  admin.initializeApp({
    credential: admin.credential.cert(config.credential),
    databaseURL: config.databaseURL
  })

  return {
    auth: admin.auth(),
    db: admin.database()
  }
}
