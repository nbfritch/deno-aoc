const score = (game: string): number => {
    switch (game) {
        case "A X":
            return 4;
        case "A Y":
            return 8;
        case "A Z":
            return 3
        case "B X":
            return 1;
        case "B Y":
            return 5;
        case "B Z":
            return 9;
        case "C X":
            return 7;
        case "C Y":
            return 2;
        case "C Z":
            return 6;
    }

    return 0;
};

const puzzle = (await Deno.readTextFile("inputs/2022/day2")).split("\n")

const part1 = (input: Array<string>) => input.map(line => score(line)).reduce((acc, i) => acc + i);

const score2 = (game: string): number => {
    switch (game) { // r 1, p 2, s 3
        // x lose, y tie, z win
        // x =1 y = 2 z = 3
        case "A X":
            return 3;
        case "A Y":
            return 4;
        case "A Z":
            return 8
        case "B X":
            return 1;
        case "B Y":
            return 5;
        case "B Z":
            return 9;
        case "C X":
            return 2;
        case "C Y":
            return 6;
        case "C Z":
            return 7;
    }

    return 0;
};

const part2 = (input: Array<string>) => input.map(line => score2(line)).reduce((acc, i) => acc + i);

console.log(`2022-1-1: ${part1(puzzle)}`);
console.log(`2022-1-2: ${part2(puzzle)}`);
