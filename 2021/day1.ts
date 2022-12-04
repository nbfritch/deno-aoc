const puzzle = (await Deno.readTextFile('inputs/2021/day1')).split('\n').filter(
  (x) => x.length > 0,
).map((x) => parseInt(x));

const part1 = (input: Array<number>): number => {
  let c = 0;
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i + 1] - input[i] > 0) {
      c = c + 1;
    }
  }
  return c;
};

const part2 = (input: Array<number>): number => {
  let c = 0;
  for (let i = 0; i < input.length - 2; i++) {
    const lower3 = input[i] + input[i + 1] + input[i + 2];
    const upper3 = input[i + 1] + input[i + 2] + input[i + 3];
    if (upper3 - lower3 > 0) {
      c = c + 1;
    }
  }
  return c;
};

console.log(`2021-1-1: ${part1(puzzle)}`);
console.log(`2021-1-2: ${part2(puzzle)}`);
