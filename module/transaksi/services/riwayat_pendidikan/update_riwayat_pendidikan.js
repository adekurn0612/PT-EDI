import { where } from "sequelize";
import Check from "../../../../helpers/validation/check.js";
import { riwayat_pendidikan } from "../../models/riwayat_pendidikan.js";

export const update = async ({
  id_riwayat_pendidikan,
  nama_jenjang_pendidikan,
  nama_jurusan,
  nama_institusi_akademik,
  tahun_lulus,
  ipk,
  id_user,
}) => {
  try {
    const data_riwayat_pendidikan = await riwayat_pendidikan.findByPk(
      id_riwayat_pendidikan
    );
    Check.checkExistenceOrThrow(data_riwayat_pendidikan, "riwayat pendidikan");
    await riwayat_pendidikan.update(
      {
        nama_jenjang_pendidikan,
        nama_jurusan,
        nama_institusi_akademik,
        tahun_lulus,
        ipk,
        id_user,
      },
      {
        where: {
          id_riwayat_pendidikan,
        },
      }
    );
    return;
  } catch (error) {
    throw error;
  }
};
