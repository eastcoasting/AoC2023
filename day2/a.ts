// import text from "./example.txt";
import text from "./input.txt";

const a = () => {
  const RED_MAX = 12;
  const GREEN_MAX = 13;
  const BLUE_MAX = 14;

  let runningTotal = 0;
  text.split("\n").map((g) => {
    const gameID = g.split("Game ").at(1)?.split(":").at(0);
    const gamesStr = g.split(": ").at(1)?.split(";");
    let validGame = true;

    gamesStr?.map((r) => {
      const cubes = r.split(",");

      cubes.map((c) => {
        const cTrimmed = c.trim();
        const cValue = Number(cTrimmed.split(" ").at(0));

        if (cTrimmed.includes("red") && cValue > RED_MAX) {
          validGame = false;
        }
        if (cTrimmed.includes("blue") && cValue > BLUE_MAX) {
          validGame = false;
        }
        if (cTrimmed.includes("green") && cValue > GREEN_MAX) {
          validGame = false;
        }
      });
    });
    if (validGame) {
      runningTotal += Number(gameID);
    }
  });

  console.log(runningTotal);
};

a();
