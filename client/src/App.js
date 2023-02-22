import "./App.css";
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

	return (
		<div className="App">
			<header className="App-header">
				<p>Hello World</p>
      </header>
		</div>
	);
}

export default App;
