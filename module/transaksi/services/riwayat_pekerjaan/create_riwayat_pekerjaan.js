import Check from "../../../../helpers/validation/check.js";
import { users } from "../../../manajemen_akses/models/user.models.js";
import { riwayat_pekerjaan } from "../../models/riwayat_pekerjaan.js";

export const create = async ({
  nama_perusahaan,
  posisi_terakhir,
  tahun,
  pendapatan_terakhir,
  id_user,
}) => {
  try {
    const user = await users.findByPk(id_user);
    Check.checkExistenceOrThrow(user, "user");
    await riwayat_pekerjaan.create({
      nama_perusahaan,
      posisi_terakhir,
      tahun,
      pendapatan_terakhir,
      id_user,
    });
    return;
  } catch (error) {
    throw error;
  }
};
