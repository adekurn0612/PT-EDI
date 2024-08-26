import Check from "../../../../helpers/validation/check.js";
import { riwayat_pelatihan } from "../../models/riwayat_pelatihan.js";

export const update = async ({
  id_riwayat_pelatihan,
  nama_pelatihan,
  is_sertifikat,
  tahun,
  id_user,
}) => {
  try {
    const data_riwayat_pelatihan = await riwayat_pelatihan.findByPk(
      id_riwayat_pelatihan
    );
    Check.checkExistenceOrThrow(data_riwayat_pelatihan, "riwayat pelatihan");
    await riwayat_pelatihan.update(
      {
        nama_pelatihan,
        is_sertifikat,
        tahun,
        id_user,
      },
      { where: { id_riwayat_pelatihan } }
    );
    return;
  } catch (error) {
    throw error;
  }
};
