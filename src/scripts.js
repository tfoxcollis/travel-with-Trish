import { getData, postData } from "./apiCalls.js";

import TravelerRepo from "./repositories/travelerRepo";
import Traveler from "../src/traveler";
import TripRepo from "./repositories/tripRepo.js";
import Trip from "./trip.js";
import DestinationRepo from "./repositories/destinationRepo.js";
import Destination from "./destination.js";
import { getTodaysDate, calculateTripCost } from "./utils.js";

import './css/styles.css';

//queryselectors
let searchPage = document.querySelector("#searchPage");
let userForm = document.querySelector("#userForm");
let selectedTrip = document.querySelector("#selectedTrip");
let searchButton = document.querySelector("#searchButton");
let currentButton = document.querySelector("#currentButton");
let upcomingButton = document.querySelector("#upcomingButton");
let pastButton = document.querySelector("#pastButton");
let pendingButton = document.querySelector("#pendingButton");
let tripContainer = document.querySelector("#tripContainer");
let welcome = document.querySelector("#welcome");
let destinationsSelect = document.querySelector("#destinationID");
let tripSubmit = document.querySelector("#tripSubmit");

// Global Variables
let travelerRepo;
let tripRepo;
let destinationRepo;
let currentTraveler;
let paidVacations;
let potentialTrip;
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
    setDisplays();
  }).catch((error) =>
  console.log(error, "Error is coming back from the server")
  );
};

const populateDestinationsSelect = () => {
  destinationRepo.data.forEach((destination) => {
    destinationsSelect.innerHTML += `
    <option value="${destination.id}">${destination.destination}</option>`

  })
};

const addRestrictionsToDateInput = () => {
  let date = userForm.querySelector("#date");
  date.setAttribute("min", todaysDate.split("/").join("-"));
};

const setDisplays = () => {
  welcome.innerHTML = `
  <h1 class="welcome-user">Welcome, ${currentTraveler.returnFirstName()}!</h1>
  <h2 class="welcome-total">You've spent: $${tripRepo.getYearTotal(currentTraveler.id)} this year.</h2>
  `
  addRestrictionsToDateInput();
  populateDestinationsSelect();
}
const getCurrentTrip = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id, "approved");
  return tripRepo.findCurrentTrip(tripByID, todaysDate);

}

const displayCurrentTrip = (currentTrip) => {
  tripContainer.innerHTML = ``
  tripContainer.classList.add("center")
  if(currentTrip){
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
  }else{
    tripContainer.innerHTML = `
    <h2> Uh oh! You do not have a current trip!</h2> `
  }
};

const getFutureTrips = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id, "approved");
  return tripRepo.filterFutureTrips(tripByID, todaysDate);
}

const displayUpcomingTrips = (upcomingTrips) => {
  tripContainer.innerHTML = ``;
  if(upcomingTrips.length == 0){
    tripContainer.innerHTML = `
     <h2>You do not currently have any approved upcoming trips.<br>
    Check to see if any trip is pending.</h2>
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
  let tripByID = tripRepo.filterById(currentTraveler.id, "approved");
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
  return tripRepo.filterByStatus(tripByID, "pending");
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
};

const toggleDisplay = (event) => {
  if(event.target.id == "searchButton"){
    searchPage.classList.remove("hidden");
    tripContainer.classList.add("hidden");
  }else{
    searchPage.classList.add("hidden");
    tripContainer.classList.remove("hidden");
  }
};

const getFormData = (event) => {
  let form = event.target.closest("form");
  let inputs = Array.from(form.querySelectorAll("input"));
  inputs = inputs.filter(input => input.type != "submit");
  inputs.push(form.querySelector("select"))
  return inputs.map((input) => {
    return {name: input.name, value: input.value}
  });
};

const createNewTrip = (formData, destination) => {
  let id = tripRepo.data.length + 1
  let trip = {
    id: id,
    userID: currentTraveler.id,
    destinationID: destination.id,
    travelers: parseInt(formData[2].value),
    date: formData[0].value.split("-").join("/"),
    duration: parseInt(formData[1].value),
    status: "pending",
    suggestedActivities: []
  }
  return new Trip(trip, destination)
}

const postPotentialTrip = () => {
  Promise.all([
    postData("trips", potentialTrip)
  ])
    .then((data) => {
      fetchUserData();
    })
    .catch((error) =>
      console.log(error, "Error is coming back from the server")
    )
};

const resetSearchPage = () => {
  let inputs = Array.from(userForm.querySelectorAll("input"));
  inputs.forEach((input) => {
    if(input.id == "tripSubmit") {
      return;
    } else if (input.type == "number") {
      input.value = '0';
    } else {
      input.value = '';
    }
  })

  selectedTrip.innerHTML = ''
}

const displaySelectedTripToBook = (formData, destination) => {
  potentialTrip = createNewTrip(formData, destination);
  selectedTrip.innerHTML = `
    <img class="image-preview" src="${destination.image} alt="${destination.alt}">
    <article>
      <h3>Estimated Cost: $${calculateTripCost(potentialTrip)}</h3>
      <button class="book-now" id="bookNow">Book</button>
    </article>
  `
  selectedTrip.querySelector("#bookNow").addEventListener("click", (event) => {
    event.preventDefault();
    postPotentialTrip();
    resetSearchPage();
  })

};

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

tripSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let formData = getFormData(event);
  let destination = destinationRepo.data.find((destination) => {
    return destination.id == formData[3].value
  })
  displaySelectedTripToBook(formData, destination);
})