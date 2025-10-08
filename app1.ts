import { coins } from "./coins.js";

type Denomination = 1 | 2 | 5 | 10 | 20 | 50;

interface coinsInfo {
  rolls: number;
  rest: number;
}

type bank = Record<Denomination, coinsInfo>;

function calculateCoins(arr: Denomination[]): bank {
  let total1: number = 0;
  let total2: number = 0;
  let total5: number = 0;
  let total10: number = 0;
  let total20: number = 0;
  let total50: number = 0;
  let result: bank = {
    1: { rolls: 0, rest: 0 },
    2: { rolls: 0, rest: 0 },
    5: { rolls: 0, rest: 0 },
    10: { rolls: 0, rest: 0 },
    20: { rolls: 0, rest: 0 },
    50: { rolls: 0, rest: 0 },
  };
  arr.forEach((coin: number) => {
    if (coin === 1) {
      total1 += 1;
    }
    if (coin === 2) {
      total2 += 1;
    }
    if (coin === 5) {
      total5 += 1;
    }
    if (coin === 10) {
      total10 += 1;
    }
    if (coin === 20) {
      total20 += 1;
    }
    if (coin === 50) {
      total50 += 1;
    }
  });
  result[1].rolls = Math.floor(total1 / 40);
  result[1].rest = total1 % 40;
  result[2].rolls = Math.floor(total2 / 40);
  result[2].rest = total2 % 40;
  result[5].rolls = Math.floor(total5 / 30);
  result[5].rest = total5 % 30;
  result[10].rolls = Math.floor(total10 / 50);
  result[10].rest = total10 % 50;
  result[20].rolls = Math.floor(total20 / 20);
  result[20].rest = total20 % 20;
  result[50].rolls = Math.floor(total50 / 40);
  result[50].rest = total50 % 40;
  return result;
}

console.log(calculateCoins(coins));
