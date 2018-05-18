const config = require("./config")
const createServer = require("./src/createServer")

const stripe = require("./src/services/stripe")(config.stripe)
const { auth, db } = require("./src/services/firebase")(config.firebase)

const server = createServer({ auth, db, stripe })

server.start().then(s => {
  console.log(`🚀 Server ready at ${JSON.stringify(s.address())}`)
})
