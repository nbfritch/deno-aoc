const inputFile = 'inputs/2020/day2';

interface Password {
  min: number;
  max: number;
  char: string;
  pass: string;
}

const input = (await Deno.readTextFile(inputFile)).split('\n').filter((x) =>
  x.length > 0
).map((line) => {
  const parts = line.split(' ');
  const [minStr, maxStr] = parts[0].split('-');
  const min = parseInt(minStr);
  const max = parseInt(maxStr);
  const char = parts[1].replace(':', '');
  return {
    min,
    max,
    char,
    pass: parts[2],
  };
});

const part1 = (puzzle: Array<Password>): number => {
  return puzzle.filter((x) => {
    const charCount = x.pass.length - x.pass.replaceAll(x.char, '').length;
    return charCount >= x.min && charCount <= x.max;
  }).length;
};

const part2 = (puzzle: Array<Password>): number => {
  return puzzle.filter((x) => {
    const minMatch = x.pass[x.min - 1] == x.char;
    const maxMatch = x.pass[x.max - 1] == x.char;
    return (minMatch || maxMatch) && !(minMatch && maxMatch);
  }).length;
};

console.log(`2020-2-1 ${part1(input)}`);
console.log(`2020-2-2 ${part2(input)}`);
