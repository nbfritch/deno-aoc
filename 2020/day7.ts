const verb = ' bags contain ';
const noun = ', ';
const nullNoun = 'no other bags';
const endRule = '.';
const shinyGold = 'shiny gold';

interface GraphConnection {
  count: number;
  color: string;
}

const ruleToGraphConnection = (rule: string): GraphConnection => {
  const amount = rule.split(' ')[0];
  return {
    count: parseInt(amount),
    color: rule.replaceAll(`${amount} `, '').replaceAll(' bags', '').replace(
      'bag',
      '',
    ).trim(),
  };
};

const rules: Record<string, Array<GraphConnection> | null> = {};
(await Deno.readTextFile('inputs/2020/day7')).split('\n').filter((x) =>
  x.length > 0
).forEach((rule) => {
  const [subject, nounClauses] = rule.split(verb);
  const parsedClauses = nounClauses.replace(endRule, '').split(noun).flatMap(
    (clause) => clause == nullNoun ? [] : [ruleToGraphConnection(clause)],
  );

  parsedClauses.forEach((clause) => {
    if (rules[subject] == null) {
      rules[subject] = [];
    }

    rules[subject]?.push(clause);
  });
});

const canTraverseToGold = (
  key: string,
  tree: Record<string, Array<GraphConnection> | null>,
): boolean => {
  if (!tree.hasOwnProperty(key) || key === shinyGold) {
    return false;
  }

  const keysToCheck = tree[key]?.map((x) => x.color);

  if (keysToCheck?.includes(shinyGold)) {
    return true;
  } else {
    return keysToCheck?.some((color) => canTraverseToGold(color, tree)) ??
      false;
  }
};

const traverse = (
  key: string,
  tree: Record<string, Array<GraphConnection> | null>,
  n: number,
): number => {
  const connections = tree[key];
  if (connections == null || connections.length === 0) {
    return n;
  }

  return n +
    connections.map((c) => n * traverse(c.color, tree, c.count)).reduce((
      acc,
      i,
    ) => acc + i);
};

const part1 = (): number => {
  return Object.keys(rules).filter((k) => canTraverseToGold(k, rules)).length;
};

const part2 = (): number => {
  return traverse(shinyGold, rules, 1);
};

console.log(`2020-7-1: ${part1()}`);
console.log(`2020-7-2: ${part2()}`);
