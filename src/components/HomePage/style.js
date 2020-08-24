import styled from "styled-components";

export const StyledGrid = styled("div")`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: repeat(10, 1fr);
	grid-template-columns: repeat(10, 1fr);
	grid-template-areas:
		"1 1 1 1 1 1 1 1 1 1"
		"1 1 1 1 1 1 1 1 1 1"
		"2 2 2 a a a a a 3 3"
		"2 2 2 a a a a a 3 3"
		"2 2 2 a a a a a 3 3"
		"2 2 2 a a a a a 3 3"
		"2 2 2 a a a a a 3 3"
		"2 2 2 a a a a a 3 3"
		"2 2 2 a a a a a 3 3"
		"4 4 4 4 4 4 4 4 4 4";

	@media (max-width: 800px) {
		grid-template-areas:
			"1 1 1 1 1 1 1 1 1 1"
			"2 a a a a a a a a 3"
			"2 a a a a a a a a 3"
			"2 a a a a a a a a 3"
			"2 a a a a a a a a 3"
			"2 a a a a a a a a 3"
			"2 a a a a a a a a 3"
			"2 a a a a a a a a 3"
			"2 a a a a a a a a 3"
			"4 4 4 4 4 4 4 4 4 4";
	}

	@media (max-width: 500px) {
		grid-template-columns: repeat(10, 1fr);
		grid-template-columns: repeat(1, 1fr);
		grid-template-areas: "1" "a" "a" "a" "a" "a" "a" "a" "a" "2";
	}
`;

export const GridItem = styled("div")`
	grid-area: ${props => props.area};
	text-align: center;
`;
