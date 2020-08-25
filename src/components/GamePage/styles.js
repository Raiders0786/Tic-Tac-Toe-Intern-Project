import styled from "styled-components";

export const Container = styled("div")`
	width: 100%;
	height: 100%;
	overflow-y: auto;
	background-color: #7f53ac;
	background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
	background-size: 300% 100%;
	transition: background-position 0.7s;
	background-position: ${props => {
		if (props.turn === 1) return "0% 50%";
		if (props.turn === 2) return "100% 50%";
		if (props.turn === 0) return "50% 50%";
	}};
`;

export const Board = styled("div")`
	width: 100%;
	height: 90%;
	padding: 1%;
	display: grid;
	grid-template:
		repeat(${props => props.size}, ${props => 100 / props.size}%) /
		repeat(${props => props.size}, ${props => 100 / props.size}%);
	grid-template-areas: ${props => {
		return new Array(props.size)
			.fill(null)
			.map(
				(_, i) =>
					"'" +
					new Array(props.size)
						.fill(null)
						.map((_, j) => `p${i}${j}`)
						.join(" ") +
					"'"
			)
			.join(" ");
	}};
`;

export const BoardItem = styled("div")`
	width: 40px;
	height: 40px;
	margin: auto;
	padding: 0.2%;
	border-radius: 10%;
	grid-area: ${props => props.area};
	display: flex;
	justify-content: center;
	align-items: center;

	${[
		[800, 36],
		[700, 32],
		[600, 28],
		[500, 24],
		[400, 20],
	].map(
		el => `
      @media(max-width: ${el[0]}px) {
			width: ${el[1]}px;
			height: ${el[1]}px;
      }
   `
	)}
`;

export const Blob = styled("div")`
	width: 100%;
	height: 100%;
	user-select: none;
	border-radius: 50%;
	background: linear-gradient(
		124deg,
		#ff2400,
		#e81d1d,
		#e8b71d,
		#e3e81d,
		#1de840,
		#1ddde8,
		#2b1de8,
		#dd00f3,
		#dd00f3
	);

	background-size: 400% 400%;
	transition: background-position 0.7s, transform 0.3s;

	cursor: ${props => (props.dir !== null ? "crosshair" : "pointer")};
	background-position: ${props => {
		if (props.dir === 0) return "50% 50%";
		if (props.dir === 1) return "90% 90%";
		if (props.dir === 2) return "0% 0%";
		else return "25% 25%";
	}};

	box-shadow: 1px 1px 5px 2px rgba(56, 56, 56, 0.6)
		${props => (props.dir !== null ? "inset" : "")};

	&:hover {
		transform: ${props =>
			props.dir !== null ? "scale(1.0)" : "scale(1.2) rotateZ(90deg)"};
	}
`;
