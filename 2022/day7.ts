const input = (await Deno.readTextFile('inputs/2022/day7')).split('\n');

interface Node {
  name: string;
  size: number;
  children: Array<Node>;
  parent: Node | null;
  isFile: boolean;
}

const sizeOfNode = (startNode: Node): number => {
  if (startNode.isFile) {
    return startNode.size;
  }
  return startNode.children.map((x) => sizeOfNode(x)).reduce(
    (acc, i) => acc + i,
    0,
  );
};

const walkTree = (root: Node): Array<{ name: string; size: number }> => {
  if (root.isFile) {
    return [];
  }
  const size = sizeOfNode(root);
  return [...root.children.flatMap((x) => walkTree(x)), {
    name: root.name,
    size,
  }];
};

const part1 = (puzzle: Array<string>): number => {
  const root = puzzle[0].replace('$ cd ', '');
  const rootNode: Node = {
    name: root,
    size: 0,
    children: [],
    parent: null,
    isFile: false,
  };
  let currentNode = rootNode;
  let indent = '-';
  for (let instruction of puzzle.slice(1)) {
    const parts = instruction.split(' ');
    if (parts[0] === '$') {
      if (parts[1] === 'cd') {
        if (parts[2] === '..') {
          indent = indent.slice(0, indent.length - 1);
          if (currentNode.parent == null) {
            throw new Error('Cannot cd \'..\' already at root');
          }

          currentNode = currentNode.parent;
        } else {
          indent = `${indent}-`;
          const childToChoose = currentNode.children.find((x) =>
            x.name === parts[2]
          );
          if (childToChoose == null) {
            throw new Error(`Cannot cd to '${parts[2]}' does not exist`);
          }
          currentNode = childToChoose;
        }
      }
    } else if (parts[0] === 'dir') {
      currentNode.children.push({
        name: parts[1],
        size: 0,
        children: [],
        parent: currentNode,
        isFile: false,
      });
    } else {
      const size = parseInt(parts[0]);
      const name = parts[1];
      currentNode.children.push({
        name,
        size,
        children: [],
        parent: currentNode,
        isFile: true,
      });
    }
  }

  const allNodes = walkTree(rootNode).filter((n) => n.size <= 100000).reduce(
    (acc, i) => acc + i.size,
    0,
  );
  return allNodes;
};

console.log(`2022-7-1: ${part1(input)}`);
