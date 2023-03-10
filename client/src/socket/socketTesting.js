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
    socket.emit("joinRoom", joinInfo);
  };

  const addPlayer = (e) => {
    e.preventDefault();
    let newPlayerName = document.getElementById("newPlayerName").value;
    let newPlayerCharacter =
      document.getElementById("newPlayerCharacter").value;
    let addPlayerInfo = {
      roomCode: roomCode,
      playerName: newPlayerName,
      character: newPlayerCharacter,
    };
    socket.emit("addPlayer", addPlayerInfo);
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
    socket.emit("setSettings", settingsInfo);
  };

  const startGame = (e) => {
    e.preventDefault();
    socket.emit("startGame");
  };

  const selectCategories = (e) => {
    e.preventDefault();
    let selectedCategories = { categories: ["restaurant"] };
    socket.emit("selectCategories", selectedCategories);
  };

  const secondUserSelectCategories = (e) => {
    e.preventDefault();
    let selectedCategories = { categories: ["cafe"] };
    socket.emit("selectCategories", selectedCategories);
  };

  const castVotes = (e) => {
    e.preventDefault();
    let votes = {
      like: activities.slice(3, 10).map((act) => act.id),
      dislike: activities.slice(0, 3).map((act) => act.id),
      veto: activities.slice(10, 13).map((act) => act.id),
    };
    let votingRequest = { votes: votes, activities: activities };
    socket.emit("castVotes", votingRequest);
  };

  const secondUserCastVotes = (e) => {
    e.preventDefault();
    let votes = {
      like: activities.slice(0, 5).map((act) => act.id),
      dislike: activities.slice(4, 7).map((act) => act.id),
      veto: activities.slice(7, 10).map((act) => act.id),
    };
    let votingRequest = { votes: votes, activities: activities };
    socket.emit("castVotes", votingRequest);
  };

  socket.on("roomCreated", (response) => {
    setRoomCode(response.roomCode);
    console.log("returned Settings: ", response.settings);
    setInvalidRoomCode("");
  });

  socket.on("joinRoomStatus", (response) => {
    if (response.success) {
      setRoomCode(response.roomCode);
      setInvalidRoomCode("");
    } else {
      setRoomCode("");
      setInvalidRoomCode("roomCode not Valid");
    }
  });

  socket.on("playerAdded", (response) => {
    console.log("playerAdded:", response);
  });

  socket.on("playerRemoved", (response) => {
    console.log("playerRemoved:", response.success);
  });

  socket.on("gameStarted", (response) => {
    console.log("gameStarted");
    console.log(response.availableCategories);
  });

  socket.on("awaitingLastPlayer", () => {
    console.log("awaitingLastPlayer");
  });

  socket.on("startVoting", (response) => {
    console.log("startVoting");
    console.log(response.availableCards);
    setActivities(response.availableCards);
  });

  socket.on("sendResults", (response) => {
    console.log("sendResults");
    console.log(response.results);
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
