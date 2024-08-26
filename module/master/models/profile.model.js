import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

export const profile = DB.define(
  "profile",
  {
    id_profile: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    alamat_domisili: {
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
    schema: "master",
    freezeTableName: true,
    paranoid: true,
  }
);
if (process.env.APP == "DEV") {
  profile.sync({ alter: true });
}
