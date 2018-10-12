const router = require('koa-router')();
const catogory = require('./catogory')
const book = require('./book')
const upload = require('./upload')
router.use('/api',catogory.routes())
router.use('/api',book.routes())
router.use('/api',upload.routes())
module.exports = router