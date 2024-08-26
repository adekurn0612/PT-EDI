import FormatResponse from "../../../helpers/response/responseHelper.js";
import Check from "../../../helpers/validation/check.js";
import riwayatPelatihanController from "./../services/riwayat_pelatihan/index.js";

const create_riwayat = async (req, res, next) => {
  try {
    const { nama_pelatihan, is_sertifikat = false, tahun, id_user } = req.body;
    let array = [
      {
        method: `string`,
        key: nama_pelatihan,
        variable_name: `nama pelatihan`,
      },
      {
        method: `boolean`,
        key: is_sertifikat,
        variable_name: `posisi terakhir`,
      },
      {
        method: `number`,
        key: +tahun,
        variable_name: `tahun`,
      },

      {
        method: `string`,
        key: +id_user,
        variable_name: `user`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatPelatihanController.create({
      nama_pelatihan,
      is_sertifikat,
      tahun,
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
      id_riwayat_pelatihan,
      nama_pelatihan,
      is_sertifikat,
      tahun,
      id_user,
    } = req.body;
    let array = [
      {
        method: `string`,
        key: nama_pelatihan,
        variable_name: `nama pelatihan`,
      },
      {
        method: `boolean`,
        key: is_sertifikat,
        variable_name: `posisi terakhir`,
      },
      {
        method: `number`,
        key: +tahun,
        variable_name: `tahun`,
      },

      {
        method: `string`,
        key: +id_user,
        variable_name: `user`,
      },
      {
        method: `string`,
        key: +id_riwayat_pelatihan,
        variable_name: `user`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatPelatihanController.update({
      id_riwayat_pelatihan,
      nama_pelatihan,
      is_sertifikat,
      tahun,
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
    const { id_riwayat_pelatihan } = req.body;
    let array = [
      {
        method: `number`,
        key: id_riwayat_pelatihan,
        variable_name: `riwayat pelatihanrjaan`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    await riwayatPelatihanController.deleteRiwayatPelatihan({
      id_riwayat_pelatihan,
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
