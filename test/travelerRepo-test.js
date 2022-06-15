import { expect } from "chai";
import TravelerRepo from "../src/repositories/travelerRepo";
import { travelerInstances } from "./mockData/mock.js";

describe("Traveler Repo", () => {
  let travelerRepo;
 
  beforeEach(() => {
    travelerRepo = new TravelerRepo(travelerInstances)
  });

  describe("Attributes", () => {
    it("Should have an array of Travelers", () => {
      expect(travelerRepo.data).to.deep.equal(travelerInstances);
    })
  })

  describe("Methods", () => {
    it("Should find traveler by ID", () => {
      let findTraveler = travelerInstances[0];
      expect(travelerRepo.findById(1)).to.deep.equal(findTraveler);
    });

    it("Should return error if no id is passed in", () => {
      let errorMessage = "Oops it looks like no id was passed in";
      expect(travelerRepo.findById()).to.equal(errorMessage);
    });

    it("Should return error is traveler is not found", () => {
      let errorMessage = "Traveler not found";
      expect(travelerRepo.findById(5000)).to.equal(errorMessage);
    });
  });
});
