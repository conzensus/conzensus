import React, { useState } from "react";

export default TestSocket;

function TestSocket({ socket }) {
  const [roomCode, setRoomCode] = useState("null");
  const [invalidRoomCode, setInvalidRoomCode] = useState("");
  const [activities, setActivities] = useState([]);

  const createRoom = (e) => {
    e.preventDefault();
    socket.emit("createRoom");
  };

  const joinRoom = (e) => {
    e.preventDefault();
    let roomCode = document.getElementById("roomCode").value;
    let joinInfo = { roomCode: roomCode };
    socket.emit("joinRoom", JSON.stringify(joinInfo));
  };

  const addPlayer = (e) => {
    e.preventDefault();
    let newPlayerName = document.getElementById("newPlayerName").value;
    let newPlayerCharacter =
      document.getElementById("newPlayerCharacter").value;
    let playerInfo = { name: newPlayerName, character: newPlayerCharacter };
    socket.emit("addPlayer", JSON.stringify(playerInfo), roomCode);
  };

  const removePlayer = (e) => {
    e.preventDefault();
    socket.emit("removePlayer");
  };

  const setSettings = (e) => {
    e.preventDefault();
    let activityType = document.getElementById("activityType").value;
    let maxDistance = 0 + document.getElementById("maxDistance").value * 1;
    let hostLong = document.getElementById("hostLong").value * 1;
    let hostLat = document.getElementById("hostLat").value * 1;
    let settingsInfo = {
      activityType: activityType,
      maxDistance: maxDistance,
      hostLocation: [hostLat, hostLong],
    };
    socket.emit("setSettings", JSON.stringify(settingsInfo));
  };

  socket.on("roomCreated", (returnedRoomCode, returnedSettings) => {
    setRoomCode(returnedRoomCode);
    console.log("returned Settings: ", returnedSettings);
    setInvalidRoomCode("");
  });

  const startGame = (e) => {
    e.preventDefault();
    socket.emit("startGame");
  };

  const selectCategories = (e) => {
    e.preventDefault();
    socket.emit("selectCategories", ["restaurant"]);
  };

  const secondUserSelectCategories = (e) => {
    e.preventDefault();
    socket.emit("selectCategories", ["cafe"]);
  };

  const castVotes = (e) => {
    e.preventDefault();
    let votes = {
      like: activities.slice(3, 10).map((act) => act.id),
      dislike: activities.slice(0, 3).map((act) => act.id),
      veto: activities.slice(10, 13).map((act) => act.id),
    };
    socket.emit("castVotes", votes, activities);
  };

  const secondUserCastVotes = (e) => {
    e.preventDefault();
    let votes = {
      like: activities.slice(0, 5).map((act) => act.id),
      dislike: activities.slice(4, 7).map((act) => act.id),
      veto: activities.slice(7, 10).map((act) => act.id),
    };
    socket.emit("castVotes", votes, activities);
  };

  socket.on("roomJoinStatus", (success, roomCode) => {
    if (success) {
      setRoomCode(roomCode);
      setInvalidRoomCode("");
    } else {
      setRoomCode("");
      setInvalidRoomCode("roomCode not Valid");
    }
  });

  socket.on("playerAdded", (playerName, playerCharacter, roomCode) => {
    console.log(
      "playerAdded",
      "name:",
      playerName,
      "character:",
      playerCharacter,
      "roomCode:",
      roomCode
    );
  });

  socket.on("playerRemoved", (success) => {
    console.log("playerRemoved", success);
  });

  socket.on("gameStarted", (categories) => {
    console.log("gameStarted");
    console.log(categories);
  });

  socket.on("awaitingLastPlayer", () => {
    console.log("awaitingLastPlayer");
  });

  socket.on("startVoting", (chosenActivities) => {
    console.log("startVoting");
    console.log(chosenActivities);
    setActivities(chosenActivities);
  });

  socket.on("sendResults", (topActivities) => {
    console.log("sendResults");
    console.log(topActivities);
  });

  return (
    <div>
      <button onClick={createRoom} id="button">
        Create Room
      </button>
      <br />
      <br />
      <p>{roomCode}</p>
      <br />
      <br />
      roomCode: <input id="roomCode" />
      <br />
      <button onClick={joinRoom} id="button">
        Join Room
      </button>
      <br />
      <br />
      <p>{invalidRoomCode}</p>
      <br />
      <br />
      newPlayerName: <input id="newPlayerName" />
      <br />
      newPlayerCharacter: <input id="newPlayerCharacter" />
      <br />
      <button onClick={addPlayer} id="button">
        Add Character
      </button>
      <br />
      <br />
      <br />
      <button onClick={removePlayer} id="button">
        Remove Character
      </button>
      <br />
      <br />
      <br />
      activityType: <input id="activityType" />
      <br />
      maxDistance: <input id="maxDistance" />
      <br />
      hostLat: <input id="hostLat" />
      <br />
      <br />
      hostLong: <input id="hostLong" />
      <br />
      <button onClick={setSettings} id="button">
        Edit Settings
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={startGame} id="button">
        startGame
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={selectCategories} id="button">
        player1selectCategories
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <button onClick={secondUserSelectCategories} id="button">
        player2selectCategories
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={castVotes} id="button">
        player1castVotes
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={secondUserCastVotes} id="button">
        player2castVotes
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
