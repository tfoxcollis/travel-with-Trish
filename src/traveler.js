class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.type = travelerData.travelerType;
  }

  returnFirstName() {
    if (this.name === undefined) {
      return "Oops it looks like your name is missing from our data base";
    } else {
      return this.name.split(" ")[0];
    }
  }
}

export default Traveler;