const requiredFields = ['ecl', 'hcl', 'byr', 'iyr', 'eyr', 'pid', 'hgt'];

const input = (await Deno.readTextFile('inputs/2020/day4')).split('\n\n').map(
  (chunk) =>
    chunk.replaceAll('\n', ' ').split(' ').filter((x) => x.trim().length > 0),
);

const part1 = (puzzle: Array<Array<string>>): number => {
  return puzzle.map((pass) =>
    requiredFields.every((r) => pass.some((p) => p.includes(r)))
  ).filter((x) => x == true).length;
};

const validate = (field: string): boolean => {
  const [tag, value] = field.split(':');
  switch (tag) {
    case 'byr':
      const byear = parseInt(value);
      return byear >= 1920 && byear <= 2002;
    case 'iyr':
      const iyear = parseInt(value);
      return iyear >= 2010 && iyear <= 2020;
    case 'eyr':
      const eyear = parseInt(value);
      return eyear >= 2020 && eyear <= 2030;
    case 'cid':
      return true;
    case 'ecl':
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
    case 'hcl':
      const validChars = '0123456789abcdef';
      return value.length === 7 && value.charAt(0) === '#' &&
        [...value.slice(1)].every((c) => validChars.includes(c));
    case 'pid':
      return value.length === 9;
    case 'hgt':
      if (value.includes('cm')) {
        const cm = parseInt(value.replace('cm', ''));
        return cm >= 150 && cm <= 193;
      } else {
        const inc = parseInt(value.replace('in', ''));
        return inc >= 59 && inc <= 76;
      }
    default:
      return false;
  }
};

const part2 = (puzzle: Array<Array<string>>): number => {
  return puzzle.filter((line) => {
    if (requiredFields.every((r) => line.some((field) => field.includes(r)))) {
      return line.every((field) => validate(field));
    } else {
      return false;
    }
  }).length;
};

console.log(`2020-4-1 ${part1(input)}`);
console.log(`2020-4-2 ${part2(input)}`);
