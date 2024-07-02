import { Router } from "express";
import { getAirportDetails } from "../controllers/airport.controller.js";

const router = Router();

router.route("/:iata_code").get(getAirportDetails);

export default router;
