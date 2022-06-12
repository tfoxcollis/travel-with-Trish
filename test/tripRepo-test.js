import { expect } from "chai";
import TripRepo from "../src/repositories/tripRepo";
import Trip from "../src/trip";
import {trips} from "./mockData/mock.js";

describe("trip", () => {
  let trip1;
  let tripRepo;
  let date;

  beforeEach(() => {
    date = "2022/06/11";
    let tripInstances = trips.map(trip => new Trip(trip));
    tripRepo = new TripRepo(tripInstances);
    trip1 = trips[0];
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
    expect(tripRepo.filterPastTrips(tripRepo.data, date)).to.deep.equal(pastTrips)
  });

  it("Should filter future trips", () => {
    let futureTrips = [
      {
        "id": 1,
        "userID": 44,
        "destinationID": 49,
        "destination": undefined,
        "travelers": 1,
        "date": "2022/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "destination": undefined,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      }
    ]
    expect(tripRepo.filterFutureTrips(tripRepo.data, date)).to.deep.equal(futureTrips);
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