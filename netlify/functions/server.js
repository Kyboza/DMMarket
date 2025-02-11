const server = require("../../src/backend/server")
const serverless = require("serverless-http")

exports.handler = serverless(server)