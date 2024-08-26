import Check from "../../../../helpers/validation/check.js";
import { users } from "../../../manajemen_akses/models/user.models.js";
import { riwayat_pelatihan } from "../../models/riwayat_pelatihan.js";

export const create = async ({
  nama_pelatihan,
  is_sertifikat,
  tahun,
  id_user,
}) => {
  try {
    const user = await users.findByPk(id_user);
    Check.checkExistenceOrThrow(riwayat_pelatihan, "user");
    await riwayat_pelatihan.create({
      nama_pelatihan,
      is_sertifikat,
      tahun,
      id_user,
    });
    return;
  } catch (error) {
    throw error;
  }
};
