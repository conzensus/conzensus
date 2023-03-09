import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Routes, Route, Navigate } from 'react-router-dom';

import Onboard from './onboarding';
import Settings from './settings';
import CharacterSelect from './characterSelect';
import LobbyHost from './lobbyHost';
import LobbyGuest from './lobbyGuest';
import GuestJoin from './guestJoin';
import Test from './test';

// import TestSocket from '../socket/socketTesting';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      {/* <Test /> */}
      <Routes>
        <Route path="/" element={<Onboard socket={socket} />} />
        <Route path="/settings" element={<Settings socket={socket} />} />
        <Route path="/selection" element={<CharacterSelect socket={socket} />} />
        <Route path="/hostLobby" element={<LobbyHost socket={socket} />} />
        <Route path="/join" element={<GuestJoin socket={socket} />} />
        <Route path="/guestLobby" element={<LobbyGuest socket={socket} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* { socket ?
        <TestSocket socket={socket}/>
      :
      <div>not connected</div>
      } */}
    </div>
  );
}

export default App;
