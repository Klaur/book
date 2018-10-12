<!--  -->
<template>
    <div class="container">
        <div class="left">
            <div class="recommend">
                <h3>我是推荐</h3>
                <ul class=""></ul>
            </div>
            <div class="hot">
                <h3>热门图书</h3>
                <ul></ul>
            </div>
            <div class="new">
                <h3>最新入库</h3>
                <ul></ul>
            </div>
        </div>
        <div class="right">
            123
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      async getHomeData(){
        let res = this.$http.get('/api/getHomeData')
        console.log(res)
      }
  },
};
</script>
<style lang='stylus' scoped>
.container
  width: 1200px
  margin: 0 auto
  display flex
  flex-direction row
  justify-content space-between
  .left
    width 220px
    background blue
  .right
    width 970px
    background red
</style>