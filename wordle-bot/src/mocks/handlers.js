const { rest } = require('msw')
const { dictionaryResponse } = require('./staticResponses/dictionaryResponse')
const { possibleWords } = require('./staticResponses/helpResponse')

module.exports = {
    handlers: [
        rest.get(`${process.env.BACKEND_URL}/dictionary`, (req, res, ctx) => {
            console.log(
                '[MOCK]:Params: ',
                req.url.searchParams.get('word'),
                req.url.searchParams.get('language')
            )
            return res(
                ctx.delay(1),
                ctx.status(200),
                ctx.json(dictionaryResponse)
            )
        }),

        rest.post(`${process.env.BACKEND_URL}/help`, (req, res, ctx) => {
            console.log('[MOCK]: Request received', req.body)
            return res(ctx.json(possibleWords))
        }),
        rest.post(`${process.env.BACKEND_URL}/login`, (req, res, ctx) => {
            console.log('[MOCK]: Request received', req.body)
            return res(
                ctx.set('Authorization', 'Bearer randomtoken'),
                ctx.json({
                    data: 'puto el que lee',
                })
            )
        }),
    ],
}
