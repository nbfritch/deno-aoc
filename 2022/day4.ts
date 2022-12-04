const puzzle = (await Deno.readTextFile('inputs/2022/day4'))
  .split('\n')
  .filter((x) => x.length > 0)
  .map((line) =>
    line
      .split(',')
      .map((range) =>
        range
          .split('-')
          .map((rangeItem) => parseInt(rangeItem))
      )
  ) as Array<[[number, number], [number, number]]>;

const rangeContains = (
  [r1Start, r1End]: [number, number],
  [r2Start, r2End]: [number, number],
): boolean => {
  return (r1Start >= r2Start && r1End <= r2End) ||
    (r2Start >= r1Start && r2End <= r1End);
};

const between = (
  value: number,
  rangeStart: number,
  rangeEnd: number,
): boolean => {
  return (value >= rangeStart && value <= rangeEnd);
};

const overlap = (
  [r1Start, r1End]: [number, number],
  [r2Start, r2End]: [number, number],
): boolean => {
  return between(r1Start, r2Start, r2End) || between(r1End, r2Start, r2End) ||
    between(r2Start, r1Start, r1End) || between(r2End, r1Start, r1End);
};

const part1 = (input: Array<[[number, number], [number, number]]>): number => {
  return input.filter((ranges) => rangeContains(ranges[0], ranges[1])).length;
};

const part2 = (input: Array<[[number, number], [number, number]]>): number => {
  return input.filter((ranges) => overlap(ranges[0], ranges[1])).length;
};

console.log(
  `2022-4-1: ${part1(puzzle)}`,
);

console.log(
  `2022-4-2: ${part2(puzzle)}`,
);
