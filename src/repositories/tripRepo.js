import { getTodaysDate, calculateTripCost } from "../utils.js"

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
      let thisYear = trip.startDate().getFullYear() === year
        return thisYear;
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

  getYearTotal(travelerId) {
    let date = getTodaysDate();
    let paidTrips = this.getPaidTrips(travelerId, date);
    let totalExpenses = paidTrips.reduce((acc, trip) => {
      acc += calculateTripCost(trip)
      return acc;
    }, 0);
    return totalExpenses;
  }

}

export default TripRepo;