import React, { useState } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function LobbyHost ({ socket }) {
  const { state } = useLocation();
  const roomCode = state.roomCode;
  console.log(roomCode);

  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }

  function toStart() {
    navigate("/");
  }

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="backBtn" viewBox="0 0 16 16" onClick={goBack}>
        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
      </svg>

      <section>
        <h3>Room Code:</h3>
        <input readOnly placeholder={roomCode} />
        < AddPlayer />
        <div style={{marginBottom: 100}}>Will add players</div>
        <Link to="/settings" state={{ action: "edit" }}>
          <button type="button" className="settingBtn">Room Settings</button>
        </Link>
        <br />
        <button type="button" className="startBtn" onClick={toStart}>Start!</button>

      </section>
    </div>
  );
}

function AddPlayer() {
  // Input?: player info
  // Save player info in a array?
  let playerCount = 3;
  return (
    <p>{playerCount} joined</p>
  );
}