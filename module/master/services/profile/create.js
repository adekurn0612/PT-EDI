import { DataNotFoundError } from "../../../../helpers/error/index.js";
import Check from "../../../../helpers/validation/check.js";
import { users } from "../../../manajemen_akses/models/user.models.js";
import { kecamatan } from "../../models/ms_kecamatan.js";
import { kelurahan } from "../../models/ms_kelurahan.js";
import { kota } from "../../models/ms_kota.js";
import { provinsi } from "../../models/ms_provinsi.js";
import { profile } from "../../models/profile.model.js";

export const create = async ({
  id_user,
  no_ktp,
  tempat_lahir,
  tanggal_lahir,
  jenis_kelamin,
  agama,
  golongan_darah,
  status,
  alamat_ktp,
  alamat_ktp_id_provinsi,
  alamat_ktp_id_kota,
  alamat_ktp_id_kecamatan,
  alamat_ktp_id_kelurahan,
  alamat_domisili,
  alamat_domisili_id_provinsi,
  alamat_domisili_id_kota,
  alamat_domisili_id_kecamatan,
  alamat_domisili_id_kelurahan,
  no_telpon,
  nama_kontak_darurat,
  nomor_kontak_darurat,
  expected_salary,
  is_relocation,
}) => {
  try {
    const [
      user,
      data_profile,
      domisiliProvinsi,
      domisiliKota,
      domisiliKecamatan,
      domisiliKelurahan,
      ktpProvinsi,
      ktpKota,
      ktpKecamatan,
      ktpKelurahan,
    ] = await Promise.all([
      users.findByPk(id_user),
      profile.findOne({ where: { id_user } }),
      provinsi.findByPk(alamat_domisili_id_provinsi),
      kota.findByPk(alamat_domisili_id_kota),
      kecamatan.findByPk(alamat_domisili_id_kecamatan),
      kelurahan.findByPk(alamat_domisili_id_kelurahan),
      provinsi.findByPk(alamat_ktp_id_provinsi),
      kota.findByPk(alamat_ktp_id_kota),
      kecamatan.findByPk(alamat_ktp_id_kecamatan),
      kelurahan.findByPk(alamat_ktp_id_kelurahan),
    ]);

    await Promise.all([
      Check.checkExistenceOrThrow(user, "User"),
      Check.checkExistenceOrThrow(domisiliProvinsi, "Domisili Provinsi"),
      Check.checkExistenceOrThrow(domisiliKota, "Domisili Kota"),
      Check.checkExistenceOrThrow(domisiliKecamatan, "Domisili Kecamatan"),
      Check.checkExistenceOrThrow(domisiliKelurahan, "Domisili Kelurahan"),
      Check.checkExistenceOrThrow(ktpProvinsi, "KTP Provinsi"),
      Check.checkExistenceOrThrow(ktpKota, "KTP Kota"),
      Check.checkExistenceOrThrow(ktpKecamatan, "KTP Kecamatan"),
      Check.checkExistenceOrThrow(ktpKelurahan, "KTP Kelurahan"),
    ]);
    const dataCreate = {
      id_profile: data_profile.dataValues.id_profile,
      id_user,
      no_ktp,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      agama,
      golongan_darah,
      status,
      alamat_ktp,
      alamat_ktp_id_provinsi,
      alamat_ktp_id_kota,
      alamat_ktp_id_kecamatan,
      alamat_ktp_id_kelurahan,
      alamat_domisili,
      alamat_domisili_id_provinsi,
      alamat_domisili_id_kota,
      alamat_domisili_id_kecamatan,
      alamat_domisili_id_kelurahan,
      no_telpon,
      nama_kontak_darurat,
      nomor_kontak_darurat,
      expected_salary,
      is_relocation,
    };
    console.log(dataCreate);
    await profile.upsert(dataCreate);
    return;
  } catch (error) {
    throw error;
  }
};
