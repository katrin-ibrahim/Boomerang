const Reservation = require("../models/Reservation");
const Flight = require("../models/Flight");

deleteReservation = async (req, res) => {
    await Reservation.findByIdAndDelete({ _id: req.params.id }, (err, reservation) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
  
      if (!reservation) {
        return res
          .status(404)
          .json({ success: false, error: `Reservation not found` });
      }
  
      return res.status(200).json({ success: true, data: reservation});
    }).catch((err) => console.log(err));
  };



  getReservationById = (req, res) => {
     Reservation.find({UserId: req.params.id }, (err, reservation) =>{
        console.log(reservation);
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
  
      if (!reservation) {
        return res
          .status(404)
          .json({ success: false, error: "Reservation not found" });
      }
      return res.status(200).json({ success: true, data: reservation});
    })
    .populate({path: 'Reservation.FlightId', select:['DepartureTime', 'ArrivalTime', 'DepartureDate', 'ArrivalDate','DepartureAirport', 'DepartureTermnal', 'ArrivalAirport', 'ArrivalTerminal', 'TripDuration']})
    .catch((err) => console.log(err));
  };
   
 createReservation = (req, res) => {
   var reser =  Reservation.create(req.body)
      .then((user) =>
        res.json({ msg: "Reservation added successfully", data: req.body })
      )
      .catch((err) =>
        res.status(400).json({ error: "Unable to add this reservation" })
      );
        //var seat = req.body.Reservation[0][ChosenSeat]
       // Flight.update(
            //{ _id: req.body.Reservation[0][FlightId]},
            //{
                /*$set: {
                    "EconomySeats.Seats.$.Seat": "A2",
                    "EconomySeats.AvailableSeats": ,
                 }*/
                // $inc: {"EconomySeats.$.AvailableSeats": -1}

            //}
       // )
      /*switch(req.body.CabinClass){
          case 'Economy':{
              
          }
          case 'Business':{
            cclass = 'BusinessSeats';break;  
          }
          case 'FirstClass':{
            cclass = 'FirstClassSeats';break;
          }
          default: {
              break;
          }
      }*/
   
          
    

  };

  module.exports = {
    deleteReservation,
    createReservation,
    getReservationById,
  };