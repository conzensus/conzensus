import { useNavigate } from 'react-router-dom';

export default function LobbyHost () {
  //Input of guest player?

  const navigate = useNavigate();

  function GoBack() {
    navigate(-1);
  }

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="backBtn" viewBox="0 0 16 16" onClick={GoBack}>
        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
      </svg>

      <section>
        <h3>Conzensus Room: JWXZ</h3>

        <div style={{marginBottom: 100}}>Will add players</div>
        <AddPlayer />
        <p>Waiting for host...</p>

      </section>
    </div>
  );
}

function AddPlayer() {
  // Input?: player info
  // Save player info in a array?
  let playerCount = 3;
  return (
    <p>{playerCount} joined</p>
  );
}