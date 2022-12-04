const puzzle = (await Deno.readTextFile('inputs/2020/day9')).split('\n').filter(
  (x) => x.length > 0,
).map((x) => parseInt(x));

const isSumOf = (values: Array<number>, value: number): boolean => {
  return values.find((x) => values.includes(value - x)) != null;
};

const part1 = (input: Array<number>): number => {
  for (let i = 0; i < input.length; i++) {
    const comparisons = input.slice(i, i + 25);
    const testValue = input[i + 25];
    if (!isSumOf(comparisons, testValue)) {
      return testValue;
    }
  }

  return -1;
};

const part1Result = part1(puzzle);

const part2 = (input: Array<number>, invalid: number): number => {
  const minAmount = 2;
  for (let i = 0; i < input.length; i++) {
    let compareAmount = minAmount;
    let comparisons = input.slice(i, i + compareAmount);
    let sum = comparisons.reduce((acc, i) => acc + i);
    while (sum < invalid && compareAmount + i < input.length) {
      compareAmount += 1;
      comparisons = input.slice(i, i + compareAmount);
      sum = comparisons.reduce((acc, i) => acc + i);
    }
    if (sum == invalid) {
      const sortedComp = comparisons.sort((a, b) => a - b);
      return sortedComp[0] + sortedComp[sortedComp.length - 1];
    }
  }

  return -1;
};

console.log(`2020-9-1: ${part1Result}`);
console.log(`2020-9-2: ${part2(puzzle, part1Result)}`);
