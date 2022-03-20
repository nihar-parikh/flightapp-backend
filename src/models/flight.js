import mongoose from "mongoose";
const { Schema } = mongoose;
import validator from "validator";

const flightSchema = new Schema(
  {
    from: {
      type: String,
      required: [true, "Please Enter Valid Place"],
      maxLength: [30, "Place cannot exceed 30 characters"],
      minLength: [3, "Place should have more than 3 characters"],
    },
    to: {
      type: String,
      required: [true, "Please Enter Valid Place"],
      maxLength: [30, "Place cannot exceed 30 characters"],
      minLength: [3, "Place should have more than 3 characters"],
    },
    departureDate: {
      type: String,
    },

    landingDate: {
      type: String,
    },

    price: {
      type: Number,
      required: [true, "Please Enter Flight Price"],
    },
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;
