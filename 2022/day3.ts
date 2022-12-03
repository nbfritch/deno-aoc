const groups = (await Deno.readTextFile('inputs/2022/day3')).split('\n').filter(
  (line) => line.length > 0,
);

const puzzle1 = groups.map(
  (line) => [
    new Set(line.slice(0, line.length / 2)),
    new Set(line.slice(line.length / 2, line.length)),
  ],
);

const itemPriorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const priority = (item: string) => itemPriorities.indexOf(item) + 1;

const part1 = (input: Array<Array<Set<string>>>): number => {
  return input.map(([first, second]) => {
    const intersection: Set<string> = new Set(
      [...first].filter((x) => second.has(x)),
    );
    if (intersection.size === 1) {
      return priority([...intersection][0]);
    } else {
      throw new Error(`Got intersection.size == ${intersection.size}`);
    }
  }).reduce((acc, i) => acc + i);
};

function intersect<T>(s1: Set<T>, s2: Set<T>): Set<T> {
  return new Set([...s1].filter((x) => s2.has(x)));
}

const part2 = (input: Array<string>): number => {
  const priorities = [];
  for (let idx = 0; idx < input.length / 3; idx++) {
    const i = idx * 3;
    const first = new Set(input[i]);
    const second = new Set(input[i + 1]);
    const third = new Set(input[i + 2]);
    const intersection = intersect(first, intersect(second, third));
    if ([...intersection].length === 1) {
      priorities.push(priority([...intersection][0]));
    } else {
      console.log(idx, intersection);
      throw new Error(`Got intersection.size == ${intersection.size}`);
    }
  }

  return priorities.reduce((acc, i) => acc + i);
};

console.log(`2022-3-1: ${part1(puzzle1)}`);

console.log(`2022-3-2: ${part2(groups)}`);
