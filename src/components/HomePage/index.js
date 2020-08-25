import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Segment,
	Icon,
	Header,
	Button,
	Input,
	Modal,
	Divider,
} from "semantic-ui-react";

import {
	minBoardSize,
	maxBoardSize,
	startBoardSize,
} from "../../services/gameConstants";

import DropdownMenu from "./Dropdown";
import { StyledGrid, GridItem } from "./style";

const userOptions = [
	{
		key: "Jenny Hess",
		text: "Jenny Hess",
		value: "Jenny Hess",
		image: {
			avatar: true,
			src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
		},
	},
	{
		key: "Elliot Fu",
		text: "Elliot Fu",
		value: "Elliot Fu",
		image: {
			avatar: true,
			src: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
		},
	},
	{
		key: "Stevie Feliciano",
		text: "Stevie Feliciano",
		value: "Stevie Feliciano",
		image: {
			avatar: true,
			src: "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
		},
		disabled: true,
	},
	{
		key: "Christian",
		text: "Christian",
		value: "Christian",
		image: {
			avatar: true,
			src: "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
		},
	},
];

const HomePage = ({ history }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModelOpen] = useState(false);
	const [players, setPlayers] = useState([]);
	const [player1, setPlayer1] = useState("Jenny Hess");
	const [player2, setPlayer2] = useState("Elliot Fu");
	const [boardSize, setBoardSize] = useState(startBoardSize);

	useEffect(() => {
		setPlayers(userOptions);
		setIsLoading(false);
	}, []);

	const handleModalToggle = () => {
		setIsModelOpen(prev => !prev);
	};

	const handlePlayerChange = player => (_, { value }) => {
		if (player === 1) setPlayer1(value);
		else if (player === 2) setPlayer2(value);
	};

	const handleSizeChange = (_, { value }) => {
		value = Number(value);
		if (value < minBoardSize) value = minBoardSize;
		if (value > maxBoardSize) value = maxBoardSize;
		if (Math.round(value) !== value) value = Math.round(value);
		setBoardSize(value);
	};

	const handleSubmit = () => {
		console.log(player1);
		console.log(player2);
		console.log(boardSize);
		history.push(`/game/${boardSize}?player1=${player1}&player2=${player2}`);
	};

	if (isLoading) return <div>Loading ...</div>;

	return (
		<React.Fragment>
			<StyledGrid>
				<GridItem area='a' as={Segment} color='purple' raised>
					<Header as='h2'>
						<Icon name='setting' loading />
						<Header.Content>
							Tic Tac Toe
							<Header.Subheader>Choose an Option</Header.Subheader>
						</Header.Content>
					</Header>
					<Divider section horizontal>
						<Icon name='tag' />
						Options
					</Divider>
					<Button
						primary
						icon
						fluid
						labelPosition='left'
						onClick={handleModalToggle}
					>
						<Icon name='settings' />
						New Game
					</Button>
					<br />
					<Button
						as={Link}
						to='/register'
						icon
						fluid
						color='orange'
						labelPosition='left'
					>
						<Icon name='plus' />
						New User
					</Button>
				</GridItem>
			</StyledGrid>
			<Modal open={isModalOpen} centered={false}>
				<Modal.Header>Choose Players</Modal.Header>
				<Modal.Content scrolling>
					<DropdownMenu
						placeholder='Select Player 1'
						options={players.map(el => ({
							...el,
							disabled: el.value === player2 ? true : false,
						}))}
						value={player1}
						handleChange={handlePlayerChange(1)}
					/>
					<br />
					<DropdownMenu
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
					<Button primary icon labelPosition='right' onClick={handleSubmit}>
						<Icon name='subway' />
						Start
					</Button>
					<Button negative icon labelPosition='right' onClick={handleModalToggle}>
						<Icon name='close' />
						Close
					</Button>
				</Modal.Actions>
			</Modal>
		</React.Fragment>
	);
};

export default HomePage;
