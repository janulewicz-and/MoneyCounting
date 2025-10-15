export type Denomination = number;

export interface coinsInfo {
  rolls: number;
  rest: number;
}

export type bank = Record<Denomination, coinsInfo>;

export function calculateCoins(
  arr: Denomination[],
  coinPerRoll?: Record<Denomination, number>
): bank | {} {
  if (!coinPerRoll) {
    throw new Error("You must provide at least one denomination configuration");
  }
  if (Object.keys(coinPerRoll).length === 0) {
    return {} as bank;
  }
  const zeroValue: Record<Denomination, number> = Object.keys(
    coinPerRoll
  ).reduce((acc, key) => {
    acc[Number(key)] = 0;
    return acc;
  }, {} as Record<Denomination, number>);

  arr.forEach((coin) => {
    if (coinPerRoll[coin] !== undefined) {
      zeroValue[coin] += 1;
    }
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
  return result;
}
