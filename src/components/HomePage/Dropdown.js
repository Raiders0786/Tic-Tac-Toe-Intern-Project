import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownMenu = props => (
	<Dropdown
		fluid
		selection
		value={props.value}
		options={props.options}
		placeholder={props.placeholder}
		onChange={props.handleChange}
	/>
);

export default DropdownMenu;
