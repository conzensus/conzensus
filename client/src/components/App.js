import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import Onboard from './onboarding';
import Settings from './settings';
import CharacterSelect from './characterSelect';
import LobbyHost from './lobbyHost';
import LobbyGuest from './lobbyGuest';
import GuestJoin from './guestJoin';
import ActivityCard1 from './activityCard1';
import ActivityCard2 from './activityCard2';
import ActivityCard3 from './activityCard3';
import Results from './results';
//import TestSocket from '../socket/socketTesting';
import Countdown from './countdown';


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
        <Route path="/" element={<Onboard socket={socket} />} />
        <Route path="/settings" element={<Settings socket={socket} />} />
        <Route path="/selection" element={<CharacterSelect socket={socket} />} />
        <Route path="/hostLobby" element={<LobbyHost socket={socket} />} />
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/join" element={<GuestJoin socket={socket} />} />
        <Route path="/guestLobby" element={<LobbyGuest socket={socket} />} />
        <Route path="/activityCard1" element={<ActivityCard1 cardInfo={["Tennis", "tennis.img", "racket sport played by two or four people"]}/>} />
        <Route path="/activityCard2" element={<ActivityCard2 cardInfo={["Swimming", "swim.img", "pool sport"]}/>} />
        <Route path="/activityCard3" element={<ActivityCard3 cardInfo={["Rock Climbing", "rc.img", "sport involving bouldering and climbing rocks"]}/>} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* { socket ?
        <TestSocket socket={socket}/>
      :
      <div>not connected</div>
      }
      */}
    </div>
  );
}

export default App;
