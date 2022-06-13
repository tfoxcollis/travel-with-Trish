import { getData, postData } from "./apiCalls.js";

import TravelerRepo from "./repositories/travelerRepo";
import Traveler from "../src/traveler";
import TripRepo from "./repositories/tripRepo.js";
import Trip from "./trip.js";
import DestinationRepo from "./repositories/destinationRepo.js";
import Destination from "./destination.js";
import { getTodaysDate, calculateTripCost } from "./utils.js";

import './css/styles.css';
import './images/turing-logo.png'

//queryselectors
let userForm = document.querySelector("#userForm");
let searchButton = document.querySelector("#searchButton");
let currentButton = document.querySelector("#currentButton");
let upcomingButton = document.querySelector("#upcomingButton");
let pastButton = document.querySelector("#pastButton");
let pendingButton = document.querySelector("#pendingButton");
let tripBox = document.querySelector("#tripBox");

// Global Variables
let travelerRepo;
let tripRepo;
let destinationRepo;
let currentTraveler;
let paidVacations;
let todaysDate = getTodaysDate();

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


const getCurrentTrip = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id);
  return tripRepo.getCurrentTrip(tripByID, todaysDate);

}

const displayCurrentTrip = (currentTrip) => {
  tripBox.innerHTML = `
  <section class="trip-container">
   <h4> Date of Trip: ${currentTrip.date}<br>
    Duration: ${currentTrip.duration}<br>
    Destination: ${currentTrip.destination.destination}<br>
    Travelers: ${currentTrip.travelers} <br>
    Status: ${currentTrip.status}<br>
    Total Cost: $${calculateTripCost(currentTrip)}
    </h4>
  </section>
  `
}

const toggleDisplay = (event) => {
  if(event.target.id == "searchButton"){
    userForm.classList.remove("hidden");
    tripBox.classList.add("hidden");
  }else{
    userForm.classList.add("hidden");
    tripBox.classList.remove("hidden");
  }
}

//eventlisteners

window.addEventListener("load", () => {
  fetchUserData();
})

currentButton.addEventListener("click", (event) => {
  toggleDisplay(event)
  displayCurrentTrip(getCurrentTrip());
})
