const input = await Deno.readTextFile('inputs/2022/day6');

const part1 = (puzzle: string): number => {
  for (let i = 0; i < puzzle.length; i++) {
    const chars = new Set([...puzzle.slice(i, i + 4)]);
    if (chars.size === 4) {
      console.log(chars);
      return i + 4;
    }
  }

  return -1;
};

const part2 = (puzzle: string): number => {
  for (let i = 0; i < puzzle.length; i++) {
    const chars = new Set([...puzzle.slice(i, i + 14)]);
    if (chars.size === 14) {
      console.log(chars);
      return i + 14;
    }
  }

  return -1;
};

console.log(`2022-6-1: ${part1(input)}`);

console.log(`2022-6-2: ${part2(input)}`);
