import Onboard from './onboarding';
import Settings from './settings';
import CharacterSelect from './createCharacter';
import LobbyHost from './lobbyHost';
import LobbyGuest from './lobbyGuest';

import GuestJoin from './guestJoin';

import TestSocket from '../socket/socketTesting';
import React, { useEffect, useState } from 'react';
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

      {/* <Onboard />
      <Settings />
      <CharacterSelect />
      <LobbyHost />
      <LobbyGuest />*/}
      {/* <GuestJoin playerInfo={["shiori", "smile.img"]}/> */}
      { socket ?
        <TestSocket socket={socket}/>
      :
      <div>not connected</div>
      }

    </div>
  );
}

export default App;
