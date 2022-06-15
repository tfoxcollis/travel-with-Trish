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

  findCurrentTrip(arr, date) {
    return arr.find(trip => trip.currentTrip(date))
  }

  filterById(travelerId, status) {
    let filterId = this.data.filter((trip) => {
      return trip.userID == travelerId
    })
    if(status) {
      return this.filterByStatus(filterId, status)
    }
    return filterId;
  }

  filterByStatus(arr, status) {
    let filterId = arr.filter(trip => trip.status == status);
    return filterId
  }

  filterByYear(trips, date) {
    let year = new Date(date).getFullYear();
    return trips.filter((trip) => {
      let thisYear = trip.startDate().getFullYear() === year
        return thisYear;
    })
  }

  getPaidTrips(travelerId, date) {
    let trips = this.filterById(travelerId, "approved");
    let pastAndCurrentTrips = this.filterPastTrips(trips, date);
    let currentTrip = this.findCurrentTrip(trips, date);
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