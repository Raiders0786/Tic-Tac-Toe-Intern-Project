import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Header } from "semantic-ui-react";

const ReusableModal = ({ isOpen, header, description, content, buttons }) => {
	return (
		<Modal centered open={isOpen}>
			<Modal.Header>{header}</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<Header>{description}</Header>
					<p>{content}</p>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				{buttons.map((btn, index) =>
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
};

export default ReusableModal;
