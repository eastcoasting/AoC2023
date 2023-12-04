import text from "./example.txt";
// import text from "./input.txt";

const incrementCards = (
  cardMap: Map<number, number[]>,
  currentGameID: number,
  numberOfNewCards: number,
  lastGame: number
) => {
  let localNumberOfNewCards = numberOfNewCards;
  let localCurrentGameID = currentGameID + 1;

  while (localNumberOfNewCards > 0) {
    if (cardMap.has(currentGameID)) {
      const existingWins = cardMap.get(currentGameID);

      if (!existingWins) return;

      existingWins.push(localCurrentGameID);

      cardMap.set(currentGameID, existingWins);
    } else {
      cardMap.set(currentGameID, [localCurrentGameID]);
    }

    localNumberOfNewCards -= 1;
    localCurrentGameID += 1;
  }

  console.log("at the end it looks like this:", cardMap, "\n\n\n");
};

const recursivelyBuildWins = (
  cardMap: Map<number, number[]>,
  finalArray: number[],
  currentWorkingMap: Map<number, number[]>,
  currentGameID: number
): number[] => {
  let nextWins = currentWorkingMap.get(currentGameID);

  console.log(
    "we are in rec. On game: ",
    currentGameID,
    "currentworking map: ",
    currentWorkingMap,
    "\n\n"
  );

  if (nextWins) {
    let nextPotentialWin = nextWins.at(0);
    if (nextPotentialWin) {
      finalArray.push(nextPotentialWin);
      nextWins.shift();

      if (nextWins.length > 0) {
        currentWorkingMap.set(currentGameID, nextWins);
      } else {
        currentWorkingMap.delete(currentGameID);
      }

      if (currentGameID) {
        return recursivelyBuildWins(
          cardMap,
          finalArray,
          currentWorkingMap,
          currentGameID
        );
      } else {
        return finalArray;
      }
    }
  }
  return finalArray;
};

const b = () => {
  let runningTotal = 0;

  let nextIncrementalCardsMap = new Map();
  //   nextIncrementalCardsMap.set(1, 1);
  const totalGridSize = text.split("\n").length;

  text.split("\n").map((card) => {
    const groups = card.split(": ").at(1);
    const gameIDStr = card.split(": ").at(0);

    if (!gameIDStr) return;

    const gameID = gameIDStr.split("Card ").at(1);

    if (!groups || !gameID) return;

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

    if (identifiedMatches.length > 0) {
      const incrementBy =
        identifiedMatches.length * (nextIncrementalCardsMap.get(gameID) ?? 1);

      console.log(
        "we are on game ",
        gameID,
        "incrementing by",
        incrementBy,
        "with these matches",
        identifiedMatches
      );

      incrementCards(
        nextIncrementalCardsMap,
        +gameID,
        incrementBy,
        totalGridSize
      );
    }
  });

  const finalGamesArray: number[] = [];

  nextIncrementalCardsMap.forEach((value, key) => {
    recursivelyBuildWins(
      structuredClone(nextIncrementalCardsMap),
      finalGamesArray,
      structuredClone(nextIncrementalCardsMap),
      key
    );
  });

  console.log(finalGamesArray);
};

b();
