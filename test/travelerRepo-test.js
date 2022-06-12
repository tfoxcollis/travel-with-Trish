import { expect } from "chai";
import TravelerRepo from "../src/repositories/travelerRepo";
import { travelerInstances } from "./mockData/mock.js";

describe("Traveler Repo", () => {
  let travelerRepo;
 
  beforeEach(() => {
    travelerRepo = new TravelerRepo(travelerInstances)
  });

  it("Should find traveler by ID", () => {
    let findTraveler = travelerInstances[0]
    expect(travelerRepo.findById(1)).to.deep.equal(findTraveler)
  })
});
