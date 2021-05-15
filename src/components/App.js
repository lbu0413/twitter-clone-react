import react, { useState, useEffect } from "react";
import AppRouter from "./Router";
import fbase from "../fbase";
import { authService } from "../fbase";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);
	return (
		<>
			{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
			<footer>&copy;{new Date().getFullYear()} Wook</footer>
		</>
	);
}

export default App;
