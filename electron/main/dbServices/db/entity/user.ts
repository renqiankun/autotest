import { Column, Entity, EntitySchema, PrimaryGeneratedColumn } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    userName: {
      type: String,
    },
    nickName: {
      type: String,
    },
  },
});
