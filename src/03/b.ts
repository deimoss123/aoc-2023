const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");

function isGear(str: string) {
  return str === "*";
}

type Gear = {
  // [y, x]
  coords: [number, number];
  nums: number[];
};

const gears: Gear[] = [];

function addToGearList(num: number, coords: [number, number]) {
  const index = gears.findIndex(
    ({ coords: c }) => c[0] === coords[0] && c[1] === coords[1]
  );

  if (index === -1) {
    gears.push({ coords, nums: [num] });
    return;
  }

  gears[index].nums.push(num);
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

        // console.log(line);
        // console.log(`num: ${num}, start: ${start}, end: ${end}`);

        for (let j = start; j < end; j++) {
          if (isGear(input[i - 1][j])) {
            addToGearList(num, [i - 1, j]);
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
            addToGearList(num, [i + 1, j]);
            continue outer;
          }
        }
      }

      // pārbaudam pa kreisi
      const leftIndex = fromLeft - s.length - 1;
      if (leftIndex >= 0) {
        if (isGear(line[leftIndex])) {
          addToGearList(num, [i, leftIndex]);
          continue outer;
        }
      }

      // pārbaudam pa labi
      const rightIndex = fromLeft;
      if (rightIndex < line.length) {
        if (isGear(line[rightIndex])) {
          addToGearList(num, [i, rightIndex]);
          continue outer;
        }
      }
    }
  }
}

let sum = 0;

for (const { nums } of gears) {
  if (nums.length === 2) {
    sum += nums[0] * nums[1];
  }
}

console.log(sum);
