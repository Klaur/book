<!--  -->
<template>
  <div style="height:100%;background:#fff">
    <div v-for="(item,index) of data" :key="index">
    上传页面 <button @click="show">show</button>
    <Upload style="margin:0 auto;width:100px" :auto="true" :limit="limit" :maxSize='1024*5' :filelist="item.url" @success="handlesuccess" @limitErr="handleLimitErr" @maxSizeErr="handleMaxSizeErr"></Upload>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/upload'
export default {
  data () {
    return {
      limit:2,
      data:[
        {
          url:["/upload_50ec4f4569ebcdc891f17f4dbea352a8_01.jpg"]
        },
        {
          url:["/upload_d325b93f76032b99bffb38456cf50ce7_03.jpg"]
        }
      ]
    };
  },
  methods:{
    show(){
      console.log(this.data)
    },
    handlesuccess(newFiles){
      this.images=this.images.concat(newFiles)
    },
    handleLimitErr(){
      this.$message({
          message: `最多上传${this.limit}张图片`,
          type: 'warning'
      });
    },
    handleMaxSizeErr(){
      this.$message({
          message: '单张图片超过最大限制',
          type: 'warning'
      });
    }
  },
  components:{
    Upload
  }
}

</script>
<style lang='stylus' scoped>
</style>