<!--  -->
<template>
  <div class="JH_upload">
    <div class="file-Item" @click="addFile" v-if="auto" ref="uploadBox">
      <input type="file" name="file" @change="fileChange" ref="file" style="display:none" :accept="accept" :multiple="multiple">
      <i>拖到此处</i>
    </div>
    <div class="file-Item" v-if="!auto">
      <div>
        <button class="btn select" @click="addFile">选取文件</button>
      </div>
      <div>
        <button class="btn upload" @click="upload" :class="files.length==0?'disabled':''" :disabled="files.length==0">上传图片</button>
      </div>
      <input type="file" name="file" @change="fileChange" ref="file" style="display:none" :accept="accept" :multiple="multiple">
    </div>
    <ul class="file-list">
      <li class="file" v-for="(complete,index) of filelist" :key="complete">
        <img :src="'//localhost:3000'+complete" alt="" width="100" height="100">
        <div class="bg">
          <div @click="delFile(complete,index)">删除</div>
          <div>查看</div>
        </div>
      </li>
      <li class="file" v-for="(item,index) of files" :key="index">
        <span>{{item.name}}</span>
        <div class="bg">
          <div @click="delFile(item,index)">删除</div>
          <div>查看</div>
        </div>
      </li>
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
      default: true
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
    let dropbox=this.$refs.uploadBox
    // document.addEventListener(
    //   "dragenter",
    //   function(e) {
    //     dropbox.style.borderColor = "blue";
    //   },
    //   false
    // );
    // document.addEventListener(
    //   "dragleave",
    //   function(e) {
    //     dropbox.style.borderColor = "silver";
    //   },
    //   false
    // );
    dropbox.addEventListener(
      "dragenter",
      function(e) {
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
        dropbox.style.borderColor = "#ddd";
        dropbox.style.backgroundColor = "#fff";
      },
      false
    );
    dropbox.addEventListener(
      "dragover",
      function(e) {
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
        e.stopPropagation();
        e.preventDefault();

        console.log(e.dataTransfer.files);
      },
      false
    );
  },
  methods: {
    addFile() {
      this.$refs.file.value = "";
      this.$refs.file.click();
    },
    fileChange() {
      let formData = new FormData();
      let files = this.$refs.file.files;
      //判断上传数量
      console.log(this.filelist.length + this.files.length + files.length);
      if (
        this.filelist.length + this.files.length + files.length >
        this.limit
      ) {
        this.$emit("limitErr");
        console.log("超出上传限制！");
        return;
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
.file-Item {
  width: 100px;
  height: 100px;
  border: 1px dashed #ddd;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.file-list {
  .file {
    list-style: none;
    width: 100px;
    height: 100px;
    border: 1px dashed #ddd;
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover {
      .bg {
        display: flex;
      }
    }

    .bg {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;

      >div {
        margin: 5px 0;
      }
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
  padding: 9px 15px;
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
  padding: 9px 15px;
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