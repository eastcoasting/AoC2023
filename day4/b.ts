import text from "./example.txt";
// import text from "./input.txt";

function calculateCardWins(initialWinsMap: Map<any, any>) {
  // Initialize a map to keep track of the total number of copies of each card
  let totalCopies = new Map();

  // Initialize the totalCopies map with the cards from the initialWinsMap
  initialWinsMap.forEach((_, gameIDX) => {
    totalCopies.set(gameIDX, 1); // Start with 1 copy of each card
  });

  // Iterate over each game in the order of their indices
  for (let gameIDX = 1; gameIDX <= initialWinsMap.size; gameIDX++) {
    let wins = initialWinsMap.get(gameIDX);
    let copies = totalCopies.get(gameIDX);

    // console.log(
    //   "on game",
    //   gameIDX,
    //   "wins, ",
    //   wins,
    //   "copies, ",
    //   copies,
    //   "current grid:\n\n",
    //   totalCopies
    // );

    // For each win from the current game
    wins.forEach((win: any) => {
      // If the win card is already in totalCopies, add to its count
      if (totalCopies.has(win)) {
        totalCopies.set(win, totalCopies.get(win) + copies);
      } else {
        // Otherwise, add the win card with the number of copies won
        totalCopies.set(win, copies);
      }
    });
  }

  return totalCopies;
}

const b = () => {
  let initialMatches: number[][] = [];
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

    initialMatches.push(identifiedMatches);
  });

  const cumulativeArray: number[] = [];

  initialMatches = initialMatches.map((game, gameIDX) => {
    return game.map((_, cardIDX) => {
      return gameIDX + 1 + (cardIDX + 1);
    });
  });

  const lookupMap = new Map();

  initialMatches.map((game, gameIDX) => {
    lookupMap.set(gameIDX + 1, game);
  });

  let data = calculateCardWins(lookupMap);

  console.log(
    [...data.values()].reduce((prev, curr) => {
      prev += curr;
      return prev;
    }, 0)
  );
};

b();
