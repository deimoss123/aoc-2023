const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");

let sum = 0;

for (const line of input) {
  const [_, cubeStr] = line.split(": ");
  const cubeSets = cubeStr.split("; ");

  const colorSet: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const set of cubeSets) {
    const cubePairs = set.split(", ");
    for (const pair of cubePairs) {
      const [count, color] = pair.split(" ");
      if (colorSet[color] < +count) {
        colorSet[color] = +count;
      }
    }
  }

  sum += colorSet.red * colorSet.green * colorSet.blue;
}

console.log(sum);
