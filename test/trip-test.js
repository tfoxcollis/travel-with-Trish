import { expect } from "chai";
import Trip from "../src/Trip.js"
import {tripInstances} from "./mockData/mock.js"

describe("Trip", () => {
  let trip1;
  let trip2;
 
  beforeEach(() => {
    trip1 = tripInstances[0];
    trip2 = tripInstances[2];
  });

  it("Should be a function", () => {
    expect(Trip).to.be.a("function");
  });
})