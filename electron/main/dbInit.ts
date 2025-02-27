// 初始化用户表路由
import {dbConnect}  from './db/dbConnect'
export const dbInit = async () => {
     await import('./router')
     await dbConnect()
}