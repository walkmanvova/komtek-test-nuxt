<template>
  <nav class="nav">
    <el-row>
      <nuxt-link to="/"><el-button type="info" :plain="$route.name !== 'index'"><i class="el-icon-tickets"></i>&nbsp;Список пациентов</el-button></nuxt-link>
      <nuxt-link to="/create"><el-button type="info" :plain="$route.name !== 'create'"><i class="el-icon-circle-plus-outline"></i>&nbsp;Создать пациента</el-button></nuxt-link>
    </el-row>
  </nav>
</template>
