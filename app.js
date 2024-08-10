import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { DB } from "./config/database/connections.js";
import router from "./routers/index.js";
import Middlewares from "./middlewares/index.js";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT_EXPRESS || 999;

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

app.use(express.static("assets"));
app.use(morgan("dev"));
// app.use(router);
// app.use("", (req, res, next) => {
//   res.status(404).json("404 Not found");
// });
Middlewares.configure(app);
server
  .listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      DB.authenticate();
      console.log("Database OK");
    } catch (error) {
      console.error("Database Error", error);
    }
  })
  .on("error", (error) => {
    console.error("Server Error", error);
  });
