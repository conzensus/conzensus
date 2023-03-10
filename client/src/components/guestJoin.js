import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function GuestJoin({ socket }) {
  const [invalidRoomCode, setInvalidRoomCode] = useState("");

  const { state } = useLocation();
  const playerInfo = state.playerInfo;

  const navigate = useNavigate();

  function GoBack() {
    navigate(-1);
  }

  function ToLobby(e) {
    socket.emit("joinRoom", joinInfo);
    socket.on("joinRoomStatus", (response) => {
      if (response.success) {
        setInvalidRoomCode("");
        socket.emit("addPlayer", playerInfo);
        navigate("/guestLobby");
      } else {
        setInvalidRoomCode("roomCode not Valid");
      }
    });
  }

  let joinInfo = {
    roomCode: ""
  }

  const UpdateCode = (e) => {
    joinInfo.roomCode = e.target.value;
  }


  let name = playerInfo.playerName;
  let image = playerInfo.character;
  return (
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="backBtn" viewBox="0 0 16 16" onClick={GoBack}>
        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
      </svg>

      <p> {name} </p>
      <p> {image} </p>


      <h3>Insert Room Code</h3>
        <input type="roomCode" onChange={UpdateCode} />
        <br/>
        <p>{invalidRoomCode}</p>
        <button type="button" className="nextBtn" onClick={ToLobby}>Next!</button>
    </div>
  )
}

