<!--  -->
<template>
  <div class="JH_upload">
    <div class="file-drop" v-if="auto" ref="uploadBox">
      <input type="file" name="file" @change="fileChange" ref="file" style="display:none" :accept="accept" :multiple="multiple">
      <i style="font-size:14px;color:#999">拖到此处</i>
      <span style="font-size:12px;cursor:pointer;color:#409eff" @click="addFile">或点击上传</span>
    </div>
    <div class="file-manual" v-if="!auto">
      <div>
        <button class="btn select" @click="addFile">选取文件</button>
      </div>
      <div>
        <button class="btn upload" @click="upload" :class="files.length==0?'disabled':''" :disabled="files.length==0">上传图片</button>
      </div>
      <input type="file" name="file" @change="fileChange" ref="file" style="display:none" :accept="accept" :multiple="multiple">
    </div>
    <ul class="file-list">
      <dl class="file file-complete" v-for="(complete,index) of filelist" :key="complete">
        <dt><img :src="'//localhost:3000'+complete" alt="" width="100%" height="100%"></dt>
        <dd>已上传</dd>
        <div class="ok">
          <i class="el-icon-check"></i>
        </div>
        <div class="del">
          <i class="el-icon-close" @click="delFile(complete,index)"></i>
        </div>
        <i></i>
      </dl>
      <dl class="file file-uncomplete" v-for="(item,index) of files" :key="index">
        <dt><img src="./img/unupload.png" alt="" width="100%" height="100%"></dt>
        <dd>{{item.name}}</dd>
        <div class="ok" style="background:#409eff">
          <i class="el-icon-shangchuan"></i>
        </div>
        <div class="del">
          <i class="el-icon-close" @click="delFile(complete,index)"></i>
        </div>
        <i></i>
      </dl>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    filelist: {
      type: Array,
      default() {
        return [];
      }
    },
    mode: {
      type: String,
      default: "normal"
    },
    accept: {
      type: String,
      default: ".jpg,.png"
    },
    multiple: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 2
    },
    auto: {
      type: Boolean,
      default: false
    },
    maxSize: {
      type: Number,
      default: 1024 * 9999999
    }
  },
  data() {
    return {
      files: []
    };
  },
  mounted() {
    if (this.auto) {
      let that = this;
      let dropbox = this.$refs.uploadBox;
      dropbox.addEventListener(
        "dragenter",
        function(e) {
          dropbox.style.borderWidth = "2px";
          dropbox.style.borderColor = "#409eff";
          dropbox.style.backgroundColor = "#eee";
          e.stopPropagation();
          e.preventDefault();
        },
        false
      );
      dropbox.addEventListener(
        "dragleave",
        function(e) {
          dropbox.style.borderWidth = "1px";
          dropbox.style.borderColor = "#ddd";
          dropbox.style.backgroundColor = "#fff";
        },
        false
      );
      dropbox.addEventListener(
        "dragover",
        function(e) {
          dropbox.style.borderWidth = "2px";
          dropbox.style.borderColor = "#409eff";
          dropbox.style.backgroundColor = "#eee";
          e.stopPropagation();
          e.preventDefault();
        },
        false
      );
      dropbox.addEventListener(
        "drop",
        function(e) {
          dropbox.style.borderWidth = "1px";
          dropbox.style.borderColor = "#ddd";
          dropbox.style.backgroundColor = "#fff";
          e.stopPropagation();
          e.preventDefault();
          if(that.vaildateFile.call(that,e.dataTransfer.files)){
            that.files=[...e.dataTransfer.files]
            that.upload()
          }
        },
        false
      );
    }
  },
  methods: {
    addFile() {
      this.$refs.file.value = "";
      this.$refs.file.click();
    },
    fileChange() {
      let formData = new FormData();
      let files = this.$refs.file.files;
      if (!this.vaildateFile(files)) {
        return;
      }
      if (this.limit == 1) {
        this.files = [files[0]];
        console.log(this.files);
      }
      if (this.limit > 1) {
        if (this.files.length == 0) {
          this.files = [...files];
        } else {
          if (this.auto) {
            this.files = [...files];
          } else {
            this.files = this.files.concat([...files]);
          }
        }
        console.log(this.files);
      }
      if (this.auto) {
        this.upload();
      }
    },
    delFile(item, index) {
      if (typeof item === "string") {
        // this.$emit('delFile',index)
        this.filelist.splice(index, 1);
      } else {
        this.files.splice(index, 1);
      }
    },
    vaildateFile(files) {
      if (
        this.filelist.length + this.files.length + files.length >
        this.limit
      ) {
        this.$emit("limitErr");
        console.log("超出上传限制！");
        return false;
      }
      let pass = true;
      for (let i = 0; i < files.length; i++) {
        if (files[i].size / 1024 > this.maxSize) {
          pass = false;
          break;
        }
      }
      if (!pass) {
        this.$emit("maxSizeErr");
        console.log("maxSizeErr");
        return false;
      }
      return true;
    },
    async upload() {
      let files = this.files.filter(item => {
        return !this.url;
      });
      if (files.length == 0) {
        this.$emit("beforeUploadErr", { description: "请选择上传图片！" });
        console.log("请选择上传图片！");
        return;
      }
      let formData = new FormData();
      files.forEach((element, index) => {
        if (!this.url) {
          formData.append("file" + index, element);
        }
      });
      let res = await this.$http.post("/api/upload", formData);
      if (res.data.code == 0) {
        let newfiles = res.data.data.url;
        // let newfiles = res.data.data.url.map(item => {
        //   return {
        //     url: item
        //   };
        // });
        // this.$emit("success", newfiles);
        newfiles.forEach(item => {
          this.filelist.push(item);
        });
        this.files = [];
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
@import './css/font.css';

.file-drop {
  border-radius: 4px;
  width: 220px;
  height: 120px;
  border: 1px dashed #ddd;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.file-manual {
  border-radius: 4px;
  width: 220px;
  height: 120px;
  border: 1px dashed #ddd;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.file-list {
  .file {
    border-radius: 6px;
    width: 220px;
    padding: 10px;
    box-sizing: border-box;
    list-style: none;
    display: flex;
    flex-direction: row;
    border: 1px dashed #ddd;
    text-align: center;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    &:hover{
        .ok{
          display none
        }
        .del{
          display inline-block
          cursor pointer
        }
    }
    dt {
      width: 80px;
      height: 80px;
    }

    dd {
      flex: 1;
      height: 30px;
      line-height: 30px;
      color: #666;
    }
    .ok {
      position: absolute;
      right: -17px;
      top: -7px;
      width: 46px;
      height: 26px;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 1px 1px #ccc;
      i{
        font-size 12px
        transform: rotate(-45deg); 
        color:#fff;
        margin-top 11px
      }
    }
    .del{
      position absolute
      right 8px
      top 8px
      display none
      color #666
    }
  }
}

.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.select {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  padding: 9px 30px;
  font-size: 12px;
  border-radius: 3px;

  &:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
}

.upload {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
  padding: 9px 30px;
  font-size: 12px;
  border-radius: 3px;
  margin-top: 10px;

  &:hover {
    background: #85ce61;
    border-color: #85ce61;
    color: #fff;
  }
}

.disabled {
  cursor: not-allowed;
  color: #a4da89;
  background-color: #f0f9eb;
  border-color: #e1f3d8;

  &:hover {
    color: #a4da89;
    background-color: #f0f9eb;
    border-color: #e1f3d8;
  }
}
</style>