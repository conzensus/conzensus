import Onboard from './onboarding';
import Settings from './settings';
import CharacterSelect from './createCharacter';
import LobbyHost from './lobbyHost';
import LobbyGuest from './lobbyGuest';

import GuestJoin from './guestJoin';

function App() {
  return (
    <div className="App">

      {/* <Onboard />
      <Settings />
      <CharacterSelect />
      <LobbyHost />
      <LobbyGuest /> */}
      <GuestJoin playerInfo={["shiori", "smile.img"]}/>

    </div>
  );
}

export default App;
