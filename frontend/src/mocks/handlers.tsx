import { rest } from 'msw'

export const handlers = [
    rest.get(
        `${process.env.REACT_APP_BACKEND_URL}/dictionary`,
        (req, res, ctx) => {
            console.log(
                'Params: ',
                req.url.searchParams.get('language'),
                req.url.searchParams.get('word')
            )
            return res(
                ctx.delay(1500),
                ctx.status(200),
                ctx.json({
                    definitions: [
                        'asdasdasdsa',
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur odit explicabo',
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur odit explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur odit explicabo',
                    ],
                })
            )
        }
    ),

    rest.post(`${process.env.REACT_APP_BACKEND_URL}/help`, (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(200),
            ctx.json({
                possibleWords: ['word1', 'word2', 'word3'],
            })
        )
    }),
    rest.post(`${process.env.REACT_APP_BACKEND_URL}/login`, (req, res, ctx) => {
        return res(
            ctx.json({
                data: {
                    jwt: 'randomjwt',
                },
            })
        )
    }),
    rest.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/0/score`,
        (req, res, ctx) => {
            return res(ctx.json('Points added successfully'))
        }
    ),
    rest.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/0/score`,
        (req, res, ctx) => {
            return res(
                ctx.json({
                    data: {
                        dailyScore: 1,
                    },
                })
            )
        }
    ),
]
