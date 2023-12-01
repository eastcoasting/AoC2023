// import text from "./example.txt";
import text from "./input.txt";

const validStringNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const a = () => {
  let currNumArray: string[] = [];

  text.split("\n").map((l, lIdx) => {
    // iterate over each char, if we get a valid split then we add
    currNumArray[lIdx] = "";

    for (let idx = 0; idx < l.length; idx++) {
      if (Number(l[idx]) === +l[idx] && l[idx] !== undefined) {
        currNumArray[lIdx] += l[idx];
      }

      const currentString = structuredClone(l).slice(idx);
      if (currentString.slice(0, 3) === "one") {
        console.log(currentString, "one");
        currNumArray[lIdx] += "1";
      }
      if (currentString.slice(0, 3) === "two") {
        currNumArray[lIdx] += "2";
      }
      if (currentString.slice(0, 5) === "three") {
        currNumArray[lIdx] += "3";
      }
      if (currentString.slice(0, 4) === "four") {
        currNumArray[lIdx] += "4";
      }
      if (currentString.slice(0, 4) === "five") {
        currNumArray[lIdx] += "5";
      }
      if (currentString.slice(0, 3) === "six") {
        currNumArray[lIdx] += "6";
      }
      if (currentString.slice(0, 5) === "seven") {
        currNumArray[lIdx] += "7";
      }
      if (currentString.slice(0, 5) === "eight") {
        currNumArray[lIdx] += "8";
      }
      if (currentString.slice(0, 4) === "nine") {
        currNumArray[lIdx] += "9";
      }
    }
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
