import express from "express";
import {
  addFlight,
  deleteFlight,
  getAllFlights,
  updateFlight,
} from "../controllers/flight.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/flights/new",
  // isAuthenticatedUser,
  // authorizeRoles("admin"),
  addFlight
);
router.get("/flights", getAllFlights);

router.put(
  "/flights/:id",
  // isAuthenticatedUser,
  // authorizeRoles("admin"),
  updateFlight
);

router.delete(
  "/flights/delete/:id",
  // isAuthenticatedUser,
  // authorizeRoles("admin"),
  deleteFlight
);

export default router;
