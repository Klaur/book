<!--  -->
<template>
  <div>
    <search-list></search-list>
  </div>
</template>

<script>
import SearchList from '@/components/search-list'
export default {
  data () {
    return {
    };
  },
  components:{
    SearchList
  }
}

</script>
<style lang='stylus' scoped>
li{
  list-style none
}
</style>