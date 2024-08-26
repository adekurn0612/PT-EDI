import { job_opening } from "../../models/job_opening.js";

export const createJobOpening = async ({ nama_job, status }) => {
  try {
    await job_opening.create({ nama_job, status });
    return;
  } catch (error) {
    throw error;
  }
};
