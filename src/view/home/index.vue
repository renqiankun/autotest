<template>
  <el-button @click="getUserListHand">查询用户</el-button>
</template>

<script setup lang="ts">
  import { getUserListDb } from '@/api/user'
  const fs = window.electronAPI.fs

  const getUserListHand = async () => {
    let data = await getUserListDb()
    console.log(data)
  }
</script>

<style lang="scss" scoped></style>
