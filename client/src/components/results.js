import { useNavigate } from 'react-router-dom';

export default function Results() {
    const navigate = useNavigate();

    function nextCard() {
        navigate("/");
    }

    return (
        <div>
            <h1> RESULTS </h1>
            <p>1. Rock Climbing</p>
            <a href = "https://www.yelp.com/search?find_desc=rock+climbing&find_loc=Seattle%2C+WA+98104">Yelp</a>
            <p></p>
            <a href = "https://www.google.com/maps/search/rock+climbing/@47.6651234,-122.3136066,13z/data=!3m1!4b1">Google Maps</a>
            <p>2. Swimming</p>
            <a href = "https://www.yelp.com/search?find_desc=swimming&find_loc=Seattle%2C+WA+98104">Yelp</a>
            <p></p>
            <a href = "https://www.google.com/maps/search/swimming/@47.6651234,-122.3136066,13z">Google Maps</a>
            <p>3. Tennis</p>
            <a href = "https://www.yelp.com/search?find_desc=tennis&find_loc=Seattle%2C+WA+98104">Yelp</a>
            <p></p>
            <a href = "https://www.google.com/maps/search/tennis/@47.6651021,-122.3136066,13z/data=!3m1!4b1">Google Maps</a>
            <p><button type="button" className="playAgainBtn" onClick={nextCard}>Play Again!</button></p>
        </div>
    )
}