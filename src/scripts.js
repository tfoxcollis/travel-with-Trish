// Import required classes
import { getData, postData } from "./apiCalls.js";
import TravelerRepo from "./repositories/travelerRepo";
import Traveler from "../src/traveler";
import TripRepo from "./repositories/tripRepo.js";
import Trip from "./trip.js";
import Destination from "./destination.js";
import { getTodaysDate, calculateTripCost } from "./utils.js";

// import and initialize MicroModal
import MicroModal from 'micromodal';
MicroModal.init({
  openTrigger: 'data-custom-open',
  disableScroll: true,
  awaitCloseAnimation: false
});

// Import css
import './css/styles.css';
import './css/modal.css';

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
let travelers;
let destinations;
let trips;
let travelerRepo;
let tripRepo;
let currentTraveler;
let potentialTrip;
let todaysDate = getTodaysDate();

//functions

// Fetch all data
const fetchUserData = () => {
  Promise.all([
    getData("travelers"),
    getData("destinations"),
    getData("trips")
  ]).then((data) => {
    createDataArrays(data);
    travelerRepo = new TravelerRepo(travelers);
    if (checkIfSignedIn()) {
      tripRepo = new TripRepo(trips);
      setWelcomeDisplay();
    }
  }).catch((error) =>
    console.log(error)
  );
};

// Create array from resolved Promise
const createDataArrays = (data) => {
  travelers = data[0].travelers.map((traveler) => {
    return new Traveler(traveler);
  });
  destinations = data[1].destinations.map((destination) => {
    return new Destination(destination);
  });
  trips = data[2].trips.map((trip) => {
    let destination = destinations.find((destination) => {
      return destination.id === parseInt(trip.destinationID);
    })
    return new Trip(trip, destination);
  });
}

const setWelcomeDisplay = () => {
  welcome.innerHTML = `
  <h1 class="welcome-user">Welcome, ${currentTraveler.returnFirstName()}!</h1>
  <div class="welcome-right">
  <button class="signout-button" type="submit" id="signOut">Sign Out</button>
  <h2 class="welcome-total">You've spent: $${tripRepo.getYearTotal(currentTraveler.id)} this year.</h2>
  </div>
  `
  addRestrictionsToDateInput();
  addOptionsToDestinationsDropdown();
  watchForSignout();
}

const addRestrictionsToDateInput = () => {
  let date = userForm.querySelector("#date");
  date.setAttribute("min", todaysDate.split("/").join("-"));
};

const addOptionsToDestinationsDropdown = () => {
  destinations.forEach((destination) => {
    destinationsSelect.innerHTML += `
    <option value="${destination.id}">${destination.destination}</option>`
  })
};

const watchForSignout = () => {
  let signoutButton = document.querySelector("#signOut");
  signoutButton.addEventListener("click", () => {
    window.location.href = "https://travel-with-trish.vercel.app/signin.html";
  });
}


// Functions for the Trip Modals
const setTripModal = (trip) => {
  return `
  <div class="micromodal-slide modal" id="modal-${trip.id}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-custom-close="">
      <div class="modal__container w-40-ns w-90" role="dialog" aria-modal="true" aria-labelledby="modal-${trip.id}-title">
        <header class="modal__header">
          <button class="modal__close" id="modalClose-${trip.id}" aria-label="Close modal" data-custom-close=""></button>
        </header>
        <h4> Date of Trip: ${trip.date}<br>
          Duration: ${trip.duration} days<br>
          Destination: ${trip.destination.destination}<br>
          Travelers: ${trip.travelers} <br>
          Status: ${trip.status}<br>
          Total Cost: $${calculateTripCost(trip)}
        </h4>
      </div>
    </div>
  </div>
  `
}

const setModalToggle = (trips) => {
  trips.forEach((trip) => {
    ["keypress", "click"].forEach((e) => {
      document.querySelector(`#viewTrip-${trip.id}`).addEventListener(e, () => {
        MicroModal.show(`modal-${trip.id}`, {
          debugMode: true,
          disableScroll: true
        })
      })
      
      document.querySelector(`#modalClose-${trip.id}`)
        .addEventListener(e, (event) => {
          event.preventDefault()
          MicroModal.close(`modal-${trip.id}`)
        })
    })
  })
}

// functions for finding/displaying trips
const setTrip = (trip) => {
  return `
    <section class="trip-box" data-custom-open=>
    
    ${setTripModal(trip)}
    <img src="${trip.destination.image}" tabindex="0" class="trip-image" data-micromodal-trigger="modal-${trip.id}" id="viewTrip-${trip.id}">
    </section>
  `
}

const getCurrentTrip = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id, "approved");
  return tripRepo.findCurrentTrip(tripByID, todaysDate);
}

const displayCurrentTrip = (currentTrip) => {
  tripContainer.innerHTML = ``
  if (currentTrip) {
    tripContainer.innerHTML = setTrip(currentTrip);
    setModalToggle([currentTrip]);
  } else {
    tripContainer.innerHTML =
      `<h2> Uh oh! You do not have a current trip!</h2> `
  }
};

const getFutureTrips = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id, "approved");
  return tripRepo.filterFutureTrips(tripByID, todaysDate);
}

const displayUpcomingTrips = (upcomingTrips) => {
  tripContainer.innerHTML = ``;
  if (upcomingTrips.length === 0) {
    tripContainer.innerHTML = `
     <h2>You do not currently have any approved upcoming trips.<br>
     Check to see if any trip is pending.</h2>`
    return
  }
  upcomingTrips.forEach((trip) => {
    tripContainer.innerHTML += setTrip(trip);
  });
  return setModalToggle(upcomingTrips);
}

const getPastTrips = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id, "approved");
  return tripRepo.filterPastTrips(tripByID, todaysDate);
}

const displayPastTrips = () => {
  let pastTrips = getPastTrips();
  tripContainer.innerHTML = ``;
  if (pastTrips.length === 0) {
    tripContainer.innerHTML = `<h2>You do not currently have past trips.</h2>`
    return
  }
  pastTrips.forEach((trip) => {
    tripContainer.innerHTML += setTrip(trip);
  });
  return setModalToggle(pastTrips);
}

const getPendingTrips = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id);
  return tripRepo.filterByStatus(tripByID, "pending");
}

const displayPendingTrips = () => {
  let pendingTrips = getPendingTrips();
  tripContainer.innerHTML = ``;
  if (pendingTrips.length === 0) {
    tripContainer.innerHTML =
      `<h2>You do not currently have pending trips.</h2>`
    return
  }

  pendingTrips.forEach((trip) => {
    tripContainer.innerHTML += setTrip(trip)
  });
  return setModalToggle(pendingTrips);
};

const toggleDisplay = (event) => {
  if (event.target.id === "searchButton") {
    searchPage.classList.remove("hidden");
    tripContainer.classList.add("hidden");
  } else {
    searchPage.classList.add("hidden");
    tripContainer.classList.remove("hidden");
  }
};

// functions for searching/booking trip
const getFormData = (event) => {
  let form = event.target.closest("form");
  let inputs = Array.from(form.querySelectorAll("input"));
  inputs = inputs.filter(input => input.type !== "submit");
  inputs.push(form.querySelector("select"))
  return inputs.map((input) => {
    return {name: input.name, value: input.value}
  });
};

const checkforMissingOrInvalidValues = (formData) => {
  let missingValues = formData.filter(data => !data.value)
  let invalidValues;
  invalidValues = formData.filter((data) => {
    if (data.name === 'date') {
      if (data.value.split('-').join('/') <= todaysDate) {
        return true
      }
    } else {
      if (parseInt(data.value) < 0) {
        return true
      }
    }
  })
  if (missingValues.length > 0 || invalidValues.length > 0) {
    return true
  }
}

const createNewTrip = (formData, destination) => {
  let trip = {
    id: tripRepo.data.length + 1,
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
    .then(() => {
      fetchUserData();
    })
    .catch((error) =>
      console.log(error, "Error is coming back from the server")
    )
};

const resetSearchPage = () => {
  let inputs = Array.from(userForm.querySelectorAll("input"));
  inputs.forEach((input) => {
    if (input.id === "tripSubmit") {
      return;
    } else if (input.type === "number") {
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
      <h3>
      Lodging: $${destination.lodgingPerDay} per person/night<br>
      Flight: $${destination.flightCostPerPerson} per person<br><br>
      Estimated Total Cost: $${calculateTripCost(potentialTrip)}*</h3><br>
      <button class="book-now" id="bookNow">Book</button>
      <p>*This includes a 10% agent booking fee</p>
    </article>
  `
  selectedTrip.querySelector("#bookNow").addEventListener("click", (event) => {
    event.preventDefault();
    postPotentialTrip();
    resetSearchPage();
  })

};

const checkIfSignedIn = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let userName = urlParams.get('username')
  let userID
  if (userName) {
    userID = userName.split('').splice(8, 5).join('');
  }
  if (userID) {
    let traveler = travelerRepo.data.find((traveler) => {
      return traveler.id === parseInt(userID)
    })
    if (traveler) {
      currentTraveler = traveler
    }
    return true
  }
  if (!currentTraveler) {
    window.location.replace("https://travel-with-trish.vercel.app/signin.html")
    return false
  }
}

//eventlisteners
window.addEventListener("load", () => {
  fetchUserData();
})

searchButton.addEventListener("click", (event) => {
  toggleDisplay(event)
});

currentButton.addEventListener("click", (event) => {
  toggleDisplay(event)
  displayCurrentTrip(getCurrentTrip());
});

upcomingButton.addEventListener("click", (event) => {
  toggleDisplay(event)
  displayUpcomingTrips(getFutureTrips());
});

pastButton.addEventListener("click", (event) => {
  toggleDisplay(event);
  displayPastTrips();
});

pendingButton.addEventListener("click", (event) => {
  toggleDisplay(event);
  displayPendingTrips();
})

tripSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let formData = getFormData(event);
  if (checkforMissingOrInvalidValues(formData)) {
    alert("Please check field values, and try again.")
    return;
  }
  let destination = destinations.find((destination) => {
    return destination.id === parseInt(formData[3].value);
  })
  displaySelectedTripToBook(formData, destination);
})