const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");

let sum = 0;

for (const line of input) {
  const sequences: number[][] = [];

  const nums = line.split(/\s+/).map((s) => +s);
  sequences.push(nums);

  for (let i = nums.length; i > 0; i--) {
    const tempSeq: number[] = [];

    for (let j = 0; j < i - 1; j++) {
      const left = sequences[sequences.length - 1][j];
      const right = sequences[sequences.length - 1][j + 1];
      tempSeq.push(right - left);
    }

    sequences.push(tempSeq);
    if (tempSeq.every((n) => n === 0)) break;
  }

  // ekstrapolēšana
  let temp = 0;

  for (let i = sequences.length - 2; i >= 0; i--) {
    temp = sequences[i][0] - temp;
  }

  sum += temp;
}

console.log(sum);
