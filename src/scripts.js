import { getData, postData } from "./apiCalls.js";

import TravelerRepo from "./repositories/travelerRepo";
import Traveler from "../src/traveler";

import './css/styles.css';

import './images/turing-logo.png'

// Global Variables
let travelerRepo;
let currentTraveler;

//functions

const fetchUserData = () => {
  Promise.all([
    getData("travelers"),
    getData("trips"),
    getData("destinations")
  ]).then((data) => {

    let travelers = data[0].travelers.map(function (traveler) {
      return new Traveler(traveler);
    });
    debugger
    travelerRepo = new TravelerRepo(travelers);
    
    currentTraveler = travelerRepo.data[49];
  }).catch((error) =>
  console.log(error, "Error is coming back from the server")
  );
}


//eventlisteners

window.addEventListener("load", () => {
  fetchUserData();
})
