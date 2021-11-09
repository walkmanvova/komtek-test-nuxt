<template>
  <div id="app">
    <Nav class="nav" />
    <hr/>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="24" :sm="22" :md="20" :lg="16" :xl="12">
        <nuxt class="content" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  components: {
    Nav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.nav {
  padding: 20px 0;
  text-align: center;
}
.content {
  padding: 20px 0 0;
}
.table {
  width: 100%;
}
.table th {
  text-align: left;
  color: #909399;
  font-size: 14px;
}
.table td, .table th {
  padding: 12px 10px;
  border-bottom: 1px solid #EBEEF5;
}
.table td:last-child {
  text-align: right;
}
</style>
