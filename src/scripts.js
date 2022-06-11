import { getData, postData } from "./apiCalls.js";

import TravelerRepo from "./repositories/travelerRepo";
import Traveler from "../src/traveler";
import TripRepo from "./repositories/tripRepo.js";
import Trip from "./trip.js";
import DestinationRepo from "./repositories/destinationRepo.js";
import Destination from "./destination.js";

import './css/styles.css';
import './images/turing-logo.png'

// Global Variables
let travelerRepo;
let tripRepo;
let destinationRepo;
let currentTraveler;
let paidVacations;

//functions

const fetchUserData = () => {
  Promise.all([
    getData("travelers"),
    getData("destinations"),
    getData("trips")
  ]).then((data) => {

    let travelers = data[0].travelers.map((traveler) => {
      return new Traveler(traveler);
    });

    let destinations = data[1].destinations.map((destination) => {
      return new Destination(destination);
    });

    let trips = data[2].trips.map((trip) => {
      let destination = destinations.find(destination => destination.id == trip.destinationID)
      return new Trip(trip, destination);
    });

    travelerRepo = new TravelerRepo(travelers);
    tripRepo = new TripRepo(trips);
    destinationRepo = new DestinationRepo(destinations);
    currentTraveler = travelerRepo.data[36];
    paidVacations = tripRepo.getYearTotal(currentTraveler.id)
  }).catch((error) =>
  console.log(error, "Error is coming back from the server")
  );
}





//eventlisteners

window.addEventListener("load", () => {
  fetchUserData();
})
