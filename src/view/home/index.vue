<template>
  <el-button @click="addUserHand">添加用户</el-button>
</template>

<script setup lang="ts">
  import { getUserListDb } from '@/api/user'
  const fs = window.electronAPI.fs
  const addUserHand = async () => {
    let data = await getUserListDb()
    console.log(data)
  }
</script>

<style lang="scss" scoped></style>
