const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");

const possibleCubeCount: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

let impossibleIdSum = 0;
let totalIdSum = 0;

outer: for (const line of input) {
  const [gameStr, cubeStr] = line.split(": ");
  const id = gameStr.slice(5);
  totalIdSum += +id;
  const cubeSets = cubeStr.split("; ");
  for (const set of cubeSets) {
    const cubePairs = set.split(", ");
    for (const pair of cubePairs) {
      const [count, color] = pair.split(" ");
      if (possibleCubeCount[color] < +count) {
        impossibleIdSum += +id;
        continue outer;
      }
    }
  }
}

console.log(totalIdSum - impossibleIdSum);
