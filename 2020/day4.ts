const requiredFields = ['ecl', 'hcl', 'byr', 'iyr', 'eyr', 'pid', 'hgt'];

const input = (await Deno.readTextFile('inputs/2020/day4')).split('\n\n').map(
  (line) => line.replace('\n', ' ').split(' ').filter((x) => x.length > 0),
);

const part1 = (puzzle: Array<Array<string>>): number => {
  return puzzle.map((pass) =>
    requiredFields.every((r) => pass.some((p) => p.includes(r)))
  ).filter((x) => x == true).length;
};

const part2 = (puzzle: Array<Array<string>>): number => {
  return 0;
};

console.log(`2020-4-1 ${part1(input)}`);
console.log(`2020-4-2 ${part2(input)}`);
