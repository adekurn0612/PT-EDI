import FormatResponse from "../../../helpers/response/responseHelper.js";
import Check from "../../../helpers/validation/check.js";
import riwayatPendidikanController from "./../services/riwayat_pendidikan/index.js";

const create_riwayat = async (req, res, next) => {
  try {
    const {
      nama_jenjang_pendidikan,
      nama_jurusan,
      nama_institusi_akademik,
      tahun_lulus,
      ipk,
      id_user,
    } = req.body;
    let array = [
      {
        method: `string`,
        key: nama_jenjang_pendidikan,
        variable_name: `nama_jenjang_pendidikan`,
      },
      {
        method: `string`,
        key: nama_jurusan,
        variable_name: `nama_jurusan`,
      },
      {
        method: `string`,
        key: nama_institusi_akademik,
        variable_name: `nama_institusi_akademik`,
      },
      {
        method: `number`,
        key: +tahun_lulus,
        variable_name: `tahun_lulus`,
      },
      {
        method: `number`,
        key: +ipk,
        variable_name: `ipk`,
      },
      {
        method: `string`,
        key: +id_user,
        variable_name: `user`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatPendidikanController.create({
      nama_jenjang_pendidikan,
      nama_jurusan,
      nama_institusi_akademik,
      tahun_lulus,
      ipk,
      id_user,
    });
    req.body.responses = FormatResponse.successObject({
      data: null,
    });
    next();
  } catch (error) {
    next(error);
  }
};
const update_riwayat = async (req, res, next) => {
  try {
    const {
      id_riwayat_pendidikan,
      nama_jenjang_pendidikan,
      nama_jurusan,
      nama_institusi_akademik,
      tahun_lulus,
      ipk,
      id_user,
    } = req.body;
    let array = [
      {
        method: `string`,
        key: nama_jenjang_pendidikan,
        variable_name: `nama_jenjang_pendidikan`,
      },
      {
        method: `string`,
        key: nama_jurusan,
        variable_name: `nama_jurusan`,
      },
      {
        method: `string`,
        key: nama_institusi_akademik,
        variable_name: `tahun`,
      },
      {
        method: `number`,
        key: +tahun_lulus,
        variable_name: `tahun_lulus`,
      },
      {
        method: `number`,
        key: +ipk,
        variable_name: `ipk`,
      },
      {
        method: `number`,
        key: +id_user,
        variable_name: `user`,
      },
      {
        method: `number`,
        key: +id_riwayat_pendidikan,
        variable_name: `user`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatPendidikanController.update({
      id_riwayat_pendidikan,
      nama_jenjang_pendidikan,
      nama_jurusan,
      nama_institusi_akademik,
      tahun_lulus,
      ipk,
      id_user,
    });
    req.body.responses = FormatResponse.successObject({
      data: null,
    });
    next();
  } catch (error) {
    next(error);
  }
};

const delete_riwayat = async (req, res, next) => {
  try {
    const { id_riwayat_pendidikan } = req.body;
    let array = [
      {
        method: `number`,
        key: id_riwayat_pendidikan,
        variable_name: `riwayat pekerjaan`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatPendidikanController.deleteRiwayatPendidikan({
      id_riwayat_pendidikan,
    });
    req.body.responses = FormatResponse.successObject({
      data: null,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default { create_riwayat, delete_riwayat, update_riwayat };
