import { Link } from 'react-router-dom';

function Onboard() {
  return (
    <div className="test" id="hi">
      <header>conzensus</header>

      <div>
        <Link to="/settings" state={{ action: "set" }}>
          <button type="button" aria-label="createLobby"> Create Lobby</button>
        </Link>
        <br />
        <Link to="/selection" state={{ player: "guest" }}>
          <button type="button" aria-label="joinLobby"> Join</button>
        </Link>
      </div>
    </div>
  )
}

export default Onboard;
