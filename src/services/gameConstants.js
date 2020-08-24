export const allowedSizes = [3, 4, 5, 6, 7, 8].map(el => ({
	key: el,
	text: el,
	value: el,
}));

export const minBoardSize = 3;
export const maxBoardSize = 8;
export const startBoardSize = Math.floor((minBoardSize + maxBoardSize) / 2);
