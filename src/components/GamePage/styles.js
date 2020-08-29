import styled from "styled-components";

import { boardKey, playerKey } from "../../services/gameConstants";

export const Container = styled("div")`
	width: 100%;
	height: 100%;
	overflow-y: auto;
	background-color: #7f53ac;
	background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
	background-size: 300% 100%;
	transition: background-position 1.1s;
	background-position: ${props => {
		if (props.turn === playerKey.P1) return "0% 50%";
		if (props.turn === playerKey.P2) return "100% 50%";
		if (props.turn === playerKey.NONE) return "50% 50%";
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
	grid-template-areas: ${props =>
		new Array(props.size)
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
			.join(" ")};
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
		135deg,
		#ff2400cc,
		#e81d1dcc,
		#e8b71dcc,
		#e3e81dcc,
		#1de840cc,
		#1ddde8cc,
		#2b1de8cc,
		#dd00f3cc,
		#dd00f3cc
	);

	background-size: 400% 400%;
	transition: background-position 0.7s, transform 0.4s;

	cursor: ${props => (props.cell === boardKey.EMPTY ? "pointer" : "crosshair")};
	background-position: ${props => {
		if (props.cell === boardKey.MARK) return "50% 50%";
		if (props.cell === boardKey.P1) return "90% 90%";
		if (props.cell === boardKey.P2) return "0% 0%";
		return "25% 25%";
	}};

	box-shadow: 1px 1px 5px 2px rgba(56, 56, 56, 0.6)
		${props => (props.cell === boardKey.EMPTY ? "" : "inset")};

	&:hover {
		transform: ${props =>
			props.cell === boardKey.EMPTY ? "scale(1.3) rotateZ(90deg)" : "scale(1.0)"};
	}
	&:active {
		box-shadow: 1px 1px 5px 2px rgba(56, 56, 56, 0.6) inset;
		transform: scale(1.1) rotateZ(180deg);
	}
`;
