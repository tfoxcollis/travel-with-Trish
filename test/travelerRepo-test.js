import { expect } from "chai";
import TravelerRepo from "../src/repositories/travelerRepo";
import Traveler from "../src/traveler";
import travelers from "./mockData/mock.js"

describe("Traveler", () => {
  let travelerRepo;
 
  beforeEach(() => {
    travelers = travelers.map((traveler) => {
      return new Traveler(traveler)
    })

    // travelerRepo = 
  });
});
