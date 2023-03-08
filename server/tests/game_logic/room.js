const Room = require("../../game_logic/room");

const Player = require("../../game_logic/player");
const OverpassDataProvider = require("../../data_providers/overpass");
const FakeTestDataProvider = require("./fake_test_data_provider");

const THE_AVE_COORDS = [47.66009172738974, -122.31304749174053];

const overpass = new OverpassDataProvider();
const fake_test_data_provider = new FakeTestDataProvider();


function roomFirstAddedPlayerBecomesHost() {
  let room = new Room("TEST", [overpass]);
  let host = new Player("Alice", "https://picsum.photos/200");
  room.addPlayer(host);

  if (room.host !== host) {
    console.error(  "Failed test roomFirstAddedPlayerBecomesHost():" + 
                    "The first player added to a room is not made host!"  );
  } else {
    console.log("Passed test roomFirstAddedPlayerBecomesHost()")
  }
}

function roomSecondPlayerIsNotMadeHost() {
  let room = new Room("TEST", [overpass]);
  let host = new Player("Alice", "https://picsum.photos/200");
  let notHost = new Player("Bob", "https://picsum.photos/200");
  room.addPlayer(host);
  room.addPlayer(notHost);

  if (room.host !== host) {
    console.error(  "Failed test roomSecondPlayerIsNotMadeHost(): " + 
                    "Adding a second player changes the host!"  );
  } else {
    console.log("Passed test roomSecondPlayerIsNotMadeHost()")
  }
}

function roomNextPlayerIsPromotedOnHostLeave() {
  let room = new Room("TEST", [overpass]);
  let firstHost = new Player("Alice", "https://picsum.photos/200");
  let secondHost = new Player("Bob", "https://picsum.photos/200");
  room.addPlayer(firstHost);
  room.addPlayer(secondHost);
  room.removePlayer(firstHost);

  if (room.host !== secondHost) {
    console.error(  "Failed test roomNextPlayerIsPromotedOnHostLeave(): " + 
                    "The second player is not promoted to host when the first leaves!"  );
  } else {
    console.log("Passed test roomNextPlayerIsPromotedOnHostLeave()")
  }
}

async function roomStartGameReturnsBroadCategories() {
  let room = new Room("TEST", [overpass]);
  let host = new Player("Alice", "https://picsum.photos/200");
  room.addPlayer(host);
  room.editSettings(
    "indoor",
    1000,
    THE_AVE_COORDS
    );

  let broadCategories = await room.startGame();

  if (broadCategories.length <= 0) {
    console.error(  "Failed test roomStartGameReturnsBroadCategories(): " + 
                    "No broad categories could be found!"  );
  } else {
    console.log("Passed test roomStartGameReturnsBroadCategories()")
  }
}

async function roomPlaysEntireRoundSuccessfully() {
  let room = new Room("TEST", [fake_test_data_provider]);
  let host = new Player("Alice", "https://picsum.photos/200");
  room.addPlayer(host);
  let broadCategories = await room.startGame();

  for (const testCategory of ["test-category-1", "test-category-2", "test-category-3"]) {
    if (!broadCategories.includes(testCategory)) {
      console.error(  "Failed test roomPlaysEntireRoundSuccessfully(): " + 
                      "Room.startGame() doesn't return all broad categories!"  );
      return;
    }
  }

  let filteredActivities = room.filterActivities(["test-category-3"]);

  if (filteredActivities) {
    if (filteredActivities.length !== 3) {
      console.error(  "Failed test roomPlaysEntireRoundSuccessfully(): " + 
                      "Room.filteredActivities() doesn't filter activities correctly!"  );
      return;
    }
  }

  let candidateActivities = room.chooseCandidateActivities(filteredActivities);

  let votes = [
    {"like": ["test-3.2"], "dislike": ["test-3.1"], "veto": ["test-3.3"]}
  ];
  let topActivities = room.getTopActivities(votes, candidateActivities);
  
  if (topActivities.length === 3) {
    console.error(  "Failed test roomPlaysEntireRoundSuccessfully(): " + 
                    "Room.getTopActivities() returns vetoed activities!"  );
  } else if (topActivities[0].id == "test-3.1") {
    console.error(  "Failed test roomPlaysEntireRoundSuccessfully(): " + 
                    "Room.getTopActivities() returns activities in wrong order!"  );
  } else {
    console.log("Passed test roomPlaysEntireRoundSuccessfully()");
  }
}

// run tests
roomFirstAddedPlayerBecomesHost();
roomSecondPlayerIsNotMadeHost();
roomNextPlayerIsPromotedOnHostLeave();
roomStartGameReturnsBroadCategories();
roomPlaysEntireRoundSuccessfully();