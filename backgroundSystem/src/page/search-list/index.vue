<!--  -->
<template>
  <div class="table">
    <div class="checkOption" ref="checkOption">
      <div class="checkContent">
        <el-checkbox style="vertical-align:top" :indeterminate="isIndeterminate" v-model="checkedAll" @change="handleCheckAllChange"></el-checkbox>
        <i class="el-icon-caret-right" @click="toggle"></i>
        <span class="item">上架</span>
        <span class="item">下架</span>
        <span class="item">删除</span>
        <span class="item">添加标签</span>
        <span class="item">删除标签</span>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column width="100">
        <!-- <template slot="header" slot-scope="slot">
          <div class="checkOption">
            <el-checkbox style="vertical-align:top" :indeterminate="isIndeterminate" v-model="checkedAll" @change="handleCheckAllChange"></el-checkbox>
            <i class="el-icon-caret-right" @click=""></i>
            <span class="item">上架</span>
            <span class="item">下架</span>
            <span class="item">删除</span>
            <span class="item">添加标签</span>
            <span class="item">删除标签</span>
            <el-dropdown class="dp" trigger="click">
      <span class="el-dropdown-link">
       <i style="margin-left:35px;cursor:pointer" class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

          </div>
          </el-dropdown>
        </template> -->
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isChecked" @change="handleCheckedCitiesChange"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="Date" prop="date">
      </el-table-column>
      <el-table-column label="Name" prop="name">
      </el-table-column>
      <el-table-column align="right">
        <!-- <template slot="header" slot-scope="slot">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template> -->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isIndeterminate: false,
      checkedAll: false,
      tableData: [
        {
          isChecked: false,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          isChecked: false,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          isChecked: false,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          isChecked: false,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      search: ""
    };
  },

  methods: {
    toggle() {
      console.log(this.$refs.checkOption.style.width);
      if (this.$refs.checkOption.style.width == "100%") {
        this.$refs.checkOption.style.width = "78px";
      } else {
        this.$refs.checkOption.style.width = "100%";
      }
    },
    handleCheckAllChange(value) {
      this.isIndeterminate = false;
      value
        ? this.tableData.forEach(item => {
            item.isChecked = true;
          })
        : this.tableData.forEach(item => {
            item.isChecked = false;
          });
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange() {
      let checkedCount = this.tableData.filter(item => item.isChecked).length;
      this.checkedAll = checkedCount === this.tableData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tableData.length;
    },
    handleEdit() {},
    handleDelete() {}
  }
};
</script>
<style lang='stylus' scoped>
.table {
  position: relative;
}

.table .checkOption {
  overflow: hidden;
  width: 78px;
  height: 36px;
  line-height: 36px;
  background: rgba(255, 255, 255, 1);
  padding: 0 10px;
  box-sizing: border-box;
  z-index: 4;
  position: absolute;
  left: 0;
  top: 5px;
  transition: all 0.5s ease;

  .checkContent {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    // margin 0 10px;
  }

  .item {
    padding: 10px;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
