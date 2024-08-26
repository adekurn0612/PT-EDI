import { DataTypes } from "sequelize";
import { DB } from "../../../config/database/connections.js";

export const job_opening = DB.define(
  "job_opening",
  {
    id_job_opening: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_job: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    createdBy: {
      type: DataTypes.INTEGER,
    },
    createdName: {
      type: DataTypes.STRING,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    updatedName: {
      type: DataTypes.STRING,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
    },
    deletedName: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "master",
    freezeTableName: true,
    paranoid: true,
  }
);
if (process.env.APP == "DEV") {
  job_opening.sync({ alter: true });
}
