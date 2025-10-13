export type Denomination = 1 | 2 | 5 | 10 | 20 | 50;

export interface coinsInfo {
  rolls: number;
  rest: number;
}

export type bank = Record<Denomination, coinsInfo>;

const coinPerRoll: Record<Denomination, number> = {
  1: 40,
  2: 40,
  5: 30,
  10: 50,
  20: 20,
  50: 40,
} as const;

export function calculateCoins(arr: Denomination[]): bank {
  const amountOfCoins: Record<Denomination, number> = {
    1: 0,
    2: 0,
    5: 0,
    10: 0,
    20: 0,
    50: 0,
  };
  arr.forEach((coin) => {
    amountOfCoins[coin] += 1;
  });
  const result: bank = {
    1: { rolls: 0, rest: 0 },
    2: { rolls: 0, rest: 0 },
    5: { rolls: 0, rest: 0 },
    10: { rolls: 0, rest: 0 },
    20: { rolls: 0, rest: 0 },
    50: { rolls: 0, rest: 0 },
  };
  Object.entries(amountOfCoins).forEach(([key, amount]) => {
    const denom = Number(key) as Denomination;
    const perRoll = coinPerRoll[denom];
    result[denom].rolls = Math.floor(amount / perRoll);
    result[denom].rest = amount % perRoll;
  });
  return result;
}
