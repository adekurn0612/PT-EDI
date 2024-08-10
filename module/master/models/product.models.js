import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

const product = DB.define(
  "ms_product",
  {
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    id_variant: {
      type: DataTypes.INTEGER,
    },
    id_kategori: {
      type: DataTypes.INTEGER,
    },
    harga: {
      type: DataTypes.DOUBLE,
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
  product.sync({ alter: true });
}
export default product;
