import { expect } from "chai";
import Destination from "../src/destination.js"
import {destinationInstances} from "./mockData/mock.js"

describe("Destination", () => {
  let destination1;
  let destination2;
 
  beforeEach(() => {
    destination1 = destinationInstances[0];
    destination2 = destinationInstances[2];
  });

  it("Should be a function", () => {
    expect(Destination).to.be.a("function");
  });
})