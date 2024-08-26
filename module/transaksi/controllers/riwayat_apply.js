import FormatResponse from "../../../helpers/response/responseHelper.js";
import Check from "../../../helpers/validation/check.js";
import riwayatApply from "./../services/riwayat_apply/index.js";

const detail_apply = async (req, res, next) => {
  try {
    const { id_riwayat_apply } = req.query;
    let array = [
      {
        method: `number`,
        key: +id_riwayat_apply,
        variable_name: `id_riwayat_apply`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    const data = await riwayatApply.getDetail({ id_riwayat_apply });
    req.body.responses = FormatResponse.successObject({
      data,
    });
    next();
  } catch (error) {
    next(error);
  }
};

const list_apply = async (req, res, next) => {
  try {
    const { search_key, limit, pages, sort_key, sort_by } = req.query;
    const offset = (pages - 1) * limit;
    const data = await riwayatApply.getList({
      search_key,
      limit,
      offset,
      sort_key,
      sort_by,
    });
    req.body.responses = FormatResponse.successObject({
      data,
    });
    await next();
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const {
      id_job_opening,
      id_user,
      no_ktp,
      agama,
      status,
      nama_lengkap,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      golongan_darah,
      alamat_ktp,
      alamat_ktp_id_provinsi,
      alamat_ktp_provinsi,
      alamat_ktp_id_kota,
      alamat_ktp_kota,
      alamat_ktp_id_kecamatan,
      alamat_ktp_kecamatan,
      alamat_ktp_id_kelurahan,
      alamat_ktp_kelurahan,
      alamat_domisili,
      alamat_domisili_id_provinsi,
      alamat_domisili_provinsi,
      alamat_domisili_id_kota,
      alamat_domisili_kota,
      alamat_domisili_id_kecamatan,
      alamat_domisili_kecamatan,
      alamat_domisili_id_kelurahan,
      alamat_domisili_kelurahan,
      no_telpon,
      nama_kontak_darurat,
      nomor_kontak_darurat,
      riwayat_pekerjaan,
      riwayat_pendidikan,
      riwayat_pelatihan,
      is_relocation,
      expected_salary,
    } = req.body;
    await riwayatApply.create({
      id_job_opening,
      id_user: req.headers.id_user,
      id_user,
      no_ktp,
      agama,
      status,
      nama_lengkap,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      golongan_darah,
      alamat_ktp,
      alamat_ktp_id_provinsi,
      alamat_ktp_provinsi,
      alamat_ktp_id_kota,
      alamat_ktp_kota,
      alamat_ktp_id_kecamatan,
      alamat_ktp_kecamatan,
      alamat_ktp_id_kelurahan,
      alamat_ktp_kelurahan,
      alamat_domisili,
      alamat_domisili_id_provinsi,
      alamat_domisili_provinsi,
      alamat_domisili_id_kota,
      alamat_domisili_kota,
      alamat_domisili_id_kecamatan,
      alamat_domisili_kecamatan,
      alamat_domisili_id_kelurahan,
      alamat_domisili_kelurahan,
      no_telpon,
      nama_kontak_darurat,
      nomor_kontak_darurat,
      riwayat_pekerjaan,
      riwayat_pendidikan,
      riwayat_pelatihan,
      is_relocation,
      expected_salary,
    });
    req.body.responses = FormatResponse.successObject({
      data: null,
    });
    next();
  } catch (error) {
    next(error);
  }
};

const delete_apply = async (req, res, next) => {
  try {
    const { id_riwayat_apply } = req.body;
    let array = [
      {
        method: `number`,
        key: +id_riwayat_apply,
        variable_name: `riwayat apply`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatApply.deleteApply({ id_riwayat_apply });
    req.body.responses = FormatResponse.successObject({
      data: null,
    });
    next();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id_riwayat_apply, data } = req.body;
    let array = [
      {
        method: `number`,
        key: +id_riwayat_apply,
        variable_name: `riwayat apply`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatApply.update({ id_riwayat_apply, data });
    req.body.responses = FormatResponse.successObject({
      data: null,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default { create, delete_apply, detail_apply, list_apply, update };
