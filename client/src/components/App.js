import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import Onboard from './onboarding';
import Settings from './settings';
import CharacterSelect from './characterSelect';
import LobbyHost from './lobbyHost';
import LobbyGuest from './lobbyGuest';
import GuestJoin from './guestJoin';
//import TestSocket from '../socket/socketTesting';
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Onboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/selection" element={<CharacterSelect />} />
        <Route path="/hostLobby" element={<LobbyHost />} />
        <Route path="/join" element={<GuestJoin playerInfo={["Jane", "smile.image"]}/>} />
        <Route path="/guestLobby" element={<LobbyGuest />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* { socket ?
      //   <TestSocket socket={socket}/>
      // :
      // <div>not connected</div>
      // }
      */}
    </div>
  );
}

export default App;
