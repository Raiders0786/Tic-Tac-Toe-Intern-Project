import React, { useState, useEffect, useCallback } from "react";
import immer from "immer";
import { useImmer } from "use-immer";
import * as queryString from "query-string";

import {
	playerKey,
	winKey,
	boardKey,
	nextPlayer,
	checkGridSize,
	getWinnerText,
} from "../../services/gameConstants";
import { createGrid, checkWinConndition } from "../../services/gridValidation";
import crudCrud from "../../apis/crudCrud";

import GameBoard from "./GameBoard";
import Modal from "./Modal";

const GamePage = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [isRejected, setIsRejected] = useState(false);
	const [currentPlayer, setCurrentPlayer] = useState(playerKey.P1);
	const [hasForfeited, setHasForfeited] = useState(false);
	const [hasWon, setHasWon] = useState(winKey.NONE);
	const [gameBoard, setGameBoard] = useImmer(createGrid(1));
	const [p1Details, setP1Details] = useState({});
	const [p2Details, setP2Details] = useState({});

	const computeResults = useCallback(
		async winner => {
			if (winner === winKey.NONE) return;

			const p1Draft = immer(p1Details, draft => {
				delete draft._id;
				draft.score += winner === winKey.P1 ? 2 : winner === winKey.P2 ? -1 : 1;
			});
			const p2Draft = immer(p2Details, draft => {
				delete draft._id;
				draft.score += winner === winKey.P2 ? 2 : winner === winKey.P1 ? -1 : 1;
			});
			await crudCrud.put(`/user/${p1Details._id}`, p1Draft);
			await crudCrud.put(`/user/${p2Details._id}`, p2Draft);
		},
		[p1Details, p2Details]
	);
	const openConfirmation = useCallback(() => {
		setHasForfeited(true);
	}, []);
	const cancelForfeit = useCallback(() => {
		setHasForfeited(false);
	}, []);
	const confirmForfeit = useCallback(() => {
		computeResults(nextPlayer(currentPlayer));
		setHasForfeited(false);
		setHasWon(nextPlayer(currentPlayer));
	}, [computeResults, currentPlayer]);

	useEffect(() => {
		const { player1, player2 } = queryString.parse(props.location.search);
		const gridSize = Number(props.match.params.size);
		crudCrud.get("/user").then(({ data }) => {
			if (
				data.some(({ _id }) => _id === player1) &&
				data.some(({ _id }) => _id === player2) &&
				player1 !== player2 &&
				checkGridSize(gridSize)
			) {
				setGameBoard(() => createGrid(gridSize));
				setP1Details(data.find(({ _id }) => _id === player1) ?? {});
				setP2Details(data.find(({ _id }) => _id === player2) ?? {});
			} else setIsRejected(true);
			setIsLoading(false);
		});
	}, [props.match.params.size, props.location.search, setGameBoard]);

	useEffect(() => {
		console.groupCollapsed("Player Details ...");
		console.log("Details for Player 1 :");
		console.log(p1Details);
		console.log("Details for Player 2 :");
		console.log(p2Details);
		console.groupEnd();
	}, [p1Details, p2Details]);

	useEffect(() => {
		console.groupCollapsed("Board Config ...");
		console.log("Current Grid :");
		console.table(gameBoard);
		console.log("Current Player :\t", currentPlayer);
		console.log("Player who has won :\t", hasWon);
		console.groupEnd();
	}, [gameBoard, currentPlayer, hasWon]);

	const onBoardItemClick = (i, j) => () => {
		if (gameBoard[i][j] !== boardKey.EMPTY || hasWon !== winKey.NONE) return null;
		setGameBoard(draft => {
			draft[i][j] = currentPlayer;
			const { winner, positions } = checkWinConndition(draft);
			positions.forEach(({ x, y }) => {
				draft[x][y] = boardKey.MARK;
			});
			computeResults(winner);
			setHasWon(winner);
		});
		setCurrentPlayer(nextPlayer(currentPlayer));
	};

	if (isLoading) return <div>Loading</div>;
	if (isRejected) return <div>Invalid Game</div>;

	return (
		<React.Fragment>
			<GameBoard
				hasWon={hasWon}
				currentPlayer={currentPlayer}
				gameBoard={gameBoard}
				handleBoardItemClick={onBoardItemClick}
				openConfirmation={openConfirmation}
				p1Details={p1Details}
				p2Details={p2Details}
			/>
			<Modal
				isOpen={hasWon !== winKey.NONE}
				header={getWinnerText(hasWon, p1Details, p2Details)}
				description={"Do you want to"}
				content={"Go back to the Home Page or the Leaderboard"}
				buttons={[
					{ isLink: true, icon: "home", color: "black", handleEvent: "/" },
					{
						isLink: true,
						icon: "pie chart",
						color: "black",
						handleEvent: "/leaderboard",
					},
				]}
			/>
			<Modal
				isOpen={hasForfeited}
				header={"Confirmation Page"}
				description={"Are you sure you want to Forfeit the Game"}
				content={"You will lose points if you Forfeit the Match"}
				buttons={[
					{ isLink: false, icon: "close", color: "red", handleEvent: cancelForfeit },
					{
						isLink: false,
						icon: "check",
						color: "green",
						handleEvent: confirmForfeit,
					},
				]}
			/>
		</React.Fragment>
	);
};

export default GamePage;
