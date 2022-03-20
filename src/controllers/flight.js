import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Flight from "../models/flight.js";

//Add flight
export const addFlight = catchAsyncErrors(async (req, res, next) => {
  const { from, to, departureDate, landingDate, price } = req.body;
  // console.log(req.body);

  const flight = await Flight.create({
    from,
    to,
    departureDate: new Date(departureDate),
    landingDate: new Date(landingDate),
    price,
  });
  res.status(201).json({
    success: true,
    flight,
  });
});

//Get all flights
export const getAllFlights = catchAsyncErrors(async (req, res, next) => {
  const { from, to, departureDate, priceGte, priceLte } = req.query;
  // console.log(departureDate);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let fromDate = new Date(departureDate);
  let finalFromDate =
    days[fromDate.getDay()] +
    " " +
    months[fromDate.getMonth()] +
    " " +
    fromDate.getDate() +
    " " +
    fromDate.getFullYear();
  // console.log(finalFromDate);
  let searchQuery = {};
  if (from) {
    searchQuery.from = {
      $regex: from,
      $options: "i",
    };
  }
  if (to) {
    searchQuery.to = {
      $regex: to,
      $options: "i",
    };
  }

  if (departureDate) {
    searchQuery.departureDate = {
      $regex: finalFromDate,
      $options: "i",
    };
  }

  if (priceGte) {
    searchQuery.price = {
      $gte: priceGte,
    };
  }
  if (priceLte) {
    searchQuery.price = {
      $lte: priceLte,
    };
  }
  if (priceGte && priceLte) {
    searchQuery.price = {
      $gte: priceGte,
      $lte: priceLte,
    };
  }

  const flights = await Flight.find(searchQuery);
  res.status(200).json({
    success: true,
    flights,
  });
});
