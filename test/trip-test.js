import { expect } from "chai";
import Trip from "../src/Trip.js"
import {tripInstances, destinationInstances} from "./mockData/mock.js"

describe("Trip", () => {
  let trip1;
  let trip2;
  let destination1;
  let currentDate;
 
  beforeEach(() => {
    currentDate = "2022/06/11";
    trip1 = tripInstances[0];
    trip2 = tripInstances[2];
    destination1 = destinationInstances[0];
  });

  it("Should be a function", () => {
    expect(Trip).to.be.a("function");
  });

  describe("Attributes", () => {
    it("Should have an id", () => {
      expect(trip1.id).to.equal(1);
    });

    it("Should have a userID", () => {
      expect(trip1.userID).to.equal(44);
    });

    it("Should have a destinationID", () => {
      expect(trip1.destinationID).to.equal(49);
    });

    it("Should have a destination", () => {
      expect(trip1.destination).to.equal(destination1);
    });

    it("Should have travelers", () => {
      expect(trip1.travelers).to.equal(1);
    });

    it("Should have a date", () => {
      expect(trip1.date).to.equal("2022/09/16");
    });

    it("Should have a duration", () => {
      expect(trip1.duration).to.equal(8);
    });

    it("Should have a status", () => {
      expect(trip1.status).to.equal("pending");
    });

    it("Should have suggested activities", () => {
      expect(trip1.suggestedActivities).to.deep.equal([]);
    });

  });

  describe("Methods", () => {
    it("Should get total flight cost for all travelers", () => {
      expect(trip2.getTicketPrices()).to.equal(2600);
    });

    it("Should get lodging price for the duration of the trip", () => {
      expect(trip1.getLodgingPrice()).to.equal(5200);
    });

    it("Should return a new Date instance for the date", () => {
      expect(trip1.startDate()).to.be.instanceof(Date);
    });

    it("Should return a new Date instance that is x number of days later than startdate", () => {
      expect(trip1.endDate()).to.be.instanceof(Date);
      let endDate = new Date(trip1.date);
      endDate.setDate(trip1.startDate().getDate() + trip1.duration);
      expect(trip1.endDate()).to.deep.equal(endDate);
    });

    it("Should know if it is a past trip", () => {
      expect(trip1.pastTrip(currentDate)).to.equal(false);
    });

    it("Should know if it is a current trip", () => {
      expect(trip1.currentTrip(currentDate)).to.equal(false);
    });

    it("Should know if it is a future trip", () => {
      expect(trip1.futureTrip(currentDate)).to.equal(true);
    });
  });
});