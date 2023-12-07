const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");

const cardValues: Record<string, number> = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  J: 1,
};

enum HandType {
  highCard,
  onePair,
  twoPair,
  threeOfKind,
  fullHouse,
  fourOfKind,
  fiveOfKind,
}

function getHandType(hand: string): HandType {
  const cardMap: Record<string, number> = {};

  let jokerCount = 0;

  for (const ch of hand) {
    if (ch === "J") {
      jokerCount++;
    } else {
      cardMap[ch] = cardMap[ch] ? cardMap[ch] + 1 : 1;
    }
  }

  const pairCount = Object.values(cardMap).reduce(
    (p, n) => (n === 2 ? p + 1 : p),
    0
  );

  if (
    jokerCount >= 4 ||
    Object.values(cardMap).find((v) => v === 5) ||
    (Object.values(cardMap).find((v) => v === 4) && jokerCount === 1) ||
    (Object.values(cardMap).find((v) => v === 3) && jokerCount === 2) ||
    (pairCount === 1 && jokerCount === 3)
  ) {
    return HandType.fiveOfKind;
  }

  if (
    jokerCount === 3 ||
    Object.values(cardMap).find((v) => v === 4) ||
    (Object.values(cardMap).find((v) => v === 3) && jokerCount === 1) ||
    (pairCount === 1 && jokerCount === 2)
  ) {
    return HandType.fourOfKind;
  }

  if (pairCount === 2) {
    if (jokerCount === 1) {
      return HandType.fullHouse;
    }

    return HandType.twoPair;
  }

  if (jokerCount === 2 || Object.values(cardMap).find((v) => v === 3)) {
    if (pairCount === 1) {
      return HandType.fullHouse;
    }

    return HandType.threeOfKind;
  }

  if (pairCount === 1 && jokerCount === 1) {
    return HandType.threeOfKind;
  }

  if (pairCount === 1 || jokerCount === 1) {
    return HandType.onePair;
  }

  return HandType.highCard;
}

function compareHands(hand1: string, hand2: string): number {
  const type1 = getHandType(hand1);
  const type2 = getHandType(hand2);

  if (type1 !== type2) {
    return type1 - type2;
  }

  // vienādi tipi
  for (let i = 0; i < hand1.length; i++) {
    if (cardValues[hand1[i]] !== cardValues[hand2[i]]) {
      return cardValues[hand1[i]] - cardValues[hand2[i]];
    }
  }

  return 0;
}

const splitInput: [string, number][] = input.map((l) => [
  l.split(" ")[0],
  +l.split(" ")[1],
]);

splitInput.sort((a, b) => compareHands(a[0], b[0]));
const sum = splitInput.reduce((p, [_, bid], index) => p + (index + 1) * bid, 0);

console.log(sum);
