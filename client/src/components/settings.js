import { useNavigate, useLocation, Link } from 'react-router-dom';

function Settings() {
  const { state } = useLocation();
  const action = state.action;

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="backBtn" viewBox="0 0 16 16" onClick={goBack}>
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
      </svg>

      <header>Room Settings</header>


        <h2 className="subtitle">Activity Type:</h2>
        <div className="htmlForm-check">
          <input className="htmlForm-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label className="htmlForm-check-label" htmlFor="flexCheckDefault">
              Indoor
            </label>
          <input className="htmlForm-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label className="htmlForm-check-label" htmlFor="flexCheckDefault">
              Outdoor
            </label>
          <input className="htmlForm-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label className="htmlForm-check-label" htmlFor="flexCheckDefault">
              Food
            </label>
        </div>

        <h2 className="subtitle">Max Distance:</h2>
          <div className="htmlForm-check">
            <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
                1 Mile
              </label>
            <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
                2 Miles
              </label>
            <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
                5 Miles
              </label>
            <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
                10 Miles
              </label>
            <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
                25 Miles
              </label>
            <input className="htmlForm-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="htmlForm-check-label" htmlFor="flexRadioDefault1">
                50 Miles
              </label>
          </div>
          <NextPage action={action}/>
    </div>
  )
}

function NextPage({ action }) {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  if (action === "set") {
    return (
      <Link to="/selection" state={{ player: "host" }}>
        <button type="button" className="nextBtn">Next!</button>
      </Link>
    )
  } else if (action === "edit") {
    return (
      <button type="button" className="nextBtn" onClick={goBack}>Save!</button>
    )
  }

}


export default Settings;
