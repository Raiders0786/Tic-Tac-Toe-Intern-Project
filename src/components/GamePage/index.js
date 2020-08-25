import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Icon, Modal, Header } from "semantic-ui-react";
import { useImmer } from "use-immer";
import * as queryString from "query-string";

import {
	playerStatus,
	winStatus,
	boardStatus,
	getNextPlayer,
} from "../../services/gameConstants";
import { createGrid, checkWinConndition } from "../../services/gridFunctions";
import { Container, Board, BoardItem, Blob } from "./styles";

const GamePage = ({ match, location }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [currentPlayer, setCurrentPlayer] = useState(playerStatus.P1);
	const [hasForfeited, setHasForfeited] = useState(false);
	const [hasWon, setHasWon] = useState(winStatus.NONE);
	const [gameBoard, setGameBoard] = useImmer(createGrid(1));
	const [playerDetails, setPlayerDetails] = useImmer({
		player1: null,
		player2: null,
	});

	useEffect(() => {
		const query = queryString.parse(location.search);
		setGameBoard(() => createGrid(Number(match.params.size)));
		setPlayerDetails(draft => {
			draft.player1 = query.player1 === undefined ? null : query.player1;
			draft.player2 = query.player2 === undefined ? null : query.player2;
		});
		setIsLoading(false);
	}, [match.params.size, location.search, setPlayerDetails, setGameBoard]);

	useEffect(() => {
		console.groupCollapsed("Player Details ...");
		console.log("Details for Player 1 :");
		console.log(playerDetails.player1);
		console.log("Details for Player 2 :");
		console.log(playerDetails.player2);
		console.groupEnd();
	}, [playerDetails]);

	useEffect(() => {
		console.groupCollapsed("Board Config ...");
		console.log("Current Grid :");
		console.table(gameBoard);
		console.log("Current Player :\t", currentPlayer);
		console.log("Player who has won :\t", hasWon);
		console.groupEnd();
	}, [gameBoard, currentPlayer, hasWon]);

	const onBoardItemClick = (i, j) => () => {
		if (gameBoard[i][j] !== boardStatus.EMPTY || hasWon !== winStatus.NONE)
			return null;
		setGameBoard(draft => {
			draft[i][j] = currentPlayer;
			const { winner, positions } = checkWinConndition(draft);
			setHasWon(winner);
			positions.forEach(({ x, y }) => {
				draft[x][y] = boardStatus.MARK;
			});
		});
		setCurrentPlayer(getNextPlayer(currentPlayer));
	};

	const openConfirmation = () => {
		setHasForfeited(true);
	};

	const cancelForfeit = () => {
		setHasForfeited(false);
	};

	const forfeitMatch = () => {
		setHasForfeited(false);
		setHasWon(getNextPlayer(currentPlayer));
	};

	return isLoading ? (
		<div> Loading </div>
	) : (
		<React.Fragment>
			<Container
				turn={hasWon !== winStatus.NONE ? playerStatus.NONE : currentPlayer}
			>
				<Menu pointing inverted widths={3} size='mini' color='grey'>
					<Menu.Item fitted active={currentPlayer === 1}>
						<Icon name='user' color='teal' /> Player 1
					</Menu.Item>
					<Menu.Item fitted active={currentPlayer === 2}>
						<Icon name='user' color='orange' /> Player 2
					</Menu.Item>
					<Menu.Item fitted>
						<Button
							icon='eject'
							content='Forfeit'
							fluid
							negative
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
			<Modal centered open={hasWon !== winStatus.NONE}>
				<Modal.Header>
					{hasWon === winStatus.DRAW ? "It is a Tie." : `Player ${hasWon} has Won`}
				</Modal.Header>
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
					<Button positive icon='check' onClick={forfeitMatch} />
				</Modal.Actions>
			</Modal>
		</React.Fragment>
	);
};

export default GamePage;
