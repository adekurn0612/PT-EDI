import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

export const riwayat_apply = DB.define(
  "riwayat_apply",
  {
    id_riwayat_apply: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_job_opening: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    no_ktp: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    golongan_darah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_ktp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_ktp_id_provinsi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat_ktp_id_kota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat_ktp_id_kecamatan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat_ktp_id_kelurahan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat_ktp_provinsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_ktp_kota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_ktp_kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_ktp_kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_domisili: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_domisili_id_provinsi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat_domisili_id_kota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat_domisili_id_kecamatan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat_domisili_id_kelurahan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat_domisili_provinsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_domisili_kota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_domisili_kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_domisili_kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_telpon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_kontak_darurat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_kontak_darurat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expected_salary: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    is_relocation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    riwayat_pendidikan: {
      type: DataTypes.JSON,
    },
    riwayat_pekerjaan: {
      type: DataTypes.JSON,
    },
    riwayat_pelatihan: {
      type: DataTypes.JSON,
    },
    tanggalapply: {
      type: DataTypes.DATE,
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
  riwayat_apply.sync({ alter: true });
}
