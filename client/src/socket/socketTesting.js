import React, { useEffect, useState } from 'react';

export default TestSocket;

function TestSocket({ socket }) {

    const [roomCode, setRoomCode] = useState("null");
    const [invalidRoomCode, setInvalidRoomCode] = useState("");

    const createRoom = (e) => {
        e.preventDefault()
        let hostName = document.getElementById("hostName").value
        let hostCharacter = document.getElementById("hostCharacter").value
        let hostInfo = {"name": hostName, "character": hostCharacter}
        socket.emit("newRoom", JSON.stringify(hostInfo))
    }

    const joinRoom = (e) => {
        e.preventDefault()
        let roomCode = document.getElementById("roomCode").value
        let joinInfo = {"roomCode": roomCode}
        socket.emit("joinRoom", JSON.stringify(joinInfo))
    }

    const addPlayer = (e) => {
        e.preventDefault()
        let newPlayerName = document.getElementById("newPlayerName").value
        let newPlayerCharacter = document.getElementById("newPlayerCharacter").value
        let playerInfo = {"name": newPlayerName, "character": newPlayerCharacter}
        socket.emit("addPlayer", JSON.stringify(playerInfo), roomCode)
    }

    const editSettings = (e) => {
        e.preventDefault()
        let activityType = document.getElementById("activityType").value
        let maxDistance = document.getElementById("maxDistance").value
        let hostLocation = document.getElementById("hostLocation").value
        let settingsInfo = {"activityType": activityType, "maxDistance": maxDistance, "hostLocation": hostLocation}
        socket.emit("editSettings", JSON.stringify(settingsInfo))
    }

    socket.on("returnRoomCode", (returnedRoomCode) => {
        setRoomCode(returnedRoomCode)
        setInvalidRoomCode("")
    });

    socket.on("invalidRoomCode", () => {
        setRoomCode("")
        setInvalidRoomCode("roomCode not Valid")
    });
  
    return (
        <div>
            hostName: <input id="hostName"/>
            <br/>
            hostCharacter: <input id="hostCharacter"/>
            <br/>
            <button onClick={createRoom} id="button"> Create Room</button>
            <br/>
            <br/>
            <p>{roomCode}</p>
            <br/>
            <br/>

            roomCode: <input id="roomCode"/>
            <br/>
            <button onClick={joinRoom} id="button"> Join Room</button>
            <br/>
            <br/>

            <text>{invalidRoomCode}</text>
            <br/>
            <br/>
            newPlayerName: <input id="newPlayerName"/>
            <br/>
            newPlayerCharacter: <input id="newPlayerCharacter"/>
            <br/>
            <button onClick={addPlayer} id="button"> Add Character </button>
            <br/>
            <br/>
            activityType: <input id="activityType"/>
            <br/>
            maxDistance: <input id="maxDistance"/>
            <br/>
            hostLocation: <input id="hostLocation"/>
            <br/>
            <button onClick={editSettings} id="button"> Edit Character </button>
        </div>
    )
}