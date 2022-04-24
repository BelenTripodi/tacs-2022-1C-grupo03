require('dotenv').config()
const MockRequests = require('mock-requests')

const { response } = require('./dictionaryResponse')
const url = process.env.BACKEND_URL

MockRequests.setMockUrlResponse(url + '/dictionary', response)
