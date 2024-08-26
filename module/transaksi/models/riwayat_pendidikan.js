import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

export const riwayat_pendidikan = DB.define(
  "riwayat_pendidikan",
  {
    id_riwayat_pendidikan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_jenjang_pendidikan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_institusi_akademik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_jurusan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahun_lulus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ipk: {
      type: DataTypes.DOUBLE,
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
  riwayat_pendidikan.sync({ alter: true });
}
