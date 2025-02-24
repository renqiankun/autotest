import { asc, between, count, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../dbInit'
import   {users}  from '../schema/users'

export class userServices {
  static async getUserById(id: number) {
    return db.select().from(users).where(eq(users.id, id))
  }
  /**根据id更新用户详情 */
  static async updateUserById(id: number, data: any) {
   return  await db.transaction(async tx => {
     const user=  await tx.update(users).set(data).where(eq(users.id, id))
      if(!user){
        tx.rollback()
        return false
      }
      return 
    })
  }
    /**根据id更新用户详情 */
    static async insertUser(id: number, data: any) {
      return  await db.transaction(async tx => {
        const user=  await tx.insert(users).values(data)
         if(!user){
           tx.rollback()
           return false
         }
         return 
       })
     }
}
