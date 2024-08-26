import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

export const users = DB.define(
  "users",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: 0,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdBy: {
      type: DataTypes.INTEGER,
    },
    createdName: {
      type: DataTypes.STRING,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    updatedName: {
      type: DataTypes.STRING,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
    },
    deletedName: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "manajemen_akses",
    freezeTableName: true,
    paranoid: true,
  }
);
if (process.env.APP == "DEV") {
  users.sync({ alter: true });
}
