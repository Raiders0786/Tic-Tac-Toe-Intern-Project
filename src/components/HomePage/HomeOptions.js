import React from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Icon, Divider, Button } from "semantic-ui-react";

import { GridItem } from "./style";

const HomeOptions = props => (
	<GridItem area={props.area} as={Segment} color='purple' raised>
		<Header as='h2'>
			<Icon name='setting' loading />
			<Header.Content>
				{props.header}
				<Header.Subheader>{props.subheader}</Header.Subheader>
			</Header.Content>
		</Header>
		<Divider section horizontal>
			<Icon name='tag' />
			{props.divider}
		</Divider>
		{props.buttons.map((btn, index) => (
			<React.Fragment key={index}>
				{btn.isLink ? (
					<Button
						fluid
						as={Link}
						to={btn.handleEvent}
						color={btn.color}
						icon={btn.icon}
						content={btn.content}
						labelPosition='left'
					/>
				) : (
					<Button
						fluid
						color={btn.color}
						icon={btn.icon}
						content={btn.content}
						labelPosition='left'
						onClick={btn.handleEvent}
					/>
				)}
				<br />
			</React.Fragment>
		))}
	</GridItem>
);
export default HomeOptions;
