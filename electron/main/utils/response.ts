export const response = {
  ok: (data?: { code?: number; msg?: string; data?: any }) => {
    return {
      code: 200,
      msg: '操作成功',
      data: null,
      ...data
    }
  },
  error: (data?: { code?: number; msg?: string; data?: any }) => {
    return {
      code: 500,
      msg: '操作失败',
      ...data
    }
  }
}
