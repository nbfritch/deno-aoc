enum Op {
  Acc,
  Jmp,
  Nop,
}

const strToOp = (s: string): Op => {
  switch (s) {
    case 'acc':
      return Op.Acc;
    case 'jmp':
      return Op.Jmp;
    case 'nop':
      return Op.Nop;
    default:
      throw new Error(`Invalid instruction ${s}`);
  }
};

interface Instruction {
  opcode: Op;
  value: number;
}

const puzzle: Array<Instruction> = (await Deno.readTextFile('inputs/2020/day8'))
  .split('\n').filter((line) => line.length > 0).map((line) => {
    const [opcode, value] = line.split(' ');
    return { opcode: strToOp(opcode), value: parseInt(value) };
  });

const part1 = (input: Array<Instruction>) => {
  let pc = 0;
  let acc = 0;
  let visited_addresses = [];
  while (true) {
    const toExec = input[pc];
    visited_addresses.push(pc);
    let nextAcc = acc;
    let nextPc = pc;
    switch (toExec.opcode) {
      case Op.Acc:
        nextAcc = acc + toExec.value;
        nextPc = pc + 1;
        break;
      case Op.Jmp:
        nextPc = pc + toExec.value;
        break;
      case Op.Nop:
        nextPc = pc + 1;
    }

    if (visited_addresses.includes(nextPc)) {
      return nextAcc;
    }

    pc = nextPc;
    acc = nextAcc;
  }
};

const speculate = (
  instruction: Instruction,
  instructions: Array<Instruction>,
  accIn: number,
  pcIn: number,
): boolean => {
  let pc = pcIn;
  let acc = accIn;
  let localAddresses = [];

  while (true) {
    const toExec = pc === pcIn ? instruction : instructions[pc];
    localAddresses.push(pc);
    let nextAcc = acc;
    let nextPc = pc;
    switch (toExec.opcode) {
      case Op.Acc:
        nextAcc = acc + toExec.value;
        nextPc = pc + 1;
        break;
      case Op.Jmp:
        nextPc = pc + toExec.value;
        break;
      case Op.Nop:
        nextPc = pc + 1;
        break;
    }

    if (nextPc === instructions.length) {
      return true;
    }

    if (localAddresses.includes(nextPc)) {
      return false;
    }

    acc = nextAcc;
    pc = nextPc;
  }
};

const part2 = (input: Array<Instruction>): number => {
  let pc = 0;
  let acc = 0;
  let runUntilComplete = false;
  let visitedAddresses = [];
  while (true) {
    const toExec = input[pc];
    visitedAddresses.push(pc);
    let nextAcc = acc;
    let nextPc = pc;
    switch (toExec.opcode) {
      case Op.Acc:
        nextAcc = acc + toExec.value;
        nextPc = pc + 1;
        break;
      case Op.Jmp:
        if (!runUntilComplete) {
          const speculateResult = speculate(
            { ...toExec, opcode: Op.Nop },
            input,
            acc,
            pc,
          );
          runUntilComplete = speculateResult;
          if (speculateResult) {
            nextPc = pc + 1;
            break;
          }
        }
        nextPc = pc + toExec.value;
        break;
      case Op.Nop:
        if (!runUntilComplete) {
          const speculateResult = speculate(
            { ...toExec, opcode: Op.Jmp },
            input,
            acc,
            pc,
          );
          runUntilComplete = speculateResult;
          if (speculateResult) {
            nextPc = pc + toExec.value;
            break;
          }
        }
        nextPc = pc + 1;
        break;
    }

    if (nextPc === input.length) {
      return nextAcc;
    }

    if (visitedAddresses.includes(nextPc)) {
      return nextAcc;
    }

    pc = nextPc;
    acc = nextAcc;
  }
};

console.log(`2020-8-1: ${part1(puzzle)}`);
console.log(`2020-8-2: ${part2(puzzle)}`);
