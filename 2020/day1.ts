const inputFile = 'inputs/2020/day1';

const year = 2020;

const input = (await Deno.readTextFile(inputFile)).split('\n').filter((x) =>
  x.length > 0
).map((line) => parseInt(line)).sort((a, b) => (a - b));

const part1 = (puzzle: Array<number>): number => {
  const value = puzzle.find((num) => puzzle.includes(year - num)) ?? 0;
  return (year - value) * value;
};

const part2 = (puzzle: Array<number>): number => {
  for (const n1 of puzzle) {
    for (const n2 of puzzle) {
      if (puzzle.includes(year - (n1 + n2))) {
        return n1 * n2 * (year - n1 - n2);
      }
    }
  }

  return -1;
};

console.log(`2020-1-1 ${part1(input)}`);
console.log(`2020-1-2 ${part2(input)}`);
