import { DB } from "../../../../config/database/connections.js";

export const findResource = async ({ id_provinsi, limit }) => {
  try {
    let filter = "";
    let sort = "";
    if (id_provinsi && id_provinsi !== "") {
      filter += ` and id_provinsi = ${id_provinsi}`;
    }
    if (limit && limit != "") {
      sort += ` and limit ${limit}`;
    }
    const data = await DB.queryString(
      `select nama , id_kota from master.ms_kota where "deletedAt" is null ${filter} ${sort} order by nama asc ${sort}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
