import Onboard from './onboarding';
import Settings from './settings';
import CharacterSelect from './createCharacter';
import LobbyHost from './lobbyHost';
import LobbyGuest from './lobbyGuest';

function App() {
  return (
    <div className="App">

      {/* <Onboard />
      <Settings />
      <CharacterSelect />
      <LobbyHost /> */}
      <LobbyGuest />

    </div>
  );
}

export default App;
