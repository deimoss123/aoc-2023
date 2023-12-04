const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");

let sum = 0;

for (const line of input) {
  const [_, nums] = line.split(":");
  const [winNums, hasNums] = nums.split("|");
  const winNumsArr = winNums.trim().split(/\s+/);
  const hasNumsArr = hasNums.trim().split(/\s+/);

  let cardSum = 0;

  for (const n of hasNumsArr) {
    if (winNumsArr.includes(n)) {
      if (cardSum === 0) {
        cardSum = 1;
      } else {
        cardSum *= 2;
      }
    }
  }

  sum += cardSum;
}

console.log(sum);
