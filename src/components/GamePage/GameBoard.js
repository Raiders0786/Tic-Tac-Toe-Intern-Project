import React from "react";

import { winKey, playerKey } from "../../services/gameConstants";

import { Board, BoardItem, Blob, BoardContainer } from "./styles";
import PlayerMenu from "./PlayerMenu";

const GameBoard = props => (
	<BoardContainer
		turn={props.hasWon !== winKey.NONE ? playerKey.NONE : props.currentPlayer}
	>
		<PlayerMenu
			p1Details={props.p1Details}
			p2Details={props.p2Details}
			hasWon={props.hasWon}
			currentPlayer={props.currentPlayer}
			openConfirmation={props.openConfirmation}
		/>
		<Board size={props.gameBoard.length}>
			{props.gameBoard.map((row, i) => (
				<React.Fragment key={i}>
					{row.map((el, j) => (
						<BoardItem key={`p${i}${j}`} area={`p${i}${j}`}>
							<Blob cell={el} onClick={props.handleBoardItemClick(i, j)} />
						</BoardItem>
					))}
				</React.Fragment>
			))}
		</Board>
	</BoardContainer>
);

export default GameBoard;
