class Destination {
  constructor(destinationData) {
    this.id = destinationData.id;
    this.destination = destinationData.destination;
    this.LodgingPerDay = destinationData.estimatedLodgingCostPerDay;
    this.flightCostPerPerson = destinationData.estimatedFlightCostPerPerson;
    this.image = destinationData.image;
    this.alt = destinationData.alt;
  }
}

export default Destination;