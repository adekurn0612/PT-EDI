import FormatResponse from "../../../helpers/response/responseHelper.js";
import Check from "../../../helpers/validation/check.js";
import riwayatPekerjaanController from "./../services/riwayat_pekerjaan/index.js";

const create_riwayat = async (req, res, next) => {
  try {
    const {
      nama_perusahaan,
      posisi_terakhir,
      tahun,
      pendapatan_terakhir,
      id_user,
    } = req.body;
    let array = [
      {
        method: `string`,
        key: nama_perusahaan,
        variable_name: `nama perusahaan`,
      },
      {
        method: `string`,
        key: posisi_terakhir,
        variable_name: `posisi terakhir`,
      },
      {
        method: `string`,
        key: +tahun,
        variable_name: `tahun`,
      },
      {
        method: `string`,
        key: pendapatan_terakhir,
        variable_name: `pendapatan terakhir`,
      },
      {
        method: `string`,
        key: +id_user,
        variable_name: `user`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatPekerjaanController.create({
      nama_perusahaan,
      posisi_terakhir,
      tahun,
      pendapatan_terakhir,
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
      id_riwayat_pekerjaan,
      nama_perusahaan,
      posisi_terakhir,
      tahun,
      pendapatan_terakhir,
      id_user,
    } = req.body;
    let array = [
      {
        method: `number`,
        key: id_riwayat_pekerjaan,
        variable_name: `riwayat pekerjaan`,
      },
      {
        method: `string`,
        key: nama_perusahaan,
        variable_name: `nama perusahaan`,
      },
      {
        method: `string`,
        key: posisi_terakhir,
        variable_name: `posisi terakhir`,
      },
      {
        method: `string`,
        key: +tahun,
        variable_name: `tahun`,
      },
      {
        method: `string`,
        key: pendapatan_terakhir,
        variable_name: `pendapatan terakhir`,
      },
      {
        method: `number`,
        key: +id_user,
        variable_name: `user`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatPekerjaanController.update({
      id_riwayat_pekerjaan,
      nama_perusahaan,
      posisi_terakhir,
      tahun,
      pendapatan_terakhir,
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
    const { id_riwayat_pekerjaan } = req.body;
    let array = [
      {
        method: `number`,
        key: id_riwayat_pekerjaan,
        variable_name: `riwayat pekerjaan`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatPekerjaanController.deleteRiwayatPekerjaan({
      id_riwayat_pekerjaan,
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
