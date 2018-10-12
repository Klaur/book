const db= require('mongoose')
db.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('数据库连接失败！')
            } else {
                console.log('数据库连接成功！')
            }
});
module.exports = db