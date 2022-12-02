const inputFile = 'inputs/2020/day3';

const input = (await Deno.readTextFile(inputFile)).split('\n').filter((x) =>
  x.length > 0
);

const part1 = (puzzle: Array<string>): number => {
  const vec = [3, 1];
  return puzzle.reduce(([c, ix, iy], line) => {
    return [
      c + (line[ix % line.length] === '#' ? 1 : 0),
      ix + vec[0],
      iy + vec[1],
    ];
  }, [0, 0, 0])[0];
};

const part2 = (puzzle: Array<string>) => {
  const testVectors = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  return testVectors.map((vec) =>
    puzzle.reduce(([c, ix], line, idx) => {
      return [
        c + (idx % vec[1] == 0 && line[ix % line.length] === '#' ? 1 : 0),
        ix + vec[0],
      ];
    }, [0, 0])[0]
  ).reduce((acc, i) => acc * i, 1);
};

console.log(`2020-3-1 ${part1(input)}`);
console.log(`2020-3-2 ${part2(input)}`);
