import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const Navbar = ({ location: { pathname } }) => {
	console.log("Current URL Path :\t" + pathname);
	if (pathname.startsWith("/game")) return null;
	return (
		<Menu pointing secondary>
			<Menu.Item as={Link} to='/' name='Home' active={pathname === "/"} />
			<Menu.Item
				as={Link}
				to='/leaderboard'
				name='Leader Board'
				active={pathname === "/leaderboard"}
			/>
			<Menu.Menu position='right'>
				<Menu.Item
					as={Link}
					to='/register'
					name='Sign Up'
					active={pathname === "/register"}
				/>
			</Menu.Menu>
		</Menu>
	);
};

export default withRouter(Navbar);
