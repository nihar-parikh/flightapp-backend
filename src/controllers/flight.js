import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Flight from "../models/flight.js";

//Add flight
export const addFlight = catchAsyncErrors(async (req, res, next) => {
  const { from, to, departureDate, landingDate, price } = req.body;
  console.log(req.body);

  const flight = await Flight.create({
    from,
    to,
    departureDate: new Date(departureDate),
    landingDate: new Date(landingDate),
    price,
  });
  console.log(flight);
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

  const flights = await Flight.find(searchQuery).sort({ price: 1 });
  res.status(200).json({
    success: true,
    flights,
  });
});

//update flight
export const updateFlight = catchAsyncErrors(async (req, res, next) => {
  const { from, to, departureDate, landingDate, price } = req.body;
  console.log(req.body);

  const updatedFlight = {};
  if (from) {
    updatedFlight.from = from;
  }
  if (to) {
    updatedFlight.to = to;
  }
  if (departureDate) {
    updatedFlight.departureDate = new Date(departureDate);
  }
  if (landingDate) {
    updatedFlight.landingDate = new Date(landingDate);
  }
  if (price) {
    updatedFlight.price = price;
  }
  const flight = await Flight.findByIdAndUpdate(req.params.id, updatedFlight, {
    new: true,
  });
  if (!flight) {
    return res.status(404).send({
      success: false,
    });
  }
  await flight.save();

  console.log(flight);
  res.status(200).json({
    success: true,
    flight,
  });
});

//delete flight
export const deleteFlight = catchAsyncErrors(async (req, res, next) => {
  const flight = await Flight.findByIdAndDelete(req.params.id);
  if (!flight) {
    return res.status(404).send({
      success: false,
    });
  }
  res.status(200).send({
    success: "flight has been deleted successfully",
    flight: flight,
  });
});
