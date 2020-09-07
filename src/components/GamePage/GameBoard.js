import React from "react";

import { winKey, playerKey } from "../../services/gameConstants";

import { Board, BoardItem, Blob, Container } from "./styles";
import PlayerMenu from "./PlayerMenu";

const GameBoard = ({
	hasWon,
	currentPlayer,
	gameBoard,
	handleBoardItemClick,
	openConfirmation,
	p1Details,
	p2Details,
}) => {
	return (
		<Container turn={hasWon !== winKey.NONE ? playerKey.NONE : currentPlayer}>
			<PlayerMenu
				p1Details={p1Details}
				p2Details={p2Details}
				hasWon={hasWon}
				currentPlayer={currentPlayer}
				openConfirmation={openConfirmation}
			/>
			<Board size={gameBoard.length}>
				{gameBoard.map((row, i) => (
					<React.Fragment key={i}>
						{row.map((el, j) => (
							<BoardItem key={`p${i}${j}`} area={`p${i}${j}`}>
								<Blob cell={el} onClick={handleBoardItemClick(i, j)} />
							</BoardItem>
						))}
					</React.Fragment>
				))}
			</Board>
		</Container>
	);
};

export default GameBoard;
