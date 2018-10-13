<!--  -->
<template>
  <div style="height:100%;background:#fff">
    <div v-for="(item,index) of data" :key="index">
    上传页面 <button @click="show">show</button>
    <Upload style="margin:0 auto;width:100px" :limit="1" :maxSize='1024*5' :filelist="item.url" @success="handlesuccess" @limitErr="handleLimitErr" @maxSizeErr="handleMaxSizeErr"></Upload>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/upload'
export default {
  data () {
    return {
      data:[
        {
          url:["/upload_562c6b5e476e1081afc4cac2aff73843_01.jpg"]
        },
        {
          url:["/upload_8b29c81a641824d98f017ac251ad270e_03.jpg"]
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
          message: '最多上传5张图片',
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