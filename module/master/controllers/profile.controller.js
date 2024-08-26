import FormatResponse from "../../../helpers/response/responseHelper.js";
import Check from "../../../helpers/validation/check.js";
import profileService from "../services/profile/index.js";

const create = async (req, res, next) => {
  try {
    const {
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
    } = req.body;
    let array = [
      { method: `number`, key: +id_user, variable_name: `user` },
      { method: `number`, key: +no_ktp, variable_name: `nomor ktp` },
      { method: `string`, key: tempat_lahir, variable_name: `tempat lahir` },
      { method: `string`, key: tanggal_lahir, variable_name: `tanggal lahir` },
      { method: `string`, key: jenis_kelamin, variable_name: `jenis kelamin` },
      { method: `string`, key: agama, variable_name: `agama` },
      {
        method: `string`,
        key: golongan_darah,
        variable_name: `golongan_darah`,
      },
      { method: `string`, key: status, variable_name: `status` },
      { method: `string`, key: alamat_ktp, variable_name: `alamat_ktp` },
      {
        method: `number`,
        key: +alamat_ktp_id_provinsi,
        variable_name: `alamat ktp provinsi`,
      },
      {
        method: `number`,
        key: +alamat_ktp_id_kota,
        variable_name: `alamat ktp , kota`,
      },
      {
        method: `number`,
        key: +alamat_ktp_id_kecamatan,
        variable_name: `alamat ktp kecamatan`,
      },
      {
        method: `number`,
        key: +alamat_ktp_id_kelurahan,
        variable_name: `alamat ktp kelurahan`,
      },
      {
        method: `string`,
        key: alamat_domisili,
        variable_name: `alamat_domisili`,
      },
      {
        method: `number`,
        key: +alamat_domisili_id_provinsi,
        variable_name: `alamat domisili provinsi`,
      },
      {
        method: `number`,
        key: +alamat_domisili_id_kota,
        variable_name: `alamat domisili , kota`,
      },
      {
        method: `number`,
        key: +alamat_domisili_id_kecamatan,
        variable_name: `alamat domisili kecamatan`,
      },
      {
        method: `number`,
        key: +alamat_domisili_id_kelurahan,
        variable_name: `alamat domisili kelurahan`,
      },
      { method: `string`, key: +no_telpon, variable_name: `no telpon` },
      {
        method: `string`,
        key: +nama_kontak_darurat,
        variable_name: `nama_kontak_darurat`,
      },
      {
        method: `string`,
        key: +nomor_kontak_darurat,
        variable_name: `nomor_kontak_darurat`,
      },
      {
        method: `string`,
        key: +expected_salary,
        variable_name: `expected_salary`,
      },
      {
        method: `string`,
        key: +is_relocation,
        variable_name: `penempatan dimana saja`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await profileService.create({
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
    });
    req.body.responses = FormatResponse.successObject({
      data: null,
    });
    next();
  } catch (error) {
    next(error);
  }
};

const getDetailProfile = async (req, res, next) => {
  try {
    const data = await profileService.getDetail();
    req.body.responses = FormatResponse.successObject({
      data,
    });
    next();
  } catch (error) {
    next(error);
  }
};

// const update = async (req, res, next) => {
//   try {
//     const { id_job_opening, id_user, no_ktp } = req.body;
//     let array = [
//       { method: `number`, key: +id_job_opening, variable_name: `nama job` },
//       { method: `number`, key: +id_user, id_user: `user` },
//       { method: `number`, key: +no_ktp, id_user: `no_ktp` },
//       { method: `number`, key: +no_ktp, id_user: `no_ktp` },
//     ];
//     await Check.multiple_check_stringvar({ array });
//   } catch (error) {
//     next(error);
//   }
// };

// const delete = async (req, res, next) => {
//   try {
//     const { id_job_opening, id_user, no_ktp } = req.body;
//     let array = [
//       { method: `number`, key: +id_job_opening, variable_name: `nama job` },
//       { method: `number`, key: +id_user, id_user: `user` },
//       { method: `number`, key: +no_ktp, id_user: `no_ktp` },
//       { method: `number`, key: +no_ktp, id_user: `no_ktp` },
//     ];
//     await Check.multiple_check_stringvar({ array });
//   } catch (error) {
//     next(error);
//   }
// };

export default { create, getDetailProfile };
