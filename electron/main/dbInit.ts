// 初始化用户表路由
import './router/user.ts'
import {dbConnect}  from './db/dbConnect.ts'
export const dbInit = async () => {
     await dbConnect()
}