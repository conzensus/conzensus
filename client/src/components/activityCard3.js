import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

export default ActivityCard3;


function ActivityCard3({ cardInfo }) {
  const navigate = useNavigate();
  let activityTitle = cardInfo[0]
  let activityImage = cardInfo[1]
  let activityDescription = cardInfo[2]

  function nextCard() {
    navigate("/results");
  }

  const [timeRemaining, setTime] = useState(5);


  useEffect(() => {
    const time =
      setTimeout(() => {
        setTime(timeRemaining - 1)
      }, 1000)

    if (timeRemaining === 0) {
      navigate('/results')
    }

    return () => clearTimeout(time)
  }, [timeRemaining, navigate])



  return (
    <div>

      <p> {activityTitle} </p>
      <p> {activityImage} </p>
      <p> {activityDescription} </p>

      <button type="button" className="yesBtn" onClick={nextCard}>Yes!</button>
      <button type="button" className="noBtn" onClick={nextCard}>No</button>

      <p>{timeRemaining} second to choose!</p>
    </div>
  )
}