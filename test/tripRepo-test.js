import { expect } from "chai";
import TripRepo from "../src/repositories/tripRepo";
import Trip from "../src/trip";
import {trips} from "./mockData/mock.js";

describe("trip", () => {
  let trip1;
  let trip2;
  let tripRepo;

  beforeEach(() => {
    let tripInstances = trips.map(trip => new Trip(trip));
    tripRepo = new TripRepo(tripInstances);
    trip1 = trips[0];
    trip2 = trips[1];
  });

  it("Should filter past trips", () => {
    let pastTrips = [ 
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "destination": undefined,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      }, {
      "id": 4,
      "userID": 43,
      "destinationID": 14,
      "destination": undefined,
      "travelers": 2,
      "date": "2022/02/25",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    }]
    expect(tripRepo.filterPastTrips(tripRepo.data, "2022/06/11")).to.deep.equal(pastTrips)
  });

  it("Should filter future trips", () => {

  });

  it("Should get current trip", () => {

  });

  it("Should filter by id", () => {

  });

  it("Should filter by year", () => {

  });

  it("Should get paid trips", () => {

  });

  it ("Should get Year Total", () => {

  });
});