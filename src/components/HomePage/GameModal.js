import React from "react";
import { Modal, Input, Button } from "semantic-ui-react";

import { minBoardSize, maxBoardSize } from "../../services/gameConstants";

import Dropdown from "./Dropdown";

const GameModal = ({
	isModalOpen,
	header,
	players,
	player1,
	player2,
	boardSize,
	handlePlayerChange,
	handleSizeChange,
	buttons,
}) => {
	return (
		<Modal open={isModalOpen} centered>
			<Modal.Header>{header}</Modal.Header>
			<Modal.Content scrolling>
				<Dropdown
					placeholder='Select Player 1'
					options={players.map(el => ({
						...el,
						disabled: el.value === player2 ? true : false,
					}))}
					value={player1}
					handleChange={handlePlayerChange(1)}
				/>
				<br />
				<Dropdown
					placeholder='Select Player 2'
					options={players.map(el => ({
						...el,
						disabled: el.value === player1 ? true : false,
					}))}
					value={player2}
					handleChange={handlePlayerChange(2)}
				/>
				<br />
				<Input
					fluid
					step={1}
					type='number'
					min={minBoardSize}
					max={maxBoardSize}
					value={boardSize}
					onChange={handleSizeChange}
				/>
				<br />
			</Modal.Content>
			<Modal.Actions>
				{buttons.map((btn, index) => (
					<Button
						key={index}
						color={btn.color}
						icon={btn.icon}
						content={btn.content}
						labelPosition='right'
						onClick={btn.handleEvent}
					/>
				))}
			</Modal.Actions>
		</Modal>
	);
};
export default GameModal;
