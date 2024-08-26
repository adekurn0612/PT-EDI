import { riwayat_apply } from "../../models/riwayat_apply.js";

export const update = async ({ id_riwayat_apply, data }) => {
  try {
    const result = await riwayat_apply.update(
      { data },
      { where: { id_riwayat_apply } }
    );

    return result;
  } catch (error) {
    throw error;
  }
};
