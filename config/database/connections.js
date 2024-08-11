import { Sequelize, QueryTypes } from "sequelize";

// Initialize Sequelize instance
export const DB = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  pool: {
    max: 10, // Adjust as needed based on your application's load
    min: 0,
    idle: 10000, // Default value is 10000ms
    acquire: 30000, // Default value is 30000ms
  },
  logging: false, // Change to `console.log` if you want to see SQL queries
});

// Custom query function
DB.queryString = function (querystring) {
  return new Promise(async (resolve, reject) => {
    try {
      // Execute the query using the Sequelize instance
      let query = await this.query(querystring, { type: QueryTypes.SELECT });
      resolve(query);
    } catch (error) {
      reject(error);
    }
  });
};
