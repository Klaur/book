<!--  -->
<template>
  <div class="container">
    <h3>图书分类</h3>
    <div>
      <el-button type="primary" size="mini" @click="create">新建</el-button>
    </div>
    <div style="padding:10px;">
      <el-table :data="catogoryList" style="width: 100%;" v-loading="loading">
        <el-table-column prop="name" label="类型">
        </el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            {{$moment(scope.row.createTime).format('YYYY-MM-DD hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="delCatogory(scope.row._id,scope.$index)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="updateCatogory(scope.row,scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="类别名称：" prop="name" :rules="{ required: true, message: '请输入类别名称', trigger: 'blur' }">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.description">
            </el-input>
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
      loading: false,
      dialogTitle: "",
      dialogVisible: false,
      catogoryList: [],
      form: {
        name: "",
        description: ""
      }
    };
  },
  mounted() {
    this.getCatogoryList();
  },
  methods: {
    async getCatogoryList() {
      this.loading = true;
      let res = await this.$http.get("/api/getCatogoryList").then(res => {
        if (res.data.code === 0) {
          this.catogoryList = res.data.data.list;
        }
      });
      this.loading = false;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs.form.clearValidate();
      this.form = {
        name: "",
        description: ""
      };
    },
    create() {
      this.dialogTitle = "新建分类";
      this.dialogVisible = true;
    },
    updateCatogory(row) {
      this.dialogTitle = "编辑分类";
      this.form = { ...row };
      this.dialogVisible = true;
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.dialogTitle == "新建分类") {
            this.$http.post("/api/addCatogory", this.form).then(res => {
              this.dialogVisible = false;
              if (res.data.code === 0) {
                this.$refs.form.clearValidate();
                this.form = {
                  name: "",
                  description: ""
                };
                this.$message({
                  message: "恭喜你，新建成功！",
                  type: "success"
                });
                this.getCatogoryList();
              }
            });
          } else {
            this.$http.post("/api/updateCatogory", this.form).then(res => {
              if (res.data.code === 0) {
                this.dialogVisible = false;
                this.$refs.form.clearValidate();
                this.form = {
                  name: "",
                  description: ""
                };
                this.$message({
                  message: "恭喜你，修改成功！",
                  type: "success"
                });
                this.getCatogoryList();
              }
            });
          }
        }
      });
    },
    delCatogory(_id, index) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.post("/api/delCatogory", { _id }).then(res => {
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
          this.catogoryList.splice(index, 1);
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    }
  }
};
</script>
<style lang='stylus' scoped>
.container {
  height: 100%;
  background: #fff;
}
</style>