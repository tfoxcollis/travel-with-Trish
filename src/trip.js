class Trip {
  constructor(tripData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
  }

  startDate() {
    return new Date(this.date);
  }

  endDate() {
    let endDate = this.startDate();
    endDate.setDate(this.startDate().getDate() + this.duration)
    return endDate
  }
}

export default Trip;