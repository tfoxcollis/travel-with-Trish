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
let tripContainer = document.querySelector("#tripContainer");

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
    currentTraveler = travelerRepo.data[37];
    paidVacations = tripRepo.getYearTotal(currentTraveler.id)
  }).catch((error) =>
  console.log(error, "Error is coming back from the server")
  );
}

const getCurrentTrip = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id);
  return tripRepo.findCurrentTrip(tripByID, todaysDate);

}

const displayCurrentTrip = (currentTrip) => {
  tripContainer.innerHTML = ``
  tripContainer.classList.add("center")
  tripContainer.innerHTML = `
  <section class="trip-box">
  <h4> Date of Trip: ${currentTrip.date}<br>
  Duration: ${currentTrip.duration} days<br>
  Destination: ${currentTrip.destination.destination}<br>
  Travelers: ${currentTrip.travelers} <br>
  Status: ${currentTrip.status}<br>
  Total Cost: $${calculateTripCost(currentTrip)}
  </h4>
  </section>
  `
};

const getFutureTrips = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id);
  return tripRepo.filterFutureTrips(tripByID, todaysDate);
}

const displayUpcomingTrips = (upcomingTrips) => {
  tripContainer.innerHTML = ``;
  if(upcomingTrips.length == 0){
    tripContainer.innerHTML = `
     <h2>You do not currently have upcoming trips.</h2>
    `
    tripContainer.classList.add("center")
    return
  }
  tripContainer.classList.remove("center")

  upcomingTrips.forEach((trip) => {
    tripContainer.innerHTML += `
    <section class="trip-box">
      <h4> Date of Trip: ${trip.date}<br>
      Duration: ${trip.duration} days<br>
      Destination: ${trip.destination.destination}<br>
      Travelers: ${trip.travelers} <br>
      Status: ${trip.status}<br>
      Total Cost: $${calculateTripCost(trip)}
      </h4>
    </section>
    `
  });
}

const getPastTrips = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id);
  return tripRepo.filterPastTrips(tripByID, todaysDate);
}

const displayPastTrips = (pastTrips) => {
  tripContainer.innerHTML = ``;
  if(pastTrips.length == 0){
    tripContainer.innerHTML = `
     <h2>You do not currently have past trips.</h2>
    `
    tripContainer.classList.add("center")
    return
  }
  tripContainer.classList.remove("center")

  pastTrips.forEach((trip) => {
    tripContainer.innerHTML += `
    <section class="trip-box">
      <h4> Date of Trip: ${trip.date}<br>
      Duration: ${trip.duration} days<br>
      Destination: ${trip.destination.destination}<br>
      Travelers: ${trip.travelers} <br>
      Status: ${trip.status}<br>
      Total Cost: $${calculateTripCost(trip)}
      </h4>
    </section>
    `
  });
}

const getPendingTrips = (pendingTrips) => {
  let tripByID = tripRepo.filterById(currentTraveler.id);
  return tripRepo.filterPendingTrips(tripByID, todaysDate);
}

const displayPendingTrips = (pendingTrips) => {
  tripContainer.innerHTML = ``;
  if(pendingTrips.length == 0){
    tripContainer.innerHTML = `
     <h2>You do not currently have pending trips.</h2>
    `
    tripContainer.classList.add("center")
    return
  }
  tripContainer.classList.remove("center")

  pendingTrips.forEach((trip) => {
    tripContainer.innerHTML += `
    <section class="trip-box">
      <h4> Date of Trip: ${trip.date}<br>
      Duration: ${trip.duration} days<br>
      Destination: ${trip.destination.destination}<br>
      Travelers: ${trip.travelers} <br>
      Status: ${trip.status}<br>
      Total Cost: $${calculateTripCost(trip)}
      </h4>
    </section>
    `
  });
}

const toggleDisplay = (event) => {
  if(event.target.id == "searchButton"){
    userForm.classList.remove("hidden");
    tripContainer.classList.add("hidden");
  }else{
    userForm.classList.add("hidden");
    tripContainer.classList.remove("hidden");
  }
}

//eventlisteners

window.addEventListener("load", () => {
  fetchUserData();
})

currentButton.addEventListener("click", (event) => {
  toggleDisplay(event)
  displayCurrentTrip(getCurrentTrip());
});

searchButton.addEventListener("click", (event) => {
  toggleDisplay(event)
});

upcomingButton.addEventListener("click", (event) => {
  toggleDisplay(event)
  displayUpcomingTrips(getFutureTrips());
});

pastButton.addEventListener("click", (event) => {
  toggleDisplay(event);
  displayPastTrips(getPastTrips());
});

pendingButton.addEventListener("click", (event) => {
  toggleDisplay(event);
  displayPendingTrips(getPendingTrips());
})