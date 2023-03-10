import React from "react";
import { Link } from 'react-router-dom';

export default function Onboard({ socket }) {
  const createRoom = (e) => {
    socket.emit("createRoom");
  };

  return (
    <div className="test" id="hi">
      <header>conzensus</header>

      <div>
        <Link to="/settings" state={{ action: "set" }}>
          <button type="button" aria-label="createLobby" onClick={(createRoom)}> Create Lobby</button>
        </Link>
        <br />
        <Link to="/selection" state={{ player: "guest" }}>
          <button type="button" aria-label="joinLobby"> Join</button>
        </Link>
      </div>
    </div>
  )
}
