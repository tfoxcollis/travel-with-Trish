import { getTodaysDate } from "../utils.js"

class TripRepo {
  constructor(tripData) {
    this.data = tripData;
  }

  filterPastTrips() {
    return this.data.filter(trip => trip.pastTrip(getTodaysDate()))
  }

  filterFutureTrips() {
    return this.data.filter(trip => trip.futureTrip(getTodaysDate()))
  }

  getCurrentTrip() {
    return this.data.find(trip => trip.currentTrip(getTodaysDate()))
  }

  filterById(travelerId) {
    let filterId = this.data.filter((trip) => {
      return trip.userID == travelerId
    })
    return filterId;
  }

  filterByYear(date, trips) {
    
  }

  getYearTotal(travelerId, destinationsArr) {
    let date = getTodaysDate();
    let trips = this.filterById(travelerId)
    let thisYearsTrips = this.filterByYear(date, trips)
  }

  //Need a currentTravelerID
// need to get the trips for currentTraveler for THIS year.
// then take the trips and get the destinationID, total travelers, and duration
// with the destinationID get the destinations estimatedLodgingCostPerDay and * by #of travelers * duration
// Then add to that total the (estimatedFlighCostPerPerson * total travelers)
// take that total and * .10 for the agent fee. 
}

export default TripRepo;