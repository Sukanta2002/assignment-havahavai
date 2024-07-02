import { app } from "./app.js";
import client from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

client
  .connect()
  .then(() => {
    console.log("PostgreSQL connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Connection error", err));
