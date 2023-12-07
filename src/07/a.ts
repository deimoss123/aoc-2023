const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt"
).text();

const input = inputRaw.split("\n");

const cardValues: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
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

  for (const ch of hand) {
    cardMap[ch] = cardMap[ch] ? cardMap[ch] + 1 : 1;
  }

  if (Object.values(cardMap).find((v) => v === 5)) {
    return HandType.fiveOfKind;
  }

  if (Object.values(cardMap).find((v) => v === 4)) {
    return HandType.fourOfKind;
  }

  const pairCount = Object.values(cardMap).reduce(
    (p, n) => (n === 2 ? p + 1 : p),
    0
  );

  if (Object.values(cardMap).find((v) => v === 3)) {
    if (pairCount === 1) {
      return HandType.fullHouse;
    }
    return HandType.threeOfKind;
  }

  if (pairCount === 2) {
    return HandType.twoPair;
  }

  if (pairCount === 1) {
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
