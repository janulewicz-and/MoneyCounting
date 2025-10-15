import {
  Denomination,
  coinsInfo,
  bank,
  calculateCoins,
} from "./calculateCoins";

describe("calculateCoins", () => {
  test("empty array, empty object", () => {
    expect(calculateCoins([], {})).toEqual({});
  });
  test("empty array", () => {
    expect(() => calculateCoins([])).toThrow(
      "You must provide at least one denomination configuration"
    );
  });
  test("each denomination once", () => {
    expect(
      calculateCoins([1, 2, 5, 10, 20, 50], {
        1: 40,
        2: 40,
        5: 30,
        10: 50,
        20: 20,
        50: 40,
      })
    ).toEqual({
      1: { rolls: 0, rest: 1 },
      2: { rolls: 0, rest: 1 },
      5: { rolls: 0, rest: 1 },
      10: { rolls: 0, rest: 1 },
      20: { rolls: 0, rest: 1 },
      50: { rolls: 0, rest: 1 },
    });
  });
  test("full rolls without rest for each denomination", () => {
    expect(
      calculateCoins(
        [
          ...Array(40).fill(1),
          ...Array(40).fill(2),
          ...Array(30).fill(5),
          ...Array(50).fill(10),
          ...Array(20).fill(20),
          ...Array(40).fill(50),
        ],
        {
          1: 40,
          2: 40,
          5: 30,
          10: 50,
          20: 20,
          50: 40,
        }
      )
    ).toEqual({
      1: { rolls: 1, rest: 0 },
      2: { rolls: 1, rest: 0 },
      5: { rolls: 1, rest: 0 },
      10: { rolls: 1, rest: 0 },
      20: { rolls: 1, rest: 0 },
      50: { rolls: 1, rest: 0 },
    });
  });
  test("one full roll with rest", () => {
    expect(
      calculateCoins(
        [
          ...Array(43).fill(1),
          ...Array(45).fill(2),
          ...Array(31).fill(5),
          ...Array(53).fill(10),
          ...Array(25).fill(20),
          ...Array(42).fill(50),
        ],
        {
          1: 40,
          2: 40,
          5: 30,
          10: 50,
          20: 20,
          50: 40,
        }
      )
    ).toEqual({
      1: { rolls: 1, rest: 3 },
      2: { rolls: 1, rest: 5 },
      5: { rolls: 1, rest: 1 },
      10: { rolls: 1, rest: 3 },
      20: { rolls: 1, rest: 5 },
      50: { rolls: 1, rest: 2 },
    });
  });
  test("two full rolls with rest", () => {
    expect(
      calculateCoins(
        [
          ...Array(85).fill(1),
          ...Array(95).fill(2),
          ...Array(62).fill(5),
          ...Array(120).fill(10),
          ...Array(55).fill(20),
          ...Array(82).fill(50),
        ],
        {
          1: 40,
          2: 40,
          5: 30,
          10: 50,
          20: 20,
          50: 40,
        }
      )
    ).toEqual({
      1: { rolls: 2, rest: 5 },
      2: { rolls: 2, rest: 15 },
      5: { rolls: 2, rest: 2 },
      10: { rolls: 2, rest: 20 },
      20: { rolls: 2, rest: 15 },
      50: { rolls: 2, rest: 2 },
    });
  });
  test("mixed quantities and non-existend denominations", () => {
    expect(
      calculateCoins([1, 2, 3, 5, 5, 10, 10, 10, 20, 100, 200], {
        1: 40,
        2: 40,
        5: 30,
        10: 50,
        20: 20,
        50: 40,
      })
    ).toEqual({
      1: { rolls: 0, rest: 1 },
      2: { rolls: 0, rest: 1 },
      5: { rolls: 0, rest: 2 },
      10: { rolls: 0, rest: 3 },
      20: { rolls: 0, rest: 1 },
      50: { rolls: 0, rest: 0 },
    });
  });
  test("no rolls, just rest", () => {
    expect(
      calculateCoins([1, 1, 1, 2, 2, 5, 5, 5, 10, 10, 50], {
        1: 40,
        2: 40,
        5: 30,
        10: 50,
        20: 20,
        50: 40,
      })
    ).toEqual({
      1: { rolls: 0, rest: 3 },
      2: { rolls: 0, rest: 2 },
      5: { rolls: 0, rest: 3 },
      10: { rolls: 0, rest: 2 },
      20: { rolls: 0, rest: 0 },
      50: { rolls: 0, rest: 1 },
    });
  });
  test("random values", () => {
    expect(
      calculateCoins([3, 3, 3, 3, 7, 7, 9, 9, 9, 9, 9], { 3: 4, 7: 3, 9: 5 })
    ).toEqual({
      3: { rolls: 1, rest: 0 },
      7: { rolls: 0, rest: 2 },
      9: { rolls: 1, rest: 0 },
    });
  });
});
