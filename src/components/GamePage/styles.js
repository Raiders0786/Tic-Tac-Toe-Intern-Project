import styled from "styled-components";

export const Container = styled("div")`
	border: 1px solid black;
	width: 100%;
	height: 100%;
	padding: 10% 10%;

	${[
		[900, 9, 12],
		[800, 8, 14],
		[700, 7, 16],
		[600, 6, 18],
		[500, 5, 20],
		[400, 4, 22],
	].map(
		el => `
      @media(max-width: ${el[0]}px) {
         padding: ${el[2]}% ${el[1]}%;
      }
   `
	)}
`;

export const Grid = styled("div")`
	border: 1px dashed blue;
	background-color: #f0f0f0;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: repeat(${props => `${props.size}, ${100 / props.size}%`});
	grid-template-columns: repeat(${props => `${props.size}, ${100 / props.size}%`});
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

export const GridItem = styled("div")`
	width: 40px;
	height: 40px;
	margin: auto;
	padding: 2%;
	border-radius: 50%;
	grid-area: ${props => props.area};
	display: flex;
	justify-content: center;
	align-items: center;

	${[
		[800, 40],
		[700, 35],
		[600, 30],
		[500, 25],
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
		if (props.dir === 1) return "0% 0%";
		if (props.dir === 2) return "90% 90%";
		else return "25% 25%";
	}};

	box-shadow: 1px 1px 5px 2px rgba(56, 56, 56, 0.6)
		${props => (props.dir !== null ? "inset" : "")};

	&:hover {
		transform: ${props =>
			props.dir !== null ? "scale(1.0)" : "scale(1.2) rotateZ(90deg)"};
	}
`;
