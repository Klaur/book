const db = require('./mongodb')
const Schema = db.Schema;
let BookSchema = new Schema({
  name: String,
  description: String,
  publishingHouse: String,
  catogories_id: Array,
  author: String,
  img: Array,
  createTime:Number
})
let bookModel = db.model('books', BookSchema)
module.exports = bookModel