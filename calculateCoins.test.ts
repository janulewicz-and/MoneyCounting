import {
  Denomination,
  coinsInfo,
  bank,
  calculateCoins,
} from "./calculateCoins";

describe("calculateCoins", () => {
  test("empty arr", () => {
    expect(calculateCoins([])).toEqual({
      1: { rolls: 0, rest: 0 },
      2: { rolls: 0, rest: 0 },
      5: { rolls: 0, rest: 0 },
      10: { rolls: 0, rest: 0 },
      20: { rolls: 0, rest: 0 },
      50: { rolls: 0, rest: 0 },
    });
  });
  test("1", () => {
    expect(calculateCoins([1, 2, 5, 10, 20, 50])).toEqual({
      1: { rolls: 0, rest: 1 },
      2: { rolls: 0, rest: 1 },
      5: { rolls: 0, rest: 1 },
      10: { rolls: 0, rest: 1 },
      20: { rolls: 0, rest: 1 },
      50: { rolls: 0, rest: 1 },
    });
  });
  test("2", () => {
    expect(
      calculateCoins([
        ...Array(40).fill(1),
        ...Array(40).fill(2),
        ...Array(30).fill(5),
        ...Array(50).fill(10),
        ...Array(20).fill(20),
        ...Array(40).fill(50),
      ])
    ).toEqual({
      1: { rolls: 1, rest: 0 },
      2: { rolls: 1, rest: 0 },
      5: { rolls: 1, rest: 0 },
      10: { rolls: 1, rest: 0 },
      20: { rolls: 1, rest: 0 },
      50: { rolls: 1, rest: 0 },
    });
  });
  test("3", () => {
    expect(
      calculateCoins([
        ...Array(43).fill(1),
        ...Array(45).fill(2),
        ...Array(31).fill(5),
        ...Array(53).fill(10),
        ...Array(25).fill(20),
        ...Array(42).fill(50),
      ])
    ).toEqual({
      1: { rolls: 1, rest: 3 },
      2: { rolls: 1, rest: 5 },
      5: { rolls: 1, rest: 1 },
      10: { rolls: 1, rest: 3 },
      20: { rolls: 1, rest: 5 },
      50: { rolls: 1, rest: 2 },
    });
  });
  test("4", () => {
    expect(
      calculateCoins([
        ...Array(85).fill(1),
        ...Array(95).fill(2),
        ...Array(62).fill(5),
        ...Array(120).fill(10),
        ...Array(55).fill(20),
        ...Array(82).fill(50),
      ])
    ).toEqual({
      1: { rolls: 2, rest: 5 },
      2: { rolls: 2, rest: 15 },
      5: { rolls: 2, rest: 2 },
      10: { rolls: 2, rest: 20 },
      20: { rolls: 2, rest: 15 },
      50: { rolls: 2, rest: 2 },
    });
  });
  test("5", () => {
    expect(calculateCoins([1, 1, 2, 2, 2, 5, 10, 10, 20, 50, 50, 50])).toEqual({
      1: { rolls: 0, rest: 2 },
      2: { rolls: 0, rest: 3 },
      5: { rolls: 0, rest: 1 },
      10: { rolls: 0, rest: 2 },
      20: { rolls: 0, rest: 1 },
      50: { rolls: 0, rest: 3 },
    });
  });
});
