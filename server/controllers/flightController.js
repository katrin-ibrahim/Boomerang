const Flight = require("../models/Flight");

updateFlight = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  const update = {
    $set: {
      FlightNumber: body.FlightNumber,
      DepartureTime: body.DepartureTime,
      ArrivalDate: body.ArrivalDate,
      DepartureDate: body.DepartureDate,
      ArrivalTime: body.ArrivalTime,
      "EconomySeats.AvailableSeats": body.EconomySeats,
      "BusinessSeats.AvailableSeats": body.BusinessSeats,
      "FirstClassSeats.AvailableSeats": body.FirstClassSeats,
      DepartureAirport: body.DepartureAirport,
      ArrivalAirport: body.ArrivalAirport,
      DepartureTerminal: body.DepartureTerminal,
      ArrivalTerminal: body.ArrivalTerminal,
    },
  };
  await Flight.findOneAndUpdate({ _id: req.params.id }, update, { new: true })
    .then((flight) => {
      return res.status(200).json({
        success: true,
        id: flight._id,
        data: flight,
        message: "Flight updated!",
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
        message: "Flight not updated!",
      });
    });
};

deleteFlight = async (req, res) => {
  await Flight.findByIdAndDelete({ _id: req.params.id }, (err, flight) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!flight) {
      return res
        .status(404)
        .json({ success: false, error: `Flight not found` });
    }

    return res.status(200).json({ success: true, data: flight });
  }).catch((err) => console.log(err));
};

createFlight = (req, res) => {
  Flight.create(req.body)
    .then((user) =>
      res.json({ msg: "Flight added successfully", data: req.body })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

getFlights = (req, res) => {
  Flight.find()
    .then((flights) => res.json(flights))
    .catch((err) =>
      res.status(404).json({ noflightsfound: "No Flights found" })
    );
};

getFlightById = async (req, res) => {
  await Flight.findOne({ _id: req.params.id }, (err, flight) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!flight) {
      return res
        .status(404)
        .json({ success: false, error: "Flight not found" });
    }
    return res.status(200).json({ success: true, data: flight });
  }).catch((err) => console.log(err));
};

module.exports = {
  updateFlight,
  deleteFlight,
  createFlight,
  getFlights,
  getFlightById,
};