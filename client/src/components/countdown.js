import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Countdown (){
    const navigate = useNavigate();
    const [timeRemaining, setTime] = useState(5);

    useEffect(() => {
        const time = 
        setTimeout(() => {
            setTime(timeRemaining - 1)
        }, 1000)

        if(timeRemaining===0){
            navigate('/activityCard1')
        }

        return() => clearTimeout(time)
    }, [timeRemaining, navigate])


    
    return(
        <div>Game starting soon! <br></br>
            {timeRemaining} seconds
        </div>
    )
}