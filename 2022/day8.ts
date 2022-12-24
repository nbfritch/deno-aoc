const input = (await Deno.readTextFile("inputs/2022/day8")).split("\n").filter(x => x.length > 0).map(row => [...row].map(c =>parseInt(c)))

console.log(input)