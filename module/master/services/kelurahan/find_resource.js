import { DB } from "../../../../config/database/connections.js";

export const findResource = async ({ id_kecamatan, limit }) => {
  try {
    let filter = "";
    let sort = "";
    if (id_kecamatan && id_kecamatan !== "") {
      filter += ` and id_kecamatan = ${id_kecamatan}`;
    }
    if (limit && limit != "") {
      sort += ` and limit ${limit}`;
    }
    console.log({ id_kecamatan, limit });
    const data = await DB.queryString(
      `select nama , id_kelurahan from master.ms_kelurahan where "deletedAt" is null ${filter} ${sort} order by nama asc ${sort}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
