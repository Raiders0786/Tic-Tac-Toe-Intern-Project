export const createGrid = (n, val = null) => {
	const grid = new Array(n).fill(null);
	return grid.map(() => new Array(n).fill(val));
};

const transpose = prevGrid => {
	const grid = [];
	for (let i = 0; i < prevGrid.length; ++i) grid.push([]);

	for (let i = 0; i < prevGrid.length; ++i) {
		for (let j = 0; j < prevGrid[i].length; ++j) {
			grid[j].push(prevGrid[i][j]);
		}
	}
	return grid;
};

const diagonals = grid => {
	const diag1 = [];
	const diag2 = [];
	for (let i = 0; i < grid.length; ++i) {
		diag1[i] = grid[i][i];
		diag2[i] = grid[i][grid.length - 1 - i];
	}
	return { diag1, diag2 };
};

export const checkWinConndition = grid => {
	const size = grid.length;
	const tran = transpose(grid);
	const { diag1, diag2 } = diagonals(grid);

	for (let i = 0; i < size; ++i) {
		if (
			(grid[i][0] === 1 || grid[i][0] === 2) &&
			grid[i].every(el => el === grid[i][0])
		)
			return {
				winner: grid[i][0],
				positions: grid[i].map((_, j) => ({ x: i, y: j })),
			};

		if (
			(tran[i][0] === 1 || tran[i][0] === 2) &&
			tran[i].every(el => el === tran[i][0])
		)
			return {
				winner: tran[i][0],
				positions: tran[i].map((_, j) => ({ x: j, y: i })),
			};
	}

	if ((diag1[0] === 1 || diag1[0] === 2) && diag1.every(el => el === diag1[0]))
		return { winner: diag1[0], positions: diag1.map((_, i) => ({ x: i, y: i })) };

	if ((diag2[0] === 1 || diag2[0] === 2) && diag2.every(el => el === diag2[0]))
		return {
			winner: diag2[0],
			positions: diag2.map((_, i) => ({ x: i, y: size - 1 - i })),
		};

	if (grid.every(row => row.every(el => el !== null)))
		return { winner: 0, positions: [] };

	return { winner: null, positions: [] };
};
