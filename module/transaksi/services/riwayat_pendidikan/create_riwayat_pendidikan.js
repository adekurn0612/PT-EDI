import Check from "../../../../helpers/validation/check.js";
import { users } from "../../../manajemen_akses/models/user.models.js";
import { riwayat_pendidikan } from "../../models/riwayat_pendidikan.js";

export const create = async ({
  nama_jenjang_pendidikan,
  nama_jurusan,
  nama_institusi_akademik,
  tahun_lulus,
  ipk,
  id_user,
}) => {
  try {
    const user = await users.findByPk(id_user);
    await Check.checkExistenceOrThrow(user, "user");
    await riwayat_pendidikan.create({
      nama_jenjang_pendidikan,
      nama_jurusan,
      nama_institusi_akademik,
      tahun_lulus,
      ipk,
      id_user,
    });
    return;
  } catch (error) {
    throw error;
  }
};
