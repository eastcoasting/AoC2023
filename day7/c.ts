// import text from "./example.txt";
import text from "./input.txt";

const a = () => {
  const games = text.split("\n").map((line) => {
    const [handStr, bidStr] = line.split(" ");

    const hand = handStr.split("");
    const bid = +bidStr;

    return {
      bid: bid,
      handType: "",
      originalFullHand: handStr,
      cardMap: hand.reduce((p: Map<string, number>, c: string) => {
        if (p.has(c)) {
          let curr = p.get(c);
          if (!curr) return p;
          p.set(c, curr + 1);
        } else {
          p.set(c, 1);
        }

        return p;
      }, new Map()),
    };
  });

  const groupedCards = new Map();

  groupedCards.set("Five of a Kind", []);
  groupedCards.set("Four of a Kind", []);
  groupedCards.set("Full House", []);
  groupedCards.set("Three of a Kind", []);
  groupedCards.set("Two Pair", []);
  groupedCards.set("One Pair", []);
  groupedCards.set("High Card", []);

  const addToGroupMap = (
    type: string,
    game: {
      bid: number;
      handType: string;
      originalFullHand: string;
      cardMap: Map<string, number>;
    }
  ) => {
    let current = groupedCards.get(type);

    if (current) {
      groupedCards.set(type, [...current, game]);
    }
  };

  games.map((game) => {
    let containsJoker = game.cardMap.has("J");

    if (containsJoker) {
      let jokerSize = game.cardMap.get("J");

      if (!jokerSize) return;

      // if size is

      // one joker
      // 2 [KK J QQ]
      if (jokerSize === 1) {
        // if two pairs, and one j then full house

        if (game?.cardMap.size === 3) {
          let arrSizes: number[] = [];
          game.cardMap.forEach((c) => {
            arrSizes.push(c);
          });

          if (arrSizes.includes(3)) {
            // if j is one and one of the others is size 3 then four of a kind
            game.handType = "Four of a Kind";
            addToGroupMap("Four of a Kind", game);
          } else {
            // if j is one and one is size two then full house
            game.handType = "Full House";
            addToGroupMap("Full House", game);
          }
        }
        if (game.cardMap.size === 2) {
          // all jokers
          game.handType = "Five of a Kind";
          addToGroupMap("Five of a Kind", game);
        }
        // two of a kind becomes three
      }
      if (jokerSize > 1) {
        if (jokerSize === 2) {
          if (game.cardMap.size === 3) {
            game.handType = "Five of a Kind";
            addToGroupMap("Five of a Kind", game);
          }
          if (game.cardMap.size === 4) {
            game.handType = "Three of a Kind";
            addToGroupMap("Three of a Kind", game);
          }

          // JJ838 >> four of a kind
          // - another two becomes four
          // J68TJ >> three
          // - if size is 4 becomes 3
        }
        // two jokers

        if (jokerSize === 3) {
          // three jokers
          game.handType = "Four of a Kind";
          addToGroupMap("Four of a Kind", game);
        }
        if (jokerSize === 4) {
          // four jokers
          game.handType = "Five of a Kind";
          addToGroupMap("Five of a Kind", game);
        }
      }

      if (game?.cardMap.size === 5) {
        game.handType = "One Pair";
        addToGroupMap("One Pair", game);
      }

      if (game?.cardMap.size === 1) {
        game.handType = "Five of a Kind";
        // all jokers
        addToGroupMap("Five of a Kind", game);
      }
    } else {
      if (game?.cardMap.size === 5) {
        game.handType = "High Card";
        addToGroupMap("High Card", game);
      }
      if (game?.cardMap.size === 1) {
        game.handType = "Five of a Kind";
        addToGroupMap("Five of a Kind", game);
      }
      if (game?.cardMap.size === 2) {
        let isFullHouse = false;
        game.cardMap.forEach((c) => {
          if (c === 3) {
            isFullHouse = true;
          }
        });

        if (isFullHouse) {
          game.handType = "Full House";
          addToGroupMap("Full House", game);
        } else {
          game.handType = "Four of a Kind";
          addToGroupMap("Four of a Kind", game);
        }
      }
      if (game?.cardMap.size === 4) {
        game.handType = "One Pair";
        addToGroupMap("One Pair", game);
      }

      if (game?.cardMap.size === 3) {
        let isFullHouse = false;
        game.cardMap.forEach((c) => {
          if (c === 3) {
            isFullHouse = true;
          }
        });

        if (isFullHouse) {
          game.handType = "Three of a Kind";
          addToGroupMap("Three of a Kind", game);
        } else {
          game.handType = "Two Pair";
          addToGroupMap("Two Pair", game);
        }
      }
    }

    // console.log(game);
  });

  // A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2

  let lookupValues = {
    // A: 13,
    // K: 12,
    // Q: 11,
    // T: 10,
    // 9: 9,
    // 8: 8,
    // 7: 7,
    // 6: 6,
    // 5: 5,
    // 4: 4,
    // 3: 3,
    // 2: 2,
    // J: 1,
    
  };

  const sortingFn = (a: string, b: string) => {
    let aValues: string[] = a.split("");

    let bValues: string[] = b.split("");

    // console.log("sorting, A:", aValues, " B: ", bValues);

    let result = null;
    let index = 0;
    while (result === null && index <= aValues.length) {
      let aNumeric: number = lookupValues[aValues[index]];

      let bNumeric: number = lookupValues[bValues[index]];

      if (aNumeric && bNumeric) {
        if (aNumeric === bNumeric) {
        }
        if (aNumeric > bNumeric) {
          result = "a";
        }

        if (aNumeric < bNumeric) {
          result = "b";
        }
      }

      index++;
    }
    return result;
  };

  groupedCards.forEach(
    (
      games: {
        bid: number;
        handType: string;
        originalFullHand: string;
        cardMap: Map<string, number>;
      }[],
      key
    ) => {
      games.sort((a, b) => {
        const result = sortingFn(a.originalFullHand, b.originalFullHand);

        // console.log("higher card", result);

        if (result === "a") {
          return 1;
        }
        if (result === "b") {
          return -1;
        }
        if (result === null) {
          return 0;
        }
      });
    }
  );

  const finalOrderedResults = [
    ...groupedCards.get("High Card"),
    ...groupedCards.get("One Pair"),
    ...groupedCards.get("Two Pair"),
    ...groupedCards.get("Three of a Kind"),
    ...groupedCards.get("Full House"),
    ...groupedCards.get("Four of a Kind"),
    ...groupedCards.get("Five of a Kind"),
  ];

  //   console.log(finalOrderedResults);

  let result = finalOrderedResults
    // .filter((v) => {
    //   return v.originalFullHand.includes("J") && v.cardMap.size === 4
    // })
    .reduce((prev, curr, idx) => {
      console.log(
        //   "on rank",
        //   idx + 1,
        //   "bid",
        //   curr.bid,
        "with hand",
        curr.originalFullHand,
        "and hand",
        curr.handType,
        //   "full score",
        //   (idx + 1) * curr.bid,
        curr.cardMap,
        curr.originalFullHand.includes("J") ? "includes J" : null,
        "\n"
      );
      return (prev += curr.bid * (idx + 1));
    }, 0);

  console.log(result);
};

a();
