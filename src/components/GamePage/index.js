import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import * as queryString from "query-string";

import { createGrid, checkWinConndition } from "../../services/gridFunctions";
import { Container, Grid, GridItem, Blob } from "./styles";

const GamePage = ({ match, location }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [currentPlayer, setCurrentPlayer] = useState(1);
	const [whoHasWon, setWhoHasWon] = useState(null);
	const [gameBoard, setGameBoard] = useImmer(createGrid(2));
	const [playerDetails, setPlayerDetails] = useImmer(
		new Map([
			["player1", null],
			["player2", null],
		])
	);

	useEffect(() => {
		const query = queryString.parse(location.search);
		setGameBoard(() => createGrid(Number(match.params.size)));
		setPlayerDetails(draft => {
			draft.set("player1", query.player1 === undefined ? null : query.player1);
			draft.set("player2", query.player2 === undefined ? null : query.player2);
		});
	}, [match.params.size, location.search, setPlayerDetails, setGameBoard]);

	useEffect(() => {
		const { winner, positions } = checkWinConndition(gameBoard);
		if (winner !== null) {
			setWhoHasWon(winner);
			setGameBoard(draft => {
				positions.forEach(pos => (draft[pos.x][pos.y] = 0));
			});
		}
	}, [gameBoard, setGameBoard]);

	useEffect(() => {
		console.groupCollapsed("Player Details ...");
		console.log("Details for Player 1 :");
		console.log(playerDetails.get("player1"));
		console.log("Details for Player 2 :");
		console.log(playerDetails.get("player2"));
		console.groupEnd();
	}, [playerDetails]);

	useEffect(() => {
		console.groupCollapsed("Board Config ...");
		console.log("Current Grid :");
		console.table(gameBoard);
		console.log("Current Player :\t", currentPlayer);
		console.log("Player who has won :\t", whoHasWon);
		console.groupEnd();
	}, [gameBoard, currentPlayer, whoHasWon]);

	const onGridItemClick = (i, j) => () => {
		if (gameBoard[i][j] !== null) return null;
		setGameBoard(draft => {
			draft[i][j] = currentPlayer;
		});
		setCurrentPlayer(prevPlayer => (prevPlayer % 2) + 1);
	};

	const mappedBoard = (
		<Container>
			<Grid size={gameBoard.length}>
				{gameBoard.map((row, i) => (
					<React.Fragment key={i}>
						{row.map((el, j) => (
							<GridItem key={`p${i}${j}`} area={`p${i}${j}`}>
								<Blob dir={el} onClick={onGridItemClick(i, j)} />
							</GridItem>
						))}
					</React.Fragment>
				))}
			</Grid>
		</Container>
	);

	return isLoading ? <div>Loading</div> : mappedBoard;
};

export default GamePage;
