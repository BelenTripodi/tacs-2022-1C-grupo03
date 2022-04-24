const { setupServer } = require('msw/node')
const { handlers } = require('./handlers')

const server = setupServer(...handlers)
// Setup requests interception using the given handlers.
module.exports = { server }
