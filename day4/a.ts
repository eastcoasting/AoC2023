// import text from "./example.txt";
import text from "./input.txt";

// const isInSet = (winningNumbers: ) => {

// }

const a = () => {
  let runningTotal = 0;
  text.split("\n").map((card) => {
    // Card : [] | []
    const groups = card.split(": ").at(1);

    if (!groups) return;

    const [winningNumbersStr, ourNumbersStr] = groups?.split("|");
    const winningNumbers = winningNumbersStr
      .split(" ")
      .filter((n) => {
        return n !== "";
      })
      .map((n) => {
        return Number(n);
      });
    const ourNumbers = ourNumbersStr
      .split(" ")
      .filter((n) => {
        return n !== "";
      })
      .map((n) => {
        return Number(n);
      });

    const identifiedMatches: number[] = [];

    ourNumbers.map((n) => {
      if (winningNumbers.includes(n)) {
        identifiedMatches.push(n);
      }
    });

    if (identifiedMatches.length > 2) {
      runningTotal += 2 ** (identifiedMatches.length - 1)
    } else {
      runningTotal += identifiedMatches.length;
    }
  });

  console.log(runningTotal);
};

a();
