const [startingPosition, rawInstructions] =
  (await Deno.readTextFile('inputs/2022/day5')).split('\n\n');

const startingRows = startingPosition.split('\n');
const legend = startingRows[startingRows.length - 1];
const legendValues = legend.split(' ').filter((x) => x.length > 0).map((x) =>
  parseInt(x)
);
const posOfRow: Record<string, number> = legendValues.reduce((acc, i) => {
  return { ...acc, [i]: legend.indexOf(`${i}`) };
}, {});
let rows: Array<Array<string>> = Object.keys(posOfRow).map((_) => []);
startingRows.slice(0, startingRows.length - 1).forEach((row) => {
  legendValues.forEach((l) => {
    if (row[posOfRow[l - 1]] != ' ') {
      rows[l - 1].unshift(row[posOfRow[l - 1]]);
    }
  });
});

interface Instruction {
    from: number,
    to: number,
    count: number,
}

const instructions: Array<Instruction> = rawInstructions
    .split("\n")
    .map(x =>
        x
        .replaceAll("move ", ":")
        .replaceAll(" from ", ":")
        .replaceAll(" to ", ":")
        .split(":")
        .map(y => parseInt(y)))
    .map(x => ({from: x[0], to: x[1], count: x[2]}));
