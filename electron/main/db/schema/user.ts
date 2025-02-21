import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export default pgTable('users', {
  id: integer(),
  updatedId: integer(),
  first_name: varchar()
})
