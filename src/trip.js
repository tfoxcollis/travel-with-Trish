class Trip {
  constructor(tripData, destination) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.destination = destination;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
  }

  getTicketPrices() {
    return this.travelers * this.destination.flightCostPerPerson
  }

  getLodgingPrice() {
    return this.duration * this.destination.lodgingPerDay
  }

  startDate() {
    return new Date(this.date);
  }

  endDate() {
    let endDate = this.startDate();
    endDate.setDate(this.startDate().getDate() + this.duration)
    return endDate
  }

  pastTrip(currentDate) {
    let today = new Date(currentDate);
    if(today > this.endDate()) {
      return true;
    }
    return false
  }

  currentTrip(currentDate) {
    let today = new Date(currentDate);
    if(today >= this.startDate() && today <= this.endDate()) {
      return true 
    }
    return false
  }

  futureTrip(currentDate) {
    let today = new Date(currentDate);
    if(today < this.startDate()) {
      return true;
    }
    return false
  }
}

export default Trip;