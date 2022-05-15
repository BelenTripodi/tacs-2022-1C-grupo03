const { rest } = require('msw')
const { dictionaryResponse } = require('./staticResponses/dictionaryResponse')
const { possibleWords } = require('./staticResponses/helpResponse')

module.exports = {
    handlers: [
        rest.get(`${process.env.BACKEND_URL}/dictionary`, (req, res, ctx) => {
            return res(
                ctx.delay(1),
                ctx.status(200),
                ctx.json(dictionaryResponse)
            )
        }),

        rest.post(`${process.env.BACKEND_URL}/help`, (req, res, ctx) => {
            return res(ctx.json(possibleWords))
        }),
        rest.post(`${process.env.BACKEND_URL}/login`, (req, res, ctx) => {
            return res(
                ctx.set('Authorization', 'Bearer randomtoken'),
                ctx.json({
                    data: 'logged in',
                })
            )
        }),
    ],
}
