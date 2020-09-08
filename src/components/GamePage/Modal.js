import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Header } from "semantic-ui-react";

const ReusableModal = props => (
	<Modal centered open={props.isOpen}>
		<Modal.Header>{props.header}</Modal.Header>
		<Modal.Content>
			<Modal.Description>
				<Header>{props.description}</Header>
				<p>{props.content}</p>
			</Modal.Description>
		</Modal.Content>
		<Modal.Actions>
			{props.buttons.map((btn, index) =>
				btn.isLink ? (
					<Button
						key={index}
						as={Link}
						to={btn.handleEvent}
						icon={btn.icon}
						color={btn.color}
					/>
				) : (
					<Button
						key={index}
						icon={btn.icon}
						color={btn.color}
						onClick={btn.handleEvent}
					/>
				)
			)}
		</Modal.Actions>
	</Modal>
);

export default ReusableModal;
