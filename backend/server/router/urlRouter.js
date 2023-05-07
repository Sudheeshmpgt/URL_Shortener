const route = require('express').Router()
const {createShortUrl, getAllUrl, redirectionToLongUrl, deleteUrl} = require('../controller/urlController')
const verifyAuth = require('../middleware/authenticate')

route.post('/new', verifyAuth, createShortUrl);
route.put('/redirect/:shortUrlId', verifyAuth, redirectionToLongUrl);
route.get('/get-all/:userId', verifyAuth, getAllUrl);
route.delete('/delete/:id', verifyAuth, deleteUrl);

module.exports = route;