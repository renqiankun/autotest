<template>
  <el-dialog v-model="visible" title="添加/修改" width="600px" destroy-on-close @close="closeHand">
    <el-form ref="formRef" :model="dataForm">
      <el-form-item prop="first_name" label="姓名">
        <el-input v-model="dataForm.first_name"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="dataForm.email"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeHand">取消</el-button>
      <el-button @click="submit" type="primary">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { addOrUpdateUserDB, getUserInfoByIdDB } from '@/api/user'
  import { ElMessage } from 'element-plus'
  import { reactive, ref } from 'vue'

  let visible = ref(false)

  let dataForm = reactive({
    id: '',
    first_name: '',
    email: ''
  })
  const init = (row?: any) => {
    visible.value = true
    dataForm.id = row?.id || ''
    if (dataForm.id) {
      getInfoHand()
    }
  }

  /**
   * 获取详情
   */
  const getInfoHand = async () => {
    let parmas = {
      id: dataForm.id
    }
    let { code, data } = await getUserInfoByIdDB(parmas)
    if (code === 200) {
      dataForm.first_name = data.first_name
      dataForm.email = data.email
      dataForm.id = data.id
    }
  }

  // 提交
  const submit = async () => {
    if (!dataForm.first_name || !dataForm.email) return
    let parmas = {
      id: dataForm.id,
      first_name: dataForm.first_name,
      email: dataForm.email
    }
    const { code  } = await addOrUpdateUserDB(parmas)
    if (code == 200) {
      ElMessage.success('操作成功')
      closeHand()
      emits('success')
    }
  }

  let formRef = ref()
  const closeHand = () => {
    formRef.value.resetFields?.()
    visible.value = false
  }

  const emits = defineEmits(['success'])

  defineExpose({
    init
  })
</script>

<style lang="scss" scoped></style>
