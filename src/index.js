import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });



connectDB()
    .then(() => {

        app.on("error", () => {
            console.log(`Some Error occoured when starting the express server`);
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`The server is listening on potr : ${process.env.PORT}`);
        });

    })
    .catch((error) => {
        console.log("Some Error Occoured in MongoDB !!!", error);
    });