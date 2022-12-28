const input = (await Deno.readTextFile('inputs/2022/day8'))
  .split('\n')
  .filter((x) => x.length > 0)
  .map((row) => [...row].map((c) => parseInt(c)));

const setValue = (
  puzzle: Array<Array<boolean | null>>,
  ix: number,
  iy: number,
  value: boolean,
) => {
  if (
    puzzle[iy][ix] !== true && ix != 0 && iy != 0 &&
    ix != puzzle[iy].length - 1 && iy != puzzle.length - 1
  ) {
    puzzle[iy][ix] = value;
  }
};

const part1 = (puzzle: Array<Array<number>>): number => {
  const visibilityMap: Array<Array<boolean | null>> = puzzle.map((row) =>
    row.map((_cell) => null)
  );

  // Left to Right
  for (let iy = 0; iy < puzzle.length; iy++) {
    let maxSeenInRow = 0;
    for (let ix = 0; ix < puzzle[iy].length; ix++) {
      if (puzzle[iy][ix] > maxSeenInRow) {
        maxSeenInRow = puzzle[iy][ix];
        setValue(visibilityMap, ix, iy, true);
      } else {
        setValue(visibilityMap, ix, iy, false);
      }
    }

    maxSeenInRow = 0;
    for (let ix = puzzle[iy].length - 1; ix >= 0; ix--) {
      if (puzzle[iy][ix] > maxSeenInRow) {
        maxSeenInRow = puzzle[iy][ix];
        setValue(visibilityMap, ix, iy, true);
      } else {
        setValue(visibilityMap, ix, iy, false);
      }
    }
  }

  // Top to Bottom
  for (let ix = 0; ix < puzzle[0].length; ix++) {
    let maxSeenInRow = 0;
    for (let iy = puzzle.length - 1; iy >= 0; iy--) {
      if (puzzle[iy][ix] > maxSeenInRow) {
        maxSeenInRow = puzzle[iy][ix];
        setValue(visibilityMap, ix, iy, true);
      } else {
        setValue(visibilityMap, ix, iy, false);
      }
    }

    maxSeenInRow = 0;
    for (let iy = 0; iy < puzzle.length - 1; iy++) {
      if (puzzle[iy][ix] > maxSeenInRow) {
        maxSeenInRow = puzzle[iy][ix];
        setValue(visibilityMap, ix, iy, true);
      } else {
        setValue(visibilityMap, ix, iy, false);
      }
    }
  }

  let visibleCount = 0;
  for (let row of visibilityMap) {
    for (let cell of row) {
      if (cell === null || cell === true) {
        visibleCount++;
      }
    }
  }

  return visibleCount;
};

const searchVectors: Array<[number, number]> = [[1, 0], [-1, 0], [0, 1], [
  0,
  -1,
]];

const search = (
  puzzle: Array<Array<number>>,
  [dx, dy]: [number, number],
  [x, y]: [number, number],
  value: number,
): number => {
  let [nx, ny] = [x, y];
  let c = 0;
  while (true) {
    [nx, ny] = [nx + dx, ny + dy];
    if (nx >= 0 && ny >= 0 && nx < puzzle.length && ny < puzzle.length) {
      c++;
      if (puzzle[ny][nx] >= value) break;
    } else {
      break;
    }
  }
  return c;
};

const calculateScore = (
  puzzle: Array<Array<number>>,
  ix: number,
  iy: number,
): number => {
  return searchVectors.map((vec) =>
    search(puzzle, vec, [ix, iy], puzzle[iy][ix])
  ).reduce((acc, i) => acc * i, 1);
};

const part2 = (puzzle: Array<Array<number>>): number => {
  let highestScore = 0;
  for (let iy = 0; iy < puzzle.length; iy++) {
    for (let ix = 0; ix < puzzle[iy].length; ix++) {
      const cellScore = calculateScore(puzzle, ix, iy);
      if (cellScore > highestScore) {
        highestScore = cellScore;
      }
    }
  }
  return highestScore;
};

console.log(`2022-8-1: ${part1(input)}`);
console.log(`2022-8-2: ${part2(input)}`);
