import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

export const kecamatan = DB.define(
  "ms_kecamatan",
  {
    id_kecamatan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kota: {
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
  kecamatan.sync({ alter: true });
}
