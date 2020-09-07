import React from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Icon, Divider, Button } from "semantic-ui-react";

import { GridItem } from "./style";

const HomeOptions = ({ area, header, subheader, divider, buttons }) => {
	return (
		<GridItem area={area} as={Segment} color='purple' raised>
			<Header as='h2'>
				<Icon name='setting' loading />
				<Header.Content>
					{header}
					<Header.Subheader>{subheader}</Header.Subheader>
				</Header.Content>
			</Header>
			<Divider section horizontal>
				<Icon name='tag' />
				{divider}
			</Divider>
			{buttons.map((btn, index) =>
				btn.isLink ? (
					<React.Fragment key={index}>
						<Button
							fluid
							as={Link}
							to={btn.handleEvent}
							color={btn.color}
							icon={btn.icon}
							content={btn.content}
							labelPosition='left'
						/>
						<br />
					</React.Fragment>
				) : (
					<React.Fragment key={index}>
						<Button
							fluid
							color={btn.color}
							icon={btn.icon}
							content={btn.content}
							labelPosition='left'
							onClick={btn.handleEvent}
						/>
						<br />
					</React.Fragment>
				)
			)}
		</GridItem>
	);
};
export default HomeOptions;
