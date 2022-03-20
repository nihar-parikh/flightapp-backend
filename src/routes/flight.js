import express from "express";
import { addFlight, getAllFlights } from "../controllers/flight.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/flights/new",
  // isAuthenticatedUser,
  // authorizeRoles("admin"),
  addFlight
);
router.get("/flights", getAllFlights);

export default router;
