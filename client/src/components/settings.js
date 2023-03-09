import React, { useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Settings({ socket }) {
  const [roomCode, setRoomCode] = useState("null");

  // if (socket) {
  //   socket.on("roomCreated", (returnedRoomCode) => {
  //     console.log(returnedRoomCode);
  //     setRoomCode(returnedRoomCode);
  //   });
  // } else {
  //   console.log("Error: No room created")
  // }

  socket.on("roomCreated", (returnedRoomCode) => {
    console.log(returnedRoomCode);
    setRoomCode(returnedRoomCode);
  });

  const { state } = useLocation();
  const action = state.action;

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  let activityList = [];
  const UpdateList = (e) => {
    const name = e.target.id;
    const index = activityList.indexOf(name);
    if (index === -1) {
      activityList.push(name);
    } else {
      activityList.splice(index, 1);
    }
  }

  let settingsInfo = {
    activityType: activityList,
    maxDistance: 0,
    hostLocation: "UVillage",
  };

  const UpdateDistance = (e) => {
    settingsInfo.maxDistance = parseInt(e.target.value);
  }


  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="backBtn" viewBox="0 0 16 16" onClick={goBack}>
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
      </svg>

      <header>Room Settings</header>

      <form id="settings">
        <section id="activityType">
          <h2 className="subtitle">Activity Type:</h2>
          <input className="htmlForm-check-input" type="checkbox" value="" id="indoor" onChange={UpdateList} />
            <label className="htmlForm-check-label" htmlFor="flexCheckDefault">
              Indoor
            </label>
          <input className="htmlForm-check-input" type="checkbox" value="" id="outdoor" onChange={UpdateList} />
            <label className="htmlForm-check-label" htmlFor="flexCheckDefault">
              Outdoor
            </label>
          <input className="htmlForm-check-input" type="checkbox" value="" id="food" onChange={UpdateList} />
            <label className="htmlForm-check-label" htmlFor="flexCheckDefault">
              Food
          </label>
        </section>

        <section id="maxDistance">
          <h2 className="subtitle">Max Distance:</h2>
          <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" value="1" id="flexRadioDefault1" onChange={UpdateDistance} />
            <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
              1 Mile
            </label>
          <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" value="2" id="flexRadioDefault1" onChange={UpdateDistance} />
            <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
              2 Miles
            </label>
          <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" value="5" id="flexRadioDefault1" onChange={UpdateDistance} />
            <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
              5 Miles
            </label>
          <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" value="10" id="flexRadioDefault1" onChange={UpdateDistance} />
            <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
              10 Miles
            </label>
          <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" value="25" id="flexRadioDefault1" onChange={UpdateDistance} />
            <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
              25 Miles
            </label>
          <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" value="50" id="flexRadioDefault1" onChange={UpdateDistance} />
            <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
              50 Miles
            </label>
        </section>
      </form>

      <NextPage socket={socket} action={action} code={roomCode} settings={settingsInfo}/>
    </div>
  )
}


function NextPage({ socket, action, code, settings }) {
  const navigate = useNavigate();

  if (action === "set") {
    const setSettings = (e) => {
      socket.emit("setSettings", JSON.stringify(settings));
    };
    return (
      <Link to="/selection" state={{ roomCode: code, player: "host" }}>
        <button type="button" className="nextBtn" onClick={setSettings}>Next!</button>
      </Link>
    )
  } else if (action === "edit") {
    const setSettings = (e) => {
      socket.emit("setSettings", JSON.stringify(settings));
      navigate(-1);
    };
    return (
      <button type="button" className="nextBtn" onClick={setSettings}>Save!</button>
    )
  }

}


export default Settings;
