const admin = require("firebase-admin")
const httpMocks = require("node-mocks-http")
const functions = require("firebase-functions")

functions.config = jest.fn(() => ({
  firebase: {
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://not-a-project.firebaseio.com",
    storageBucket: "not-a-project.appspot.com"
  }
}))

const { api } = require("../")

describe("API", () => {
  test("returns a 200 with formatted date when passed date format in body", async done => {
    const uri = "/graphiql"
    const req = httpMocks.createRequest({
      method: "GET",
      headers: {
        origin: "http://localhost:8080",
        referer: "http://localhost:8080",
        accept: "application/json"
      },
      _parsedUrl: {
        pathname: uri
      },
      url: uri,
      body: {
        query: `
            query {
              status
            }`,
        variables: null
      }
    })
    const res = httpMocks.createResponse()
    await api.handleEvent()(req, res)

    expect(res.statusCode).toBe(200)
    done()
  })
})
