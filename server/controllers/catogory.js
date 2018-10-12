const Model = require('../models/catogory')

let Catogory = {
    async getCatogoryList() {      
        let res = await Model.find({})
        return res
    },
    async addCatogory(params){
        // let res = new Model(params)
        // let done=await res.save()
        let data={
          name:params.name,
          description:params.description?params.description:'',
          createTime:new Date().getTime()
        }
        let res=Model.create(data)
        return res
    },
    async updateCatogory(params){
     let res= Model.update({_id:params._id},{
        name:params.name,
        description:params.description
      })
      return res
    },
    async delCatogory(params){
        let res=Model.findOneAndRemove(params).exec()
        return res
    } 
}
module.exports = Catogory