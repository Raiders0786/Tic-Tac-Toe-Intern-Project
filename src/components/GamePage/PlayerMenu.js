import React from "react";
import { Menu, Icon, Button } from "semantic-ui-react";

import { playerKey } from "../../services/gameConstants";

const PlayerMenu = props => (
	<Menu pointing inverted widths={3} size='mini' color='grey'>
		<Menu.Item fitted active={props.currentPlayer === playerKey.P1}>
			<Icon name={props.p1Details.icon} color='teal' />
			{props.p1Details.name}
		</Menu.Item>
		<Menu.Item fitted active={props.currentPlayer === playerKey.P2}>
			<Icon name={props.p2Details.icon} color='orange' />
			{props.p2Details.name}
		</Menu.Item>
		<Menu.Item fitted>
			<Button
				fluid
				negative
				icon='eject'
				content='Forfeit'
				onClick={props.openConfirmation}
			/>
		</Menu.Item>
	</Menu>
);
export default PlayerMenu;
