class TripRepo {
  constructor(tripData) {
    this.data = tripData;
  }

  
  //Need a currentTraveler
// need to get the trips for currentTraveler for THIS year.
// then take the trips and get the destinationID, total travelers, and duration
// with the destinationID get the destinations estimatedLodgingCostPerDay and * by #of travelers * duration
// Then add to that total the (estimatedFlighCostPerPerson * total travelers)
// take that total and * .10 for the agent fee. 
}

export default TripRepo;