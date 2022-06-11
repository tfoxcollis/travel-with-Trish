class TravelerRepo {
  constructor(travelData) {
    this.data = travelData;
  }

  // need for login
  findById(id) {
    if (id === undefined) {
      return "Oops it looks like no id was passed in";
    } else {
      return this.data.find((traveler) => traveler.id === id);
    }
  }

}


export default TravelerRepo;