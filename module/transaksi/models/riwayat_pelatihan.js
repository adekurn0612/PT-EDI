import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

export const riwayat_pelatihan = DB.define(
  "riwayat_pelatihan",
  {
    id_riwayat_pelatihan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_pelatihan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_sertifikat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahun: {
      type: DataTypes.INTEGER,
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
    schema: "transaksi",
    freezeTableName: true,
    paranoid: true,
  }
);
if (process.env.APP == "DEV") {
  riwayat_pelatihan.sync({ alter: true });
}
