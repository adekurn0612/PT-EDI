import Check from "../../../../helpers/validation/check.js";
import { users } from "../../../manajemen_akses/models/user.models.js";
import { riwayat_pekerjaan } from "../../models/riwayat_pekerjaan.js";

export const deleteRiwayatPekerjaan = async ({ id_riwayat_pekerjaan }) => {
  try {
    const data_riwayat_pekerjaan = await riwayat_pekerjaan.findByPk(
      id_riwayat_pekerjaan
    );
    Check.checkExistenceOrThrow(data_riwayat_pekerjaan, "riwayat pekerjaan");
    await riwayat_pekerjaan.destroy({
      where: {
        id_riwayat_pekerjaan,
      },
    });
    return;
  } catch (error) {
    throw error;
  }
};
