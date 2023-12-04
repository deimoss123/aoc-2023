const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");

let touchingSum = 0;

function isGear(str: string) {
  return str && str !== "." && isNaN(+str);
}

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  const splitStr = line.split(/(\d+)/).filter((s) => s !== "");

  let fromLeft = 0;
  outer: for (const s of splitStr) {
    fromLeft += s.length;
    // if is number
    if (!isNaN(+s)) {
      const num = +s;

      let numStartIndex = fromLeft - s.length;

      // pārbauda augšu un diagonāles
      if (i !== 0) {
        const start = numStartIndex === 0 ? 0 : numStartIndex - 1;
        const end = fromLeft >= line.length ? line.length : fromLeft + 1;

        for (let j = start; j < end; j++) {
          if (isGear(input[i - 1][j])) {
            touchingSum += num;
            console.log(`touching: ${num} up`);
            continue outer;
          }
        }
      }

      // pārbaudam apakšu un diagonāles
      if (i !== input.length - 1) {
        const start = numStartIndex === 0 ? 0 : numStartIndex - 1;
        const end = fromLeft >= line.length ? line.length : fromLeft + 1;

        for (let j = start; j < end; j++) {
          if (isGear(input[i + 1][j])) {
            touchingSum += num;
            console.log(`touching: ${num} down`);
            continue outer;
          }
        }
      }

      // pārbaudam pa kreisi
      const leftIndex = fromLeft - s.length - 1;
      if (leftIndex >= 0) {
        if (isGear(line[leftIndex])) {
          touchingSum += num;
          console.log(`touching: ${num} left`);
          continue outer;
        }
      }

      // pārbaudam pa labi
      const rightIndex = fromLeft;
      if (rightIndex < line.length) {
        if (isGear(line[rightIndex])) {
          touchingSum += num;
          console.log(`touching: ${num} right`);
          continue outer;
        }
      }
    }
  }
}

console.log(touchingSum);
