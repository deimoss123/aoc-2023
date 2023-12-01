const USE_TEST_INPUT = false;

const inputRaw = (
  await Bun.file(USE_TEST_INPUT ? "test.txt" : "input.txt").text()
).trim();

const input = inputRaw.split("\n");

let sum = 0;

for (const line of input) {
  const numArr = line.split("").filter((ch) => !Number.isNaN(+ch));
  sum += +(numArr[0] + numArr[numArr.length - 1]);
}

console.log(sum);
