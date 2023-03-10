

export default function AddPlayer(response, count) {
  let placement = document.getElementsByClassName("playerList")[0];
  let newId = response.playerName + count;

  let newPlayer = document.createElement("div");
  newPlayer.style.border = "solid";
  newPlayer.id = newId;


  let name = document.createElement("p");
  name.innerText = response.playerName;
  newPlayer.appendChild(name);

  // Should be an img
  let character = document.createElement("p");
  character.innerText = response.character;

  newPlayer.appendChild(character);
  placement.appendChild(newPlayer);
}