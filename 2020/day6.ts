const puzzle = (await Deno.readTextFile("inputs/2020/day6")).split("\n\n").filter(x => x.length > 0).map(chunk => chunk.split("\n").map(z => new Set(z)));

function intersect<T>(s1: Set<T>, s2: Set<T>): Set<T> {
    return new Set([...s1].filter(x => s2.has(x)));
}

const part1 = (input: Array<Array<Set<string>>>): number => {
    return input.map(
        line => [...line.reduce((acc, row) => new Set([...acc, ...row]))].length
    ).reduce((acc, i) => acc + i);
}

const part2 = (input: Array<Array<Set<string>>>): number => {
    return input.map(
        line => [...line.reduce((acc, row) => intersect(acc, row))].length
    ).reduce((acc, i) => acc + i, 1);
}

console.log(`2020-6-1: ${part1(puzzle)}`);
console.log(`2020-6-2: ${part2(puzzle)}`);