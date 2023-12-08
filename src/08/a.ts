const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const [instructions, nodeString] = inputRaw.split("\n\n");

const splitNodes = nodeString.split("\n");
const nodes: Record<string, [string, string]> = {};

for (const s of splitNodes) {
  const match = s.match(/(\w+) = \((\w+), (\w+)\)/)!;
  nodes[match[1]] = [match[2], match[3]];
}

let steps = 0;
let i = 0;
let currentNode = nodes[Object.keys(nodes)[0]];

while (true) {
  const direction = instructions[i] === "L" ? 0 : 1;
  if (++i >= instructions.length) i = 0;

  steps++;

  if (currentNode[direction] === "ZZZ") {
    break;
  } else {
    currentNode = nodes[currentNode[direction]];
  }
}

console.log(steps);
