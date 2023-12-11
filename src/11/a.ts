const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");
const charInput: string[][] = [];

// pārvērst inputu par simbolu matriksu
for (let i = 0; i < input.length; i++) {
  charInput.push(input[i].split(""));
}

// [y, x] sākot no 0
const coordinates: Record<number, [number, number]> = {};

const expandedColumns: number[] = [];

for (let i = 0; i < charInput.length; i++) {
  if (charInput.map((arr) => arr[i]).every((ch) => ch === ".")) {
    expandedColumns.push(i);
  }
}

let expandedLines = 0;
let id = 1;

// iegūt koordinātes
for (let i = 0; i < charInput.length; i++) {
  const line = charInput[i];

  if (line.every((ch) => ch === ".")) {
    expandedLines++;
    continue;
  }

  let x = 0;

  for (let j = 0; j < line.length; j++) {
    const ch = line[j];

    if (ch === ".") {
      if (expandedColumns.includes(j)) x += 2;
      else x++;

      continue;
    }

    coordinates[id++] = [i + expandedLines, x++];
  }
}

const nums = Object.keys(coordinates);
let sum = 0;

// iziet cauri pāriem
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    const distanceY = Math.abs(
      coordinates[+nums[i]][0] - coordinates[+nums[j]][0]
    );
    const distanceX = Math.abs(
      coordinates[+nums[i]][1] - coordinates[+nums[j]][1]
    );

    sum += distanceX + distanceY;
  }
}

console.log(sum);
