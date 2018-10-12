const Koa  = require('koa');
const app =new Koa()
const router = require('./router')
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const path = require('path')
app.use(bodyParser())
app.use(router.routes())
app.use(static(path.join(__dirname, '/upload/img')))
app.listen(3000,()=>{
    console.log('api connect！')
})