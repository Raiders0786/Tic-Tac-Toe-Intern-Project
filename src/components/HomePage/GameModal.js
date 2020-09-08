import React from "react";
import { Modal, Input, Button } from "semantic-ui-react";

import { minBoardSize, maxBoardSize } from "../../services/gameConstants";

import Dropdown from "./Dropdown";

const GameModal = props => (
	<Modal open={props.isModalOpen} centered>
		<Modal.Header>{props.header}</Modal.Header>
		<Modal.Content scrolling>
			<Dropdown
				placeholder='Select Player 1'
				options={props.players.map(el => ({
					...el,
					disabled: el.value === props.player2 ? true : false,
				}))}
				value={props.player1}
				handleChange={props.handlePlayerChange(1)}
			/>
			<br />
			<Dropdown
				placeholder='Select Player 2'
				options={props.players.map(el => ({
					...el,
					disabled: el.value === props.player1 ? true : false,
				}))}
				value={props.player2}
				handleChange={props.handlePlayerChange(2)}
			/>
			<br />
			<Input
				fluid
				step={1}
				type='number'
				min={minBoardSize}
				max={maxBoardSize}
				value={props.boardSize}
				onChange={props.handleSizeChange}
			/>
			<br />
		</Modal.Content>
		<Modal.Actions>
			{props.buttons.map((btn, index) => (
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
export default GameModal;
