import text from "./example.txt";
// import text from "./input.txt";

const incrementCards = (
  cardMap: Map<number, number>,
  currentGameID: number,
  numberOfNewCards: number,
  lastGame: number
) => {
  let localNumberOfNewCards = numberOfNewCards;
  let localCurrentGameID = currentGameID + 1;

  while (localNumberOfNewCards > 0) {
    console.log(
      cardMap,
      "\n currID:",
      localCurrentGameID,
      "new cards left",
      localNumberOfNewCards,
      "\n"
    );

    if (localCurrentGameID >= lastGame) {
      if (cardMap.has(lastGame)) {
        let newTotal = cardMap.get(lastGame);

        cardMap.set(lastGame, newTotal + 1);
      } else {
        cardMap.set(lastGame, 1);
      }
    } else {
      if (cardMap.has(localCurrentGameID)) {
        let newTotal = cardMap.get(localCurrentGameID);
        if (newTotal) {
          cardMap.set(localCurrentGameID, newTotal + 1);
        }
      } else {
        cardMap.set(localCurrentGameID, 1);
      }
    }

    localNumberOfNewCards -= 1;
    localCurrentGameID += 1;
  }

  console.log("at the end it looks like this:", cardMap, "\n\n\n");
};

const a = () => {
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

  console.log(runningTotal);
};

a();
