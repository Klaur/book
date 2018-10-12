<!--  -->
<template>
  <div class="container">
    <h3>图书列表</h3>
    <div>
      <el-button type="primary" size="mini" @click="add">入库</el-button>
    </div>
    <div style="padding:10px">
      <el-table :data="bookList" style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="author" label="作者">
        </el-table-column>
        <el-table-column prop="catogories_id" label="类型">
          <template slot-scope="scope">
            <div v-for="(item,index) of scope.row.catogories_id" :key="index">
              {{getTypeName(item)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="createTime" label="入库时间">
          <template slot-scope="scope">
              {{$moment(scope.row.createTime).format('YYYY-MM-DD hh:mm:ss')}} 
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleClose">
      <div style="max-height:540px;overflow:auto;padding:0 20px">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="书籍名称：" prop="name" :rules="{ required: true, message: '请输入类别名称', trigger: 'blur' }">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="作者：" prop="author" :rules="{ required: true, message: '请输入类别名称', trigger: 'blur' }">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
          <el-form-item label="出版社：" prop="publishingHouse" :rules="{ required: true, message: '请输入出版社名称', trigger: 'blur' }">
            <el-input v-model="form.publishingHouse"></el-input>
          </el-form-item>
          <el-form-item label="类型：" prop="catogories_id" :rules="{ type: 'array', required: true, message: '请至少选择一个类型', trigger: 'change' }">
            <el-select v-model="form.catogories_id" multiple placeholder="请选择">
              <el-option v-for="item in catogories" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.description">
            </el-input>
          </el-form-item>
          <el-form-item label="大小：" prop="size" :rules="{ required: true, message: '请输入书本大小', trigger: 'blur' }">
            <el-input v-model="form.size"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status" :rules="{ required: true, message: '该项为必填项', trigger: 'change' }">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">全本</el-radio>
              <el-radio :label="0">连载</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图片：">
            <el-upload v-if="form.img.length==0" :multiple="false" class="upload-demo" action="/api/upload" :on-preview="handlePreview" :on-remove="handleRemove" :show-file-list='false' :on-success="uploadSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div v-if="form.img.length>0">
              <img :src="'//localhost:3000'+form.img[0]" alt="" width="100%">
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      dialogTitle: "入库新书",
      dialogVisible: false,
      bookList: [],
      loading:false,
      catogories: [],
      form: {
        name: "",
        description: "",
        publishingHouse: "",
        catogories_id:[],
        author: "",
        img:[]
      }
    };
  },
  methods: {
    async init(){
      await this.getCatogoryList()
      await this.getBookList()
    },
    async getBookList() {
      this.loading=true
      let res =await this.$http.get("/api/getBookList");
       if (res.data.code === 0) {
          this.bookList = res.data.data.list;
        }
      this.loading=false 
    },
    async getCatogoryList() {
      let res = await this.$http.get("/api/getCatogoryList").then(res => {
        if (res.data.code === 0) {
          this.catogories = res.data.data.list;
        }
      });
      console.log(this.catogories)
    },
    getTypeName(id){
      let name=""
      for(let i=0;i<this.catogories.length;i++){
        if(id==this.catogories[i]._id){
           name=this.catogories[i].name;
            break;
        }
      }
      return name
    },
    add() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs.form.clearValidate();
      this.form = {
        name: "",
        description: "",
        publishingHouse: "",
        catogories_id:[],
        author: "",
        img:[]
      };
    },
    submit() {
      this.$refs.form.validate(valid=>{
        if(valid){
          console.log(this.form)
          this.$http.post('/api/addBook',this.form).then(res=>{
            if(res.data.code===0){
              this.$message({
                  message: "恭喜你，新建成功！",
                  type: "success"
                });
              this.handleClose()
              this.getBookList()
            }
          })
        }
      })
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePreview(file) {
        console.log(file);
    },
    uploadSuccess(response, file, fileList){
      console.log(response)
      if(response.code===0){
        this.$message({
                  message: "恭喜你，上传成功！",
                  type: "success"
                });
        this.form.img.push(response.data.url)
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang='stylus' scoped>
.container {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>