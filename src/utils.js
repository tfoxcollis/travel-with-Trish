//utils

import Destination from "./destination";
import Trip from "./trip";

const getTodaysDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return yyyy + '/' + mm + '/' + dd;
}

const calculateTripCost = (trip) => {
  let total = trip.getTicketPrices() + trip.getLodgingPrice();
  
  total += (total * .10)
  return total
}

export {
         getTodaysDate,
         calculateTripCost
       };