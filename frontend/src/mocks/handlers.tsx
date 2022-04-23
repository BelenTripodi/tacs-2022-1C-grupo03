import { rest } from 'msw'

export const handlers = [
    rest.get(`${process.env.REACT_APP_BACKEND_URL}/dictionary`, (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(200),
            ctx.json({
                definitions: [
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur odit explicabo",
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur odit explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur odit explicabo"
                ]
            })
        )
    }),
    
    rest.post(`${process.env.REACT_APP_BACKEND_URL}/help`, (req, res, ctx) => {
        console.log("Request", req.body)
        return res(
            ctx.delay(1500),
            ctx.status(200),
            ctx.json({
                possibleWords: [
                    "word1",
                    "word2",
                    "word3"  
                ]
            })
        )
    })
]