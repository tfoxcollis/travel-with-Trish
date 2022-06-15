import { expect } from "chai";

import { 
  tripRepo,
  tripInstances,
  destinationInstances
} from "./mockData/mock.js";

describe("trip", () => {
  let date;

  beforeEach(() => {
    date = "2022/06/11";
  });

  describe("Attributes", () => {
    it("Should have an array of trips", () => {
      expect(tripRepo.data).to.deep.equal(tripInstances);
    })
  });

  describe("Methods", () => { 
    it("Should filter past trips", () => {
      let pastTrips = [ 
        {
          "id": 3,
          "userID": 3,
          "destinationID": 22,
          "destination": destinationInstances[2],
          "travelers": 4,
          "date": "2021/05/22",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        }, {
          "id": 4,
          "userID": 43,
          "destinationID": 14,
          "destination": destinationInstances[3],
          "travelers": 2,
          "date": "2022/02/25",
          "duration": 10,
          "status": "approved",
          "suggestedActivities": []
        }, {
          "id": 5,
          "userID": 42,
          "destinationID": 29,
          "destination": destinationInstances[4],
          "travelers": 3,
          "date": "2022/04/30",
          "duration": 18,
          "status": "approved",
          "suggestedActivities": []
        }];
      expect(tripRepo.filterPastTrips(tripRepo.data, date))
        .to.deep.equal(pastTrips);
    });

    it("Should filter future trips", () => {
      let futureTrips = [
        {
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "destination": destinationInstances[0],
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "pending",
          "suggestedActivities": []
        }, {
          "id": 2,
          "userID": 35,
          "destinationID": 25,
          "destination": destinationInstances[1],
          "travelers": 5,
          "date": "2022/10/04",
          "duration": 18,
          "status": "approved",
          "suggestedActivities": []
        }];
      expect(tripRepo.filterFutureTrips(tripRepo.data, date))
        .to.deep.equal(futureTrips);
    });

    it("Should get current trip", () => {
      let currentTrip = {
        "id": 6,
        "userID": 29,
        "destinationID": 35,
        "destination": destinationInstances[5],
        "travelers": 3,
        "date": "2022/06/10",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []
      };

      expect(tripRepo.findCurrentTrip(tripRepo.data, date))
        .to.deep.equal(currentTrip);
    });

    it("Should filter by id", () => {
      let filteredTrip =   [{
        "id": 6,
        "userID": 29,
        "destinationID": 35,
        "destination": destinationInstances[5],
        "travelers": 3,
        "date": "2022/06/10",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []
      }]
      
      expect(tripRepo.filterById(29)).to.deep.equal(filteredTrip)
    });

    it("Should filter by year", () => {
      let yearFiltered = [
        tripInstances[0],
        tripInstances[1],  
        tripInstances[3],
        tripInstances[4],
        tripInstances[5]
      ];

      expect(tripRepo.filterByYear(tripRepo.data, date))
        .to.deep.equal(yearFiltered);
    });

    it("Should get paid trips", () => {
      let paidTrips = [tripInstances[3]];

      expect(tripRepo.getPaidTrips(43, date)).to.deep.equal(paidTrips);
    });

    it("Should get Year Total", () => {
      expect(tripRepo.getYearTotal(43)).to.deep.equal(2596);
      expect(tripRepo.getYearTotal(42)).to.deep.equal(5214);
    });

    it("Should get pending trips", () => {
      let pendingTrip = [tripInstances[0]];

      expect(tripRepo.filterByStatus(tripRepo.data, "pending"))
        .to.deep.equal(pendingTrip);
    })
  })
});
