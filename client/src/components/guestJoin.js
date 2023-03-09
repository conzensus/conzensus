import { useNavigate } from 'react-router-dom';

export default GuestJoin;

function GuestJoin({ playerInfo }) {
  const navigate = useNavigate();
  let name = playerInfo[0]
  let image = playerInfo[1]
  
  function goBack() {
    navigate(-1);
  }
  
  function nextCard() {
    navigate("/activityCard1");
}

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="backBtn" viewBox="0 0 16 16" onClick={goBack}>
        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
      </svg>

      <p> {name} </p>
      <p> {image} </p>


      <h3>Insert Room Code</h3>
        <input type="roomCode"/>
          <br></br>
        <button type="button" className="nextBtn" onClick={nextCard}>Next!</button>
    </div>
  )
}
