const puzzle = (await Deno.readTextFile('inputs/2020/day5')).split('\n').filter(
  (x) => x.length > 1,
);

const part1 = (input: Array<string>): number => {
  return input.map((l) =>
    parseInt(
      l.replaceAll('L', '0').replaceAll('R', '1').replaceAll('F', '0')
        .replaceAll('B', '1'),
      2,
    )
  ).sort((a, b) => b - a)[0];
};

const getSum = (): number => {
  let x = 0;
  for (let i = 68; i < 971; i++) {
    x = x + i;
  }
  return x;
};

const part2 = (input: Array<string>): number => {
  const sum = getSum();
  return sum -
    input.map((l) =>
      parseInt(
        l.replaceAll('L', '0').replaceAll('R', '1').replaceAll('F', '0')
          .replaceAll('B', '1'),
        2,
      )
    ).reduce((acc, i) => acc + i);
};

console.log(`2020-5-1: ${part1(puzzle)}`);
console.log(`2020-5-2: ${part2(puzzle)}`);
