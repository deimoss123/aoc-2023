const USE_TEST_INPUT = false;

const inputRaw = (
  await Bun.file(USE_TEST_INPUT ? "test.txt" : "input.txt").text()
).trim();

const input = inputRaw.split("\n");

const numbers = new Map<string, number>([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

let sum = 0;

for (let line of input) {
  const numArr: number[] = [];

  let chBuffer = "";
  let lastChar = "";
  for (const ch of line.split("")) {
    chBuffer += ch;

    // drausmas
    const resBuf = [...numbers.keys()].find((key) => key.startsWith(chBuffer));
    const resCh = [...numbers.keys()].find((key) => key.startsWith(ch));
    const resCh2 = [...numbers.keys()].find((key) =>
      key.startsWith(lastChar + ch)
    );

    if (!resBuf) {
      if (!Number.isNaN(+ch)) {
        numArr.push(+ch);
        chBuffer = "";
      } else {
        chBuffer = resCh2 ? lastChar + ch : ch;
      }
    } else if (numbers.get(chBuffer)) {
      numArr.push(numbers.get(chBuffer)!);
      chBuffer = resCh2 ? lastChar + ch : resCh ? ch : "";
    }

    lastChar = ch;
  }
  sum += numArr[0] * 10 + numArr[numArr.length - 1];
}

console.log(sum);
