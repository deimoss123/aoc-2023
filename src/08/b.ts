const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const [instructionsStr, nodeStr] = inputRaw.split("\n\n");

const splitNodes = nodeStr.split("\n");

const nodes = new Map<string, [string, string]>();

for (const s of splitNodes) {
  const match = s.match(/(\w+) = \((\w+), (\w+)\)/)!;
  nodes.set(match[1], [match[2], match[3]]);
}

const filteredEntries = [...nodes.entries()].filter(
  ([a]) => a[a.length - 1] === "A"
);

const currentNodes: [string, string][] = filteredEntries.map(([_, v]) => v);

let steps = 0;
let i = 0;
let j = 0;
let nextNode = "";

const instructions = instructionsStr.split("").map((s) => (s === "L" ? 0 : 1));

// greatest common divisor
function gcd(n1: bigint, n2: bigint) {
  const lowestNum = n1 < n2 ? n1 : n2;
  let res = 1n;

  for (let i = 1n; i <= lowestNum; i++) {
    if (n1 % i === 0n && n2 % i === 0n) {
      res = i;
    }
  }

  return res;
}

// lowest common multiple
function lcm(n1: bigint, n2: bigint) {
  const res = (n1 * n2) / gcd(n1, n2);
  return res;
}

const endPoints: Record<number, bigint> = {};

while (true) {
  steps++;

  for (j = 0; j < currentNodes.length; j++) {
    nextNode = currentNodes[j][instructions[i]];

    currentNodes[j] = nodes.get(nextNode)!;

    if (nextNode[nextNode.length - 1] === "Z") {
      if (!endPoints[j]) {
        endPoints[j] = BigInt(steps);
      }
    }
  }

  if (Object.keys(endPoints).length === currentNodes.length) {
    break;
  }

  if (++i >= instructions.length) i = 0;
}

const res = Object.values(endPoints).reduce(lcm);
console.log(res);
