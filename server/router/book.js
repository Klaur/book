const router=require('koa-router')()
const bookModel = require('../controllers/book')



router.get('/getBookList',async (ctx)=>{
    let res=await bookModel.getBookList()
    ctx.body={
        code:0,
        data:{
            list:res
        },
        message:''
    }
})

router.post('/addBook',async (ctx)=>{
    let res=await bookModel.addBook(ctx.request.body)
    if(res._id){
        ctx.body={
            code:0,
            data:{},
            message:'添加成功！'
        }
    }
})

// router.post('/delData',async (ctx)=>{
//     let {id}=ctx.request.body
//     ctx.body= await productModel.delData(id)
// })
module.exports = router;
