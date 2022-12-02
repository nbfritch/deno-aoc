const puzzle = (await Deno.readTextFile('inputs/2022/day1')).split('\n\n')
  .filter((x) => x.length > 0).map((line) =>
    line.split('\n').flatMap((x) => x.length > 0 ? [parseInt(x)] : [])
  );

const part1 = (puzzle: Array<Array<number>>): number => {
  return puzzle.map((x) => x.reduce((acc, i) => acc + i), 0).sort((a, b) =>
    b - a
  )[0];
};

const part2 = (puzzle: Array<Array<number>>) => {
  return puzzle.map((x) => x.reduce((acc, i) => acc + i), 0).sort((a, b) =>
    b - a
  ).slice(0, 3).reduce((acc, i) => acc + i);
};

console.log(`2022-1-1 ${part1(puzzle)}`);
console.log(`2022-1-2 ${part2(puzzle)}`);
