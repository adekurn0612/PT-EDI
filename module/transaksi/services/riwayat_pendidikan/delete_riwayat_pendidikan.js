import Check from "../../../../helpers/validation/check.js";
import { riwayat_pendidikan } from "../../models/riwayat_pendidikan.js";

export const deleteRiwayatPendidikan = async ({ id_riwayat_pendidikan }) => {
  try {
    const data_riwayat_pendidikan = await riwayat_pendidikan.findByPk(
      id_riwayat_pendidikan
    );
    await Check.checkExistenceOrThrow(
      data_riwayat_pendidikan,
      "riwayat pendidikan"
    );
    await riwayat_pendidikan.destroy({ where: { id_riwayat_pendidikan } });
    return;
  } catch (error) {
    throw error;
  }
};
