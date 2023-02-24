import Onboard from './onboarding';
import Settings from './settings';
import CharacterSelect from './createCharacter';
import LobbyHost from './lobbyHost';

import GuestJoin from './guestJoin';

function App() {
  return (
    <div className="App">

      {/* <Onboard />
      <Settings />
      <CharacterSelect /> */}

      <GuestJoin playerInfo={["shiori", "smile.img"]}/>

    </div>
  );
}

export default App;
