import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import LeaderBoard from "./components/LeaderBoard";

class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<Navbar />
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/game/:size' exact component={GamePage} />
					<Route path='/leaderboard' exact component={LeaderBoard} />
				</Switch>
			</HashRouter>
		);
	}
}

export default App;
