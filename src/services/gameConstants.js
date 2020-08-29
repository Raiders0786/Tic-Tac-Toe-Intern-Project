import immer from "immer";

export const minBoardSize = 3;
export const maxBoardSize = 8;
export const startBoardSize = Math.floor((minBoardSize + maxBoardSize) / 2);

export const playerKey = Object.freeze({
	P1: 1,
	P2: 2,
	NONE: null,
});
export const winKey = Object.freeze({
	DRAW: 0,
	P1: 1,
	P2: 2,
	NONE: null,
});
export const boardKey = Object.freeze({
	MARK: 0,
	P1: 1,
	P2: 2,
	EMPTY: null,
});

export const checkBoardCell = cell => {
	if (cell === playerKey.P1 || cell === playerKey.P2) return true;
	return false;
};

export const getNextPlayer = player => {
	if (player === playerKey.P1) return playerKey.P2;
	if (player === playerKey.P2) return playerKey.P1;
	return playerKey.NONE;
};

export const checkGridSize = size => {
	if (size < minBoardSize || size > maxBoardSize || Math.floor(size) !== size)
		return false;
	return true;
};

export const getWinnerText = (winner, P1, P2) => {
	if (winner === winKey.P1) return `${P1.name} has Won`;
	if (winner === winKey.P2) return `${P2.name} has Won`;
	if (winner === winKey.DRAW) return "It is a Tie";
	if (winner === winKey.NONE) return "NONE";
};

export const computeResults = async (winner, P1, P2) => {
	if (winner === winKey.NONE) return;
	const p1Change = winner === winKey.P1 ? 2 : winner === winKey.P2 ? -1 : 1;
	const p2Change = winner === winKey.P2 ? 2 : winner === winKey.P1 ? -1 : 1;

	await crudCrud.put(
		`/user/${P1._id}`,
		immer(P1, draft => {
			delete draft._id;
			draft.score += p1Change;
		})
	);
	await crudCrud.put(
		`/user/${P2._id}`,
		immer(P2, draft => {
			delete draft._id;
			draft.score += p2Change;
		})
	);
};
