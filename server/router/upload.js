const router=require('koa-router')();
const fs = require('fs')
const path =require('path')
const formidable= require('formidable')
router.post('/upload',async ctx=>{
  const form = new formidable.IncomingForm()
  // 设置存储文件的目录
  const imgPath = path.join(__dirname, '../upload/img')
  // 如果目录不存在则创建
  if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath)
  form.uploadDir = imgPath
  // 上传文件大小限制
  form.maxFieldsSize = 20 * 1024 * 1024 //20兆

  let result = await new Promise(r => {
      form.parse(ctx.req, function (err, fields, files) {
          if (err) {
              r({ err })
          } else {
              // 手动给文件加后缀, formidable默认保存的文件是无后缀的
              let newPath = files.file.path + '_' + files.file.name
              fs.renameSync(files.file.path, newPath)
              r({ path: newPath })
          }
      })
  })
  const basename = '/' + path.basename(result.path)
  if (result.err) ctx.throw(400, '异常错误')
  else ctx.body = {
    code:0,
    data:{
      url:basename
    }
  }
})
module.exports = router