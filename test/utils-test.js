import { expect } from "chai";
import {tripInstances} from "./mockData/mock.js"
import {calculateTripCost} from "../src/utils.js"

describe("Utils", () => {
  let trip1;
 
  beforeEach(() => {
    trip1 = tripInstances[0];
  });

  it("Should return cost of trip", () => {
    expect(calculateTripCost(trip1)).to.equal(5819);
  });
})