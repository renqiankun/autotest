<template>
  <el-button @click="getUserListHand">查询用户</el-button>
  <el-button @click="addHand">新增用户</el-button>
  <el-table style="margin-top: 20px" stripe :data="tableData">
    <el-table-column prop="id" label="id" width="180"></el-table-column>
    <el-table-column prop="first_name" label="姓名"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column label="删除">
      <template #default="{ row }">
        <el-button text type="primary" @click="changeHand(row)">修改</el-button>
        <el-button text type="danger" @click="deleteHand(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <addOrUpdate @success="getUserListHand" ref="addRef"></addOrUpdate>
</template>

<script setup lang="ts">
  import { deleteUserByIdDB, getUserListDB } from '@/api/user'
  import { onMounted, ref } from 'vue'
  import addOrUpdate from './addOrUpdate.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  onMounted(() => {
    getUserListHand()
  })
  let tableData = ref([])
  /**
   * 获取用户列表
   */
  const getUserListHand = async () => {
    let { code, data } = await getUserListDB()
    if (code == 200) {
      tableData.value = data
    }
  }

  let addRef = ref()
  const addHand = () => {
    addRef.value.init()
  }

  const changeHand = (row: any) => {
    addRef.value.init(row)
  }

  const deleteHand = (row: any) => {
    ElMessageBox.confirm('确定删除吗？', '提示', {
      type: 'warning'
    }).then(async () => {
      let parmas = {
        id: row.id
      }
      let { code, } = await deleteUserByIdDB(parmas)
      if (code == 200) {
        ElMessage.success('删除成功')
        getUserListHand()
      }
    })
  }
</script>

<style lang="scss" scoped></style>
