// import text from "./example.txt";
import text from "./input.txt";

const a = () => {
  let currNumArray: string[] = [];

  text.split("\n").map((l, idx) => {
    currNumArray[idx] = "";

    l.split("").map((c) => {
      if (Number(c) === +c && c !== undefined) {
        currNumArray[idx] += c;
      }
    });
  });

  const conformedNumbers = currNumArray.map((nL) => {
    if (!nL) return;

    if (nL.length === 2) return nL;

    if (nL.length === 1 && nL.at(0) !== undefined) {
      let firstN = nL.at(0);
      if (firstN === undefined) return;
      return firstN + firstN;
    }

    if (nL.length >= 2) {
      let firstN = nL.at(0);
      let lastN = nL.at(-1);

      if (firstN && lastN) {
        return firstN + lastN;
      }
    }
  });

  const result = conformedNumbers.reduce(
    (acc: number, curr: string | undefined) => {
      if (!curr) return acc;
      acc += +curr ?? 0;
      return acc;
    },
    0
  );

  console.log(result);
};

a();
