import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function CreateCharacter( {socket} ) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const roomCode = state.roomCode;
  const player = state.player;

  // useEffect(() => {
  //   function reloadPage() {
  //     var currentDocumentTimestamp =
  //     new Date(performance.timing.domLoading).getTime();
  //     var now = Date.now();
  //     var tenSec = 1 * 1000;
  //     var plusTenSec = currentDocumentTimestamp + tenSec;
  //     if (now > plusTenSec) {
  //       // window.location.reload();
  //       navigate(0);
  //     } else {}
  //   }
  //   reloadPage();
  // }, []);


  function GoBack() {
    navigate(-1);
  }

  let playerInfo = {
    name: "",
    character: ""
  }

  const UpdateName = (e) => {
    console.log(e.target.value)
    playerInfo.name = e.target.value;
  }

  const UpdateCharacter = (e) => {
    console.log(e.target.id);
    playerInfo.character = e.target.id;
  }

  // const btns = document.querySelectorAll("button");

  // btns.forEach((btn) => {
  //   btn.addEventListener('click', () => {
  //     removeClasses(btn);
  //   });
  // });

  // function removeClasses(target) {
  //   btns.forEach((btn) => {
  //     if(btn === target) {
  //       btn.style.background = "lightgrey";
  //       btn.classList.add("active");
  //       playerInfo.character = target.firstChild.firstChild.id;
  //       console.log(playerInfo.character);
  //     } else {
  //       btn.style.background = "white";
  //       btn.classList.remove("active");
  //     }
  //   });
  // }

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="backBtn" viewBox="0 0 16 16" onClick={GoBack}>
        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
      </svg>
      <section>
        <h3>NAME</h3>
        <input type="name" onChange={UpdateName}/>
      </section>
      <section>
        <h3>CHARACTER</h3>
        <div id="characterList">
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-emoji-angry" viewBox="0 0 16 16" onClick={UpdateCharacter} >
              <path id="angry.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5z"/>
            </svg>
          </button>
          <br />
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="dizzy" viewBox="0 0 16 16" onClick={UpdateCharacter}>
              <path id="dizzy.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zm5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zM8 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
            </svg>
          </button>
          <br />
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="expressionless" viewBox="0 0 16 16" onClick={UpdateCharacter}>
              <path id="expressionless.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm5 0h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm-5 4h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
            </svg>
          </button>
          <br />
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="frown" viewBox="0 0 16 16" onClick={UpdateCharacter} >
              <path id="frown.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
            </svg>
          </button>
          <br />
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="kiss" viewBox="0 0 16 16" onClick={UpdateCharacter}>
              <path id="kiss.img" fillRule="evenodd" d="M16 8a8 8 0 1 0-2.697 5.99c-.972-.665-1.632-1.356-1.99-2.062-.388-.766-.419-1.561-.075-2.23.496-.97 1.73-1.466 2.762-1.05.65-.262 1.38-.162 1.957.19.028-.275.043-.555.043-.838ZM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5Zm1.512 3.647c-.347.08-.737.198-1.107.319a.5.5 0 1 1-.31-.95c.38-.125.802-.254 1.192-.343.37-.086.78-.153 1.103-.108.16.022.394.085.561.286.188.226.187.497.131.705a1.894 1.894 0 0 1-.31.593c-.077.107-.168.22-.275.343.107.124.199.24.276.347.142.197.256.397.31.595.055.208.056.479-.132.706-.168.2-.404.262-.563.284-.323.043-.733-.027-1.102-.113a14.87 14.87 0 0 1-1.191-.345.5.5 0 1 1 .31-.95c.371.12.761.24 1.109.321.176.041.325.069.446.084a5.609 5.609 0 0 0-.502-.584.5.5 0 0 1 .002-.695 5.52 5.52 0 0 0 .5-.577 4.465 4.465 0 0 0-.448.082Zm.766-.086-.006-.002c.004 0 .006.002.006.002Zm.002 1.867h-.001l-.005.001a.038.038 0 0 1 .006-.002Zm.157-4.685a.5.5 0 0 1-.874-.486A1.934 1.934 0 0 1 10.25 5.75c.73 0 1.356.412 1.687 1.007a.5.5 0 1 1-.874.486.934.934 0 0 0-.813-.493.934.934 0 0 0-.813.493ZM14 9.828c1.11-1.14 3.884.856 0 3.422-3.884-2.566-1.11-4.562 0-3.421Z"/>
            </svg>
          </button>
          <br />
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="neutral" viewBox="0 0 16 16" onClick={UpdateCharacter}>
              <path id="neutral.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-3 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
            </svg>
          </button>
          <br />
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="smile-upside-down" viewBox="0 0 16 16" onClick={UpdateCharacter}>
              <path id="smile-upside-down.img" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zM4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM10 8c-.552 0-1 .672-1 1.5s.448 1.5 1 1.5 1-.672 1-1.5S10.552 8 10 8z"/>
            </svg>
          </button>
          <br />
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="sunglasses" viewBox="0 0 16 16" onClick={UpdateCharacter}>
              <path id="sunglasses.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.22 4.22 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A2.99 2.99 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515L2.31 5.243zM4.969 9.75A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .866-.5z"/>
            </svg>
          </button>
          <br />
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="wink" viewBox="0 0 16 16" onClick={UpdateCharacter}>
              <path id="wink.img" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7 6.5C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zM4.285 9.567a.5.5 0 0 0-.183.683A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75.5.5 0 0 0-.683-.183zm5.152-3.31a.5.5 0 0 0-.874.486c.33.595.958 1.007 1.687 1.007.73 0 1.356-.412 1.687-1.007a.5.5 0 0 0-.874-.486.934.934 0 0 1-.813.493.934.934 0 0 1-.813-.493z"/>
            </svg>
          </button>
          <br />
          <button style={{background: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="smile" viewBox="0 0 16 16" onClick={UpdateCharacter}>
              <path id="smile.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
            </svg>
          </button>
        </div>
      </section>

      <NextPage socket={socket} playerInfo={playerInfo} player={player} roomCode={roomCode} />
    </div>
  );
}


function NextPage({ socket, playerInfo, player, roomCode }) {

  function AddPlayer(e) {
    socket.emit("addPlayer", JSON.stringify(playerInfo), roomCode);
  }

  if (player === "host") {
    return (
      <Link to="/hostLobby" state={{ roomCode: roomCode }}>
        <button type="button" className="nextBtn" onClick={AddPlayer}>Next!</button>
      </Link>
    );
  } else {
    return (
      <Link to="/join" state={{ playerInfo: playerInfo }}>
        <button type="button" className="nextBtn">Next!</button>
      </Link>
    );
  }
}