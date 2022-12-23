const [startingPosition, rawInstructions] =
  (await Deno.readTextFile('inputs/2022/day5')).split('\n\n');

const startingRows = startingPosition.split('\n');
const legend = startingRows[startingRows.length - 1];
const legendValues = legend.split(' ').filter((x) => x.length > 0).map((x) =>
  parseInt(x)
);
const posOfRow: Record<string, number> = legendValues.reduce(
  (acc, i) => ({ ...acc, [i]: legend.indexOf(`${i}`) }),
  {},
);
let rows: Array<Array<string>> = Object.keys(posOfRow).map((_) => []);
startingRows.slice(0, startingRows.length - 1).forEach((row) => {
  legendValues.forEach((l) => {
    if (row[posOfRow[l]] != ' ') {
      rows[l - 1].push(row[posOfRow[l]]);
    }
  });
});

interface Instruction {
  from: number;
  to: number;
  count: number;
}

const instructions: Array<Instruction> = rawInstructions
  .split('\n')
  .map((x) =>
    x
      .replaceAll('move ', '')
      .replaceAll(' from ', ':')
      .replaceAll(' to ', ':')
      .split(':')
      .map((y) => parseInt(y))
  )
  .map((x) => ({ from: x[1], to: x[2], count: x[0] }));

const part1 = (
  instructions: Array<Instruction>,
  boxes: Array<Array<string>>,
): string => {
  const result = instructions.reduce(
    (acc: Array<Array<string>>, instr: Instruction): Array<Array<string>> => {
      for (let i = 0; i < instr.count; i++) {
        acc[instr.to - 1].unshift(acc[instr.from - 1].shift() ?? '');
      }
      return acc;
    },
    boxes,
  );

  return result.map((col) => col[0]).join('');
};

const part2 = (
  instructions: Array<Instruction>,
  boxes: Array<Array<string>>,
): string => {
  const result = instructions.reduce(
    (acc: Array<Array<string>>, instr: Instruction): Array<Array<string>> => {
      const multipleBoxes = [];
      for (let i = 0; i < instr.count; i++) {
        multipleBoxes.push(acc[instr.from - 1].shift() ?? '');
      }

      multipleBoxes.concat([]);
      acc[instr.to - 1] = multipleBoxes.concat(acc[instr.to - 1]);
      return acc;
    },
    boxes,
  );

  return result.map((col) => col[0]).join('');
};

const rowsCopy = rows.map((col) => col.map((s) => s));

console.log(
  `2022-5-1: ${part1(instructions, rows)}`,
);

console.log(
  `2022-5-2: ${part2(instructions, rowsCopy)}`,
);
