import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownMenu = ({ handleChange, options, placeholder, value }) => (
	<Dropdown
		fluid
		selection
		value={value}
		options={options}
		placeholder={placeholder}
		onChange={handleChange}
	/>
);

export default DropdownMenu;
