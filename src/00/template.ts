const USE_TEST_INPUT = true;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "text.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");
