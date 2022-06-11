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

//functions

const fetchUserData = () => {
  Promise.all([
    getData("travelers"),
    getData("trips"),
    getData("destinations")
  ]).then((data) => {

    let travelers = data[0].travelers.map((traveler) => {
      return new Traveler(traveler);
    });

    let trips = data[1].trips.map((trip) => {
      return new Trip(trip);
    });

    let destinations = data[2].destinations.map((destination) => {
      return new Destination(destination);
    });
    travelerRepo = new TravelerRepo(travelers);
    tripRepo = new TripRepo(trips);
    destinationRepo = new DestinationRepo(destinations);

    currentTraveler = travelerRepo.data[49];


  }).catch((error) =>
  console.log(error, "Error is coming back from the server")
  );
}





//eventlisteners

window.addEventListener("load", () => {
  fetchUserData();
})
