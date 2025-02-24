import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export  const users = sqliteTable('users', {
  id: integer(),
  updatedId: integer(),
  first_name: text(),
  first_name222: text(),
  email: text().unique(), // <--- added column
})
