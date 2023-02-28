import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import Onboard from './onboarding';
import Settings from './settings';
import CharacterSelect from './characterSelect';
import LobbyHost from './lobbyHost';
import LobbyGuest from './lobbyGuest';
import GuestJoin from './guestJoin';

function App() {

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
    </div>
  );
}

export default App;
