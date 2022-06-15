import { expect } from "chai";
import Traveler from "../src/traveler.js"
import {travelers} from "./mockData/mock.js"

describe("Traveler", () => {
  let traveler1;
  let traveler3;
 
  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    traveler3 = new Traveler(travelers[2]);
  });

  describe("Attributes", () => {
    it("Should be a function", () => {
      expect(Traveler).to.be.a("function");
    });
  
    it("Should be an instance of Traveler", () => {
      expect(traveler1).to.be.an.instanceOf(Traveler);
    });
  
    it("Should return traveler's name", () => {
      expect(traveler1.name).to.equal("Ham Leadbeater");
    });
  
    it("Should return traveler ID", () => {
      expect(traveler1.id).to.equal(1);
    });
  
    it("Should return traveler type", () => {
      expect(traveler1.type).to.equal("relaxer");
    });
  });

  describe("Methods", () => {
    it("Should have a method that returns the travelers first name", () => {
      expect(traveler1.returnFirstName()).to.equal("Ham");
    });
  
    it("Method should return a message if traveler name is missing", () => {
      expect(traveler3.returnFirstName()).to.equal(
        "Oops it looks like your name is missing from our data base"
      );
    });
  });
});