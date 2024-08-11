import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

const kategori_station_printer = DB.define(
  "kategori_station_printer",
  {
    id_kategori_station_printer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kategori: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_station_printer: {
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
  kategori_station_printer.sync({ alter: true });
}
export default kategori_station_printer;
