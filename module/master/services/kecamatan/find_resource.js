import { DB } from "../../../../config/database/connections.js";

export const findResource = async ({ id_kota, limit }) => {
  try {
    let filter = "";
    let sort = "";
    if (id_kota && id_kota !== "") {
      filter += ` and id_kota = ${id_kota}`;
    }
    if (limit && limit != "") {
      sort += ` and limit ${limit}`;
    }
    const data = await DB.queryString(
      `select nama , id_kecamatan from master.ms_kecamatan where "deletedAt" is null ${filter} ${sort} order by nama asc ${sort}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
