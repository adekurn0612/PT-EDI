import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

const order = DB.define(
  "order",
  {
    id_order: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_meja: {
      type: DataTypes.INTEGER,
    },
    nama_customer: {
      type: DataTypes.STRING,
    },
    total_harga: {
      type: DataTypes.DOUBLE,
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
    schema: "transaksi",
    paranoid: true,
    freezeTableName: true,
  }
);
if (process.env.APP == "DEV") {
  order.sync({ alter: true });
}
export default order;
