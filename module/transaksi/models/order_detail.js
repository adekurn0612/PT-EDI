import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

const order_detail = DB.define(
  "order_detail",
  {
    id_order_detail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_order: {
      type: DataTypes.INTEGER,
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
    id_promo: {
      type: DataTypes.INTEGER,
    },
    qty: {
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
    schema: "transaksi",
    paranoid: true,
    freezeTableName: true,
  }
);
if (process.env.APP == "DEV") {
  order_detail.sync({ alter: true });
}
export default order_detail;
