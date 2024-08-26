import { DB } from "../../../../config/database/connections";

export const getdetailApply = async ({ id_riwayat_apply }) => {
  try {
    let query = `
      SELECT 
        ra.*
        jo.nama_job
      FROM 
        transaksi.riwayat_apply ra
      JOIN 
        master.job_opening jo 
      ON 
        jo.id_job_opening = ra.id_job_opening
      WHERE 
        ra."deletedAt" IS NULL and ra.id_riwayat_apply = ${id_riwayat_apply}
    `;
    const data = await DB.queryString(query);

    return data;
  } catch (error) {
    throw error;
  }
};
