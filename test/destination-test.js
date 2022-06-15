import { expect } from "chai";
import Destination from "../src/destination.js"
import {destinationInstances} from "./mockData/mock.js"

describe("Destination", () => {
  let destination1;
 
  beforeEach(() => {
    destination1 = destinationInstances[0];
  });

  it("Should be a function", () => {
    expect(Destination).to.be.a("function");
  });

  it("Should have an id", () => {
    expect(destination1.id).to.equal(49)
  });

  it("Should have a destination", () => {
    expect(destination1.destination).to.equal("Castries, St Lucia")
  });

  it("Should have lodging per day", () => {
    expect(destination1.lodgingPerDay).to.equal(650)
  });

  it("Should have flightcost per person", () => {
    expect(destination1.flightCostPerPerson).to.equal(90)
  });

  it("Should have an image src", () => {
    expect(destination1.image).to.equal("https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80")
  });

  it("Should have alt text for image", () => {
    expect(destination1.alt).to.equal("aerial photography of rocky mountain under cloudy sky")
  });
})