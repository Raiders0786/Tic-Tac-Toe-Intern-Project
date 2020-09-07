import React from "react";
import { Menu, Icon, Button } from "semantic-ui-react";

const PlayerMenu = ({ currentPlayer, p1Details, p2Details, openConfirmation }) => {
	return (
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
	);
};
export default PlayerMenu;
