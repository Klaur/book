const Model = require('../models/book')
const ObjectId = require('mongoose').mongo.ObjectId; 
let book = {
  async getBookList(){
    let res = await  Model.find({})
    return res
  },
  async addBook(params){
    params.catogories_id.forEach(element => {
      element=ObjectId(element)
    });
    let res = await Model.create({createTime:new Date().getTime(),...params})
    return res
  }
}
module.exports =  book;