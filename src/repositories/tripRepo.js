import { getTodaysDate } from "../utils.js"

class TripRepo {
  constructor(tripData) {
    this.data = tripData;
  }

  filterPastTrips(arr, date) {
    return arr.filter(trip => trip.pastTrip(date))
  }

  filterFutureTrips(arr, date) {
    return arr.filter(trip => trip.futureTrip(date))
  }

  getCurrentTrip(arr, date) {
    return arr.find(trip => trip.currentTrip(date))
  }

  filterById(travelerId) {
    let filterId = this.data.filter((trip) => {
      return trip.userID == travelerId
    })
    return filterId;
  }

  filterByYear(trips, date) {
    let year = new Date(date).getFullYear();
    return trips.filter((trip) => {
      return trip.startDate().getFullYear() === year
    })
  }

  getPaidTrips(travelerId, date) {
    let trips = this.filterById(travelerId);
    let pastAndCurrentTrips = this.filterPastTrips(trips, date);
    let currentTrip = this.getCurrentTrip(trips, date);
    if(currentTrip) {
      pastAndCurrentTrips.push(currentTrip);
    }
    return this.filterByYear(pastAndCurrentTrips, date);
  }

  getYearTotal(travelerId, destinationsArr) {
    let date = getTodaysDate();
    let paidTrips = this.getPaidTrips(travelerId, date);
  }

  //Need a currentTravelerID - check
// need to get the trips for currentTraveler for THIS year. - check
// then take the trips and get the destinationID, total travelers, and duration
// with the destinationID get the destinations estimatedLodgingCostPerDay and * by #of travelers * duration
// Then add to that total the (estimatedFlighCostPerPerson * total travelers)
// take that total and * .10 for the agent fee. 
}

export default TripRepo;