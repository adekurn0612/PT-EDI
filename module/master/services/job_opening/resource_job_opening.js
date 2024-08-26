import { DB } from "../../../../config/database/connections.js";

export const resourceJobOpening = async ({ search_key, limit, status }) => {
  try {
    let sort = "";
    let search = "";
    if (limit && limit !== "") {
      sort = `limit ${limit}`;
    }
    if (search_key && search_key !== "") {
      search += `and nama_job ilike '%${search_key}%'`;
    }
    if (status != "" && typeof status === "boolean") {
      search += `and status = ${status}`;
    }
    console.log({ search, sort });
    const data = await DB.queryString(
      `select id_job_opening , nama_job from master.job_opening where "deletedAt" is null ${search} ${sort}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
