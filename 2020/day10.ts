const puzzle = (await Deno.readTextFile("inputs/2020/day10"))
  .split("\n")
  .flatMap(x => x.length > 0 ? [parseInt(x)] : [])
  .sort((a, b) => b - a);

const part1 = (input: Array<number>): number => {
  const diffs = [0, 1, 0, 1];
  for (let i = 0; i < input.length - 1; i++) {
    if (i == (input.length - 1)) {
      diffs[3] += 1;
    }

    const diff1 = input[i+1];
    const diff0 = input[i];
    diffs[Math.abs(diff1 - diff0)] += 1;
  }
  return diffs[1] * diffs[3]
}

let cache: Record<number, number> = {};
const findCombinations = (cend: number, highest: number, availible: Array<number>): number => {
  if (cend >= highest) {
    return 1;
  }

  let count = 0;
  for (let i = 1; i < 4; i++) {
    const s = cend + i;
    if (availible.includes(s)) {
      const remaining = availible.filter(a => a > s);
      if (!(s in cache)) {
        cache = {...cache, [s]: findCombinations(s, highest, remaining)}
      }
      count += cache[s];
    }
    console.log(count);
  }
  return count;
}

const part2 = (input: Array<number>): number => {
  const max = input.sort((a,b) => a - b)[input.length - 1];
  const inputSorted = [...input, max + 3].sort((a, b) => a - b);
  return findCombinations(0, max, inputSorted);
}

console.log(`2022-10-1: ${part1(puzzle)}`);
console.log(`2022-10-2: ${part2(puzzle)}`);