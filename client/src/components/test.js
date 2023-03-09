
export default function Test() {

  const handleClick = (e) => {
    console.log(e);
  }

  const btns = document.querySelectorAll("button");

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      removeClasses(btn);
    });
  });

  function removeClasses(target) {
    btns.forEach((btn) => {
      if(btn === target) {
        btn.style.background = "lightgrey";
        btn.classList.add("active");
        console.log(target.firstChild.firstChild.id);
      } else {
        btn.style.background = "white";
        btn.classList.remove("active");
      }
    });
  }


  return (
    <div>
      <button style={{ background: "white" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-emoji-angry" viewBox="0 0 16 16" >
          <path id="angry.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5z"/>
        </svg>
      </button>
      <br />
      <button style={{ background: "white" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="dizzy" viewBox="0 0 16 16" >
          <path id="dizzy.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zm5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zM8 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
        </svg>
      </button>
      <br />
      <button style={{ background: "white" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="expressionless" viewBox="0 0 16 16" >
          <path id="expressionless.img" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm5 0h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm-5 4h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
        </svg>
      </button>
    </div>
  );
}