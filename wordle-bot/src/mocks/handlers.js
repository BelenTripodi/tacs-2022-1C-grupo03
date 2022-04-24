const { rest } = require('msw')
const { dictionaryResponse } = require('./dictionaryResponse')

module.exports = {
    handlers: [
        rest.get(`${process.env.BACKEND_URL}/dictionary`, (req, res, ctx) => {
            console.log(
                'Params: ',
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
            console.log('Request', req.body)
            return res(
                ctx.delay(1500),
                ctx.status(200),
                ctx.json({
                    possibleWords: ['word1', 'word2', 'word3'],
                })
            )
        }),
    ],
}
