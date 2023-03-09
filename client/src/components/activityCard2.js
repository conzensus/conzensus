import { useNavigate} from 'react-router-dom';

export default ActivityCard2;


function ActivityCard2({ cardInfo }) {
  const navigate = useNavigate();
  let activityTitle = cardInfo[0]
  let activityImage = cardInfo[1]
  let activityDescription = cardInfo[2]

  function nextCard(){
    navigate("/activityCard3");
  }
  

  
  return (
    <div>

      <p> {activityTitle} </p>
      <p> {activityImage} </p>
      <p> {activityDescription} </p>

        <button type="button" className="yesBtn" onClick={nextCard}>Yes!</button>
        <button type="button" className="noBtn" onClick={nextCard}>No</button>
    </div>
  )
}