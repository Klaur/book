const router=require('koa-router')()
const catogoryModel = require('../controllers/catogory')


router.get('/getCatogoryList',async(ctx)=>{
  let res = await catogoryModel.getCatogoryList()
  if(res){
    ctx.body={
      code:0,
      data:{
        list:res
      },
      message:''
    }
  }
})
router.post('/addCatogory',async (ctx)=>{
    // let res=await productModel.findProductionList()
    let res = await catogoryModel.addCatogory(ctx.request.body)
    if(res._id){
      ctx.body={
        code:0,
        data:{},
        message:'新建成功！'
      }
    }else{
      ctx.body={
        code:1,
        data:{},
        message:'新建失败！'
      }
    }
})
router.post('/updateCatogory',async (ctx)=>{
  // let res=await productModel.findProductionList()
  let res = await catogoryModel.updateCatogory(ctx.request.body)
  ctx.body=res
  if(res.ok){
    ctx.body={
      code:0,
      data:{},
      message:'修改成功！'
    }
  }else{
    ctx.body={
      code:1,
      data:{},
      message:'修改失败！'
    }
  }
})
router.post('/delCatogory',async (ctx)=>{
  // let res=await productModel.findProductionList()
  let res = await catogoryModel.delCatogory(ctx.request.body)
  if(res){
    ctx.body={
      code:0,
      data:{},
      message:'删除成功！'
    }
  }else{
    ctx.body={
      code:1,
      data:{},
      message:'删除失败！'
    }
  }
})

module.exports = router;
