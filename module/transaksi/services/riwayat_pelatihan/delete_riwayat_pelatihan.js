import Check from "../../../../helpers/validation/check.js";
import { riwayat_pelatihan } from "../../models/riwayat_pelatihan.js";

export const deleteRiwayatPelatihan = async ({ id_riwayat_pelatihan }) => {
  try {
    const data_riwayat_pelatihan = await riwayat_pelatihan.findByPk(
      id_riwayat_pelatihan
    );
    Check.checkExistenceOrThrow(data_riwayat_pelatihan, "riwayat pelatihan");
    await riwayat_pelatihan.destroy({
      where: {
        id_riwayat_pelatihan,
      },
    });
    return;
  } catch (error) {
    throw error;
  }
};
