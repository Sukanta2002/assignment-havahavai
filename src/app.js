import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// To set the cors

// In the options give the origine and credentials
app.use(cors());

// Use to limit the json size that the load is very low
app.use(express.json({ limit: "16kb" }));
// This is used to recive the data in url format
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
import airportRoutes from "./routes/airport.routes.js";

app.get("/", (req, res) => {
  res.send("Assignment Havahavai API 👏");
});
app.use("/api/airport", airportRoutes);

app.use(errorHandler);
export { app };
