import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

export const riwayat_pekerjaan = DB.define(
  "riwayat_pekerjaan",
  {
    id_riwayat_pekerjaan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_perusahaan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posisi_terakhir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pendapatan_terakhir: {
      type: DataTypes.INTEGER,
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
  riwayat_pekerjaan.sync({ alter: true });
}
