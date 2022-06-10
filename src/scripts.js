import { getData, postData } from "./apiCalls.js";

import {TravelerRepo} from "./repositories/travelerRepo";

import './css/styles.css';

import './images/turing-logo.png'


//functions

const fetchUserData = () => {
  Promise.all([
    getData("travelers"),
    getData("trips"),
    getData("destinations")
  ]).then((data) => {

  }).catch((error) =>
  console.log(error, "Error is coming back from the server")
  );
}


//eventlisteners

window.addEventListener("load", () => {
  fetchUserData();
})
