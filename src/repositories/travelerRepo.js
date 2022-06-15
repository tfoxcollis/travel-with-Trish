class TravelerRepo {
  constructor(travelData) {
    this.data = travelData;
  }

  // need for login
  findById(id) {
    let traveler;
    if (id === undefined) {
      return "Oops it looks like no id was passed in";
    } else {
      traveler = this.data.find((traveler) => traveler.id === id);
    }
    if(traveler) {
      return traveler;
    } else {
      return "Traveler not found";
    }
  }

}


export default TravelerRepo;