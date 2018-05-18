const request = require("request-promise")

module.exports = config => {
  const stripe = require("stripe")(config.secretKey)

  stripe.connect = code =>
    request.post(config.tokenUri, {
      form: {
        grant_type: "authorization_code",
        client_id: config.clientId,
        client_secret: config.secretKey,
        code
      },
      json: true
    })

  return stripe
}
