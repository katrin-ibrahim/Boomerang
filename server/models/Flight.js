const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  FlightNumber: {
    type: String,
    required: true
  },
  DepartureTime: {
    type: String,
    required: true
  },
  ArrivalTime: {
    type: String,
    required: true
  },
  DepartureDate: {
    type: Date,
    required: true
  },

  ArrivalDate: {
    type: Date,
    required: true
  },

  EconomySeats: {
    type: Number,
    required: true
  },


  BusinessSeats: {
    type: Number,
    required: true
  },

  FirstClassSeats: {
    type: Number,
    required: true
  },

  Airport: {
    type: String,
    required: true 
  },

});

module.exports = Flight = mongoose.model('flight', FlightSchema);


