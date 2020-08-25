export const minBoardSize = 3;
export const maxBoardSize = 8;
export const startBoardSize = Math.floor((minBoardSize + maxBoardSize) / 2);

export const playerStatus = Object.freeze({
	P1: 1,
	P2: 2,
	NONE: null,
});
export const winStatus = Object.freeze({
	DRAW: 0,
	P1: 1,
	P2: 2,
	NONE: null,
});
export const boardStatus = Object.freeze({
	MARK: 0,
	P1: 1,
	P2: 2,
	EMPTY: null,
});

export const checkBoardCell = cell => {
	if (cell === playerStatus.P1 || cell === playerStatus.P2) return true;
	return false;
};

export const getNextPlayer = player => {
	if (player === playerStatus.P1) return playerStatus.P2;
	if (player === playerStatus.P2) return playerStatus.P1;
	return playerStatus.NONE;
};
