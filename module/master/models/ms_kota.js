import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

export const kota = DB.define(
  "ms_kota",
  {
    id_kota: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_provinsi: {
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdBy: {
      type: DataTypes.INTEGER,
    },
    createdName: {
      type: DataTypes.STRING,
    },
    createdCode: {
      type: DataTypes.STRING,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    updatedName: {
      type: DataTypes.STRING,
    },
    updatedCode: {
      type: DataTypes.STRING,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
    },
    deletedName: {
      type: DataTypes.STRING,
    },
    deletedCode: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "master",
    paranoid: true,
    freezeTableName: true,
  }
);
if (process.env.APP == "DEV") {
  kota.sync({ alter: true });
}
