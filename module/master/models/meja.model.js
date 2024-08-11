import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

const meja = DB.define(
  "ms_meja",
  {
    id_meja: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_meja: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.INTEGER,
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
  meja.sync({ alter: true });
}
export default meja;
