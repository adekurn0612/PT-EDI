import { DB } from "../../../../config/database/connections.js";

export const findResource = async ({ search_key, limit }) => {
  try {
    let filter = "";
    let sort = "";
    if (search_key && search_key !== "") {
      filter += ` and nama ilike '%${search_key}%'`;
    }
    if (limit && limit != "") {
      sort += ` and limit ${limit}`;
    }
    const data = await DB.queryString(
      `select nama , id_provinsi from master.ms_provinsi where "deletedAt" is null ${filter}  order by nama asc ${sort}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
