<template>
  <div class="hello">
   <button @click="getData">请求数据</button>
   <button @click="addData">添加数据</button>
   <input type="text" v-model="name">
   <p>12</p>
   <h3>4343</h3>
   <ul>
     <li v-for="(item,index) of data" :key="index" @click="delData(item._id)">{{item.name}}</li>
   </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data:[],
      name:'klaur'
    }
  },
  methods:{
    async getData(){
      let res = await axios.get('/api/getData')
      console.log(res)
      if(res.status==200){
        this.data=res.data
        console.log(this.data)
      }
    },
     async addData(){
      let res = await axios.post('/api/addData',{name:this.name})
      console.log(res)
    },
    async delData(id){
      let res = await axios.post('/api/delData',{id})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
