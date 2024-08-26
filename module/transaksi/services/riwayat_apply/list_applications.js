import { DB } from "../../../../config/database/connections.js";

export const getList = async ({
  limit,
  offset,
  sort_key,
  sort_by,
  search_key,
}) => {
  try {
    let query = `
      SELECT
      ra.id_riwayat_apply,
        ra.nama_lengkap, 
        ra.tempat_lahir, 
        ra.tanggal_lahir, 
        jo.nama_job
      FROM 
        transaksi.riwayat_apply ra
      JOIN 
        master.job_opening jo 
      ON 
        jo.id_job_opening = ra.id_job_opening
      WHERE 
        ra."deletedAt" IS NULL
    `;

    // Execute the query with parameters
    const data = await DB.queryString(query);

    return data;
    return data;
  } catch (error) {
    throw error;
  }
};
