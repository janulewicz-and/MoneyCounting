export type Denomination = number;

export interface CoinsInfo {
  rolls: number;
  rest: number;
}

export type Bank = Record<Denomination, CoinsInfo>;

export function calculateCoins(
  arrayOfCoins: Denomination[],
  coinPerRoll: Record<Denomination, number>
): Bank | {} {
  if (!coinPerRoll || Object.keys(coinPerRoll).length === 0) {
    throw new Error("You must provide at least one denomination configuration");
  }
  const initialValue: Record<Denomination, number> = Object.keys(
    coinPerRoll
  ).reduce((acc, key) => {
    acc[Number(key)] = 0;
    return acc;
  }, {} as Record<Denomination, number>);

  arrayOfCoins.forEach((coin) => {
    if (coinPerRoll[coin] !== undefined) {
      initialValue[coin] += 1;
    }
  });
  const result: Bank = Object.fromEntries(
    Object.keys(coinPerRoll).map((key) => [Number(key), { rolls: 0, rest: 0 }])
  );

  Object.entries(initialValue).forEach(([key, amount]) => {
    const denom = Number(key) as Denomination;
    const perRoll = coinPerRoll[denom];
    result[denom].rolls = Math.floor(amount / perRoll);
    result[denom].rest = amount % perRoll;
  });
  return result;
}
