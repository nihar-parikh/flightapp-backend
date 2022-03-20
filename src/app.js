import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Route imports
import userRouters from "./routes/user.js";
import flightRouters from "./routes/flight.js";
app.use("/api/v1", userRouters);
app.use("/api/v1", flightRouters);

//middleware for error
app.use(errorMiddleware); //using errorMiddleware

export default app;
