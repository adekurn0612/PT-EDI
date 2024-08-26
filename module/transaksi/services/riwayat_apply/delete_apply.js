import { riwayat_apply } from "../../models/riwayat_apply.js";

export const deleteApply = async ({ id_riwayat_apply }) => {
  try {
    const data = await riwayat_apply.destroy({ where: { id_riwayat_apply } });
    return data;
  } catch (error) {
    throw error;
  }
};
