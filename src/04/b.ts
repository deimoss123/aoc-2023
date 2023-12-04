const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");

const cards: Record<number, number> = {};

for (const line of input) {
  const [cardStr, nums] = line.split(":");
  const [_, cardIndexStr] = cardStr.split(/\s+/);

  const cardIndex = +cardIndexStr;

  if (!cards[cardIndex]) {
    cards[cardIndex] = 1;
  }

  const countOfCopies = cards[cardIndex];

  const [winNums, hasNums] = nums.split("|");
  const winNumsArr = winNums.trim().split(/\s+/);
  const hasNumsArr = hasNums.trim().split(/\s+/);

  let matching = 0;

  for (const n of hasNumsArr) {
    if (winNumsArr.includes(n)) matching++;
  }

  for (let i = 1; i <= matching; i++) {
    if (i + cardIndex > input.length) break;
    if (cards[i + cardIndex]) {
      cards[i + cardIndex] = cards[i + cardIndex] + countOfCopies;
    } else {
      cards[i + cardIndex] = 1 + countOfCopies;
    }
  }
}

const sum = Object.values(cards).reduce((p, n) => p + n, 0);
console.log(sum);
