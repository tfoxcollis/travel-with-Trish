import Traveler from "../../src/traveler"

const travelers =
  [
    {
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer"
    },
    {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
    },
    {
        "id": 3,
        "name": undefined,
        "travelerType": undefined,
    },
    {
        "id": 4,
        "name": "Leila Thebeaud",
        "travelerType": "photographer"
    },
    {
        "id": 5,
        "name": "Tiffy Grout",
        "travelerType": "thrill-seeker"
    }
  ]

  const trips = [
    {
        "id": 1,
        "userID": 44,
        "destinationID": 49,
        "travelers": 1,
        "date": "2022/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
    },
    {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
    },
    {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
    },
    {
        "id": 4,
        "userID": 43,
        "destinationID": 14,
        "travelers": 2,
        "date": "2022/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
    },
    {
        "id": 6,
        "userID": 29,
        "destinationID": 35,
        "travelers": 3,
        "date": "2022/06/10",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []
    },
  ];

  export {travelers, trips};