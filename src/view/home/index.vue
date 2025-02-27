<template>
  <el-button @click="getUserListHand">查询用户</el-button>
</template>

<script setup lang="ts">
  import { getUserListDB } from '@/api/user'
  const fs = window.electronAPI.fs
  const env = window.electronAPI.env
  const getUserListHand = async () => {
    let data = await getUserListDB()
    console.log(data)
    console.log(env)
  }
</script>

<style lang="scss" scoped></style>
