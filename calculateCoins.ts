export type Denomination = number;

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
  const zeroValue: Record<Denomination, number> = Object.keys(
    coinPerRoll
  ).reduce((acc, key) => {
    acc[Number(key)] = 0;
    return acc;
  }, {} as Record<Denomination, number>);

  arr.forEach((coin) => {
    zeroValue[coin] += 1;
  });
  const result = Object.fromEntries(
    Object.keys(coinPerRoll).map((key) => [Number(key), { rolls: 0, rest: 0 }])
  ) as bank;

  Object.entries(zeroValue).forEach(([key, amount]) => {
    const denom = Number(key) as Denomination;
    const perRoll = coinPerRoll[denom];
    result[denom].rolls = Math.floor(amount / perRoll);
    result[denom].rest = amount % perRoll;
  });
  // const result: bank = Object.keys(coinPerRoll).reduce((acc, key) => {
  //   const denom = Number(key) as Denomination;
  //   const amount = zeroValue[denom] ?? 0;
  //   const perRoll = coinPerRoll[denom];
  //   acc[denom] = {
  //     rolls: Math.floor(amount / perRoll),
  //     rest: amount % perRoll,
  //   };
  //   return acc;
  // }, {} as bank);

  return result;
}
