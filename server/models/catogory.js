const db =require('./mongodb')
const Schema = db.Schema;
let CatogorySchema= new Schema({
    name:String,
    description:String,
    createTime:Number
},{versionKey:false})
let catogoryModel = db.model('catogories',CatogorySchema)
module.exports = catogoryModel