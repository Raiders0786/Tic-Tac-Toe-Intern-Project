import React, { useState, useEffect, useCallback } from "react";

import {
	playerKey,
	minBoardSize,
	maxBoardSize,
	startBoardSize,
	dropdownMap,
} from "../../services/gameConstants";
import crudCrud from "../../apis/crudCrud";

import HomeOptions from "./HomeOptions";
import GameModal from "./GameModal";
import { StyledGrid } from "./style";

const HomePage = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModelOpen] = useState(false);
	const [players, setPlayers] = useState([]);
	const [player1, setPlayer1] = useState(playerKey.NONE);
	const [player2, setPlayer2] = useState(playerKey.NONE);
	const [boardSize, setBoardSize] = useState(startBoardSize);

	const onModalToggle = useCallback(() => {
		setIsModelOpen(prev => !prev);
	}, []);
	const onPlayerChange = useCallback(
		player => (_, { value }) => {
			if (player === playerKey.P1) setPlayer1(value);
			else if (player === playerKey.P2) setPlayer2(value);
		},
		[]
	);
	const onSizeChange = useCallback((_, { value }) => {
		value = Math.round(Number(value));
		if (value < minBoardSize) value = minBoardSize;
		if (value > maxBoardSize) value = maxBoardSize;
		setBoardSize(value);
	}, []);

	useEffect(() => {
		(async () => {
			const { data } = await crudCrud.get("/user");
			setPlayers(dropdownMap(data));
			setPlayer1(data[0]._id);
			setPlayer2(data[1]._id);
			setIsLoading(false);
		})();
	}, []);

	const onSubmit = () => {
		props.history.push(`/game/${boardSize}?player1=${player1}&player2=${player2}`);
	};

	if (isLoading) return <div>Loading ...</div>;

	return (
		<React.Fragment>
			<StyledGrid>
				<HomeOptions
					area='a'
					header='Tic Tac Toe'
					subheader='Choose an Option'
					divider='Options'
					buttons={[
						{
							isLink: false,
							color: "blue",
							icon: "settings",
							content: "New Game",
							handleEvent: onModalToggle,
						},
						{
							isLink: true,
							color: "orange",
							icon: "plus",
							content: "New User",
							handleEvent: "/register",
						},
					]}
				/>
			</StyledGrid>
			<GameModal
				isModalOpen={isModalOpen}
				header='Choose Players'
				players={players}
				player1={player1}
				player2={player2}
				boardSize={boardSize}
				handlePlayerChange={onPlayerChange}
				handleSizeChange={onSizeChange}
				buttons={[
					{
						color: "green",
						icon: "subway",
						content: "Start",
						handleEvent: onSubmit,
					},
					{
						color: "red",
						icon: "close",
						content: "Close",
						handleEvent: onModalToggle,
					},
				]}
			/>
		</React.Fragment>
	);
};

export default HomePage;
