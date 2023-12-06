const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const [timeStr, distStr] = inputRaw.split("\n");

const [_, ...times] = timeStr.split(/\s+/);
const [__, ...distances] = distStr.split(/\s+/);

let res = 1;

for (let i = 0; i < times.length; i++) {
  const [time, dist] = [+times[i], +distances[i]];

  let sum = 0;

  // j-= pogas turēšanas ilgums
  for (let j = 1; j < time; j++) {
    const traveled = (time - j) * j;
    if (traveled > dist) sum++;
  }

  res *= sum;
}

console.log(res);
