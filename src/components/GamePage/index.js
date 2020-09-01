import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Icon, Modal, Header } from "semantic-ui-react";
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

import { Container, Board, BoardItem, Blob } from "./styles";

const GamePage = ({ match, location }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isRejected, setIsRejected] = useState(false);
	const [currentPlayer, setCurrentPlayer] = useState(playerKey.P1);
	const [hasForfeited, setHasForfeited] = useState(false);
	const [hasWon, setHasWon] = useState(winKey.NONE);
	const [gameBoard, setGameBoard] = useImmer(createGrid(1));
	const [p1Details, setP1Details] = useState({});
	const [p2Details, setP2Details] = useState({});

	useEffect(() => {
		const { player1, player2 } = queryString.parse(location.search);
		const gridSize = Number(match.params.size);
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
	}, [match.params.size, location.search, setGameBoard]);

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

	const computeResults = async winner => {
		if (winner === winKey.NONE) return;
		const p1Change = winner === winKey.P1 ? 2 : winner === winKey.P2 ? -1 : 1;
		const p2Change = winner === winKey.P2 ? 2 : winner === winKey.P1 ? -1 : 1;

		await crudCrud.put(
			`/user/${p1Details._id}`,
			immer(p1Details, draft => {
				delete draft._id;
				draft.score += p1Change;
			})
		);
		await crudCrud.put(
			`/user/${p2Details._id}`,
			immer(p2Details, draft => {
				delete draft._id;
				draft.score += p2Change;
			})
		);
	};

	const onBoardItemClick = (i, j) => () => {
		if (gameBoard[i][j] !== boardKey.EMPTY || hasWon !== winKey.NONE) return null;
		setGameBoard(draft => {
			draft[i][j] = currentPlayer;
			const { winner, positions } = checkWinConndition(draft);
			positions.forEach(({ x, y }) => {
				draft[x][y] = boardKey.MARK;
			});
			(async winner => {
				await computeResults(winner);
				setHasWon(winner);
			})(winner);
		});
		setCurrentPlayer(nextPlayer(currentPlayer));
	};

	const openConfirmation = () => {
		setHasForfeited(true);
	};

	const cancelForfeit = () => {
		setHasForfeited(false);
	};

	const confirmForfeit = async () => {
		await computeResults(nextPlayer(currentPlayer));
		setHasForfeited(false);
		setHasWon(nextPlayer(currentPlayer));
	};

	return isLoading ? (
		<div>Loading</div>
	) : isRejected ? (
		<div>Invalid Game</div>
	) : (
		<React.Fragment>
			<Container turn={hasWon !== winKey.NONE ? playerKey.NONE : currentPlayer}>
				<Menu pointing inverted widths={3} size='mini' color='grey'>
					<Menu.Item fitted active={currentPlayer === 1}>
						<Icon name={p1Details.icon} color='teal' />
						{p1Details.name}
					</Menu.Item>
					<Menu.Item fitted active={currentPlayer === 2}>
						<Icon name={p2Details.icon} color='orange' />
						{p2Details.name}
					</Menu.Item>
					<Menu.Item fitted>
						<Button
							fluid
							negative
							icon='eject'
							content='Forfeit'
							onClick={openConfirmation}
						/>
					</Menu.Item>
				</Menu>
				<Board size={gameBoard.length}>
					{gameBoard.map((row, i) => (
						<React.Fragment key={i}>
							{row.map((el, j) => (
								<BoardItem key={`p${i}${j}`} area={`p${i}${j}`}>
									<Blob cell={el} onClick={onBoardItemClick(i, j)} />
								</BoardItem>
							))}
						</React.Fragment>
					))}
				</Board>
			</Container>
			<Modal centered open={hasWon !== winKey.NONE}>
				<Modal.Header>{getWinnerText(hasWon, p1Details, p2Details)}</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Header>Do you want to</Header>
						<p>Go back to the Home Page or the Leaderboard</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button as={Link} to='/' icon='home' color='black' />
					<Button as={Link} to='/leaderboard' icon='pie chart' color='black' />
				</Modal.Actions>
			</Modal>
			<Modal open={hasForfeited}>
				<Modal.Header>Confirmation Page</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Header>Are you sure you want to Forfeit the Game</Header>
						<p>You will lose points if you Forfeit the Match</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button negative icon='close' onClick={cancelForfeit} />
					<Button positive icon='check' onClick={confirmForfeit} />
				</Modal.Actions>
			</Modal>
		</React.Fragment>
	);
};

export default GamePage;
