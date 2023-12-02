// import text from "./example.txt";
import text from "./input.txt";

const b = () => {
  let runningTotal = 0;
  text.split("\n").map((g) => {
    const gameID = g.split("Game ").at(1)?.split(":").at(0);
    const gamesStr = g.split(": ").at(1)?.split(";");

    const localMinimaMap = new Map();
    localMinimaMap.set("red", 0);
    localMinimaMap.set("green", 0);
    localMinimaMap.set("blue", 0);

    gamesStr?.map((r) => {
      const cubes = r.split(",");

      cubes.map((c) => {
        const cTrimmed = c.trim();
        const cValue = Number(cTrimmed.split(" ").at(0));

        if (cTrimmed.includes("red") && localMinimaMap.get("red") < cValue) {
          localMinimaMap.set("red", cValue);
        }
        if (cTrimmed.includes("blue") && localMinimaMap.get("blue") < cValue) {
          localMinimaMap.set("blue", cValue);
        }
        if (
          cTrimmed.includes("green") &&
          localMinimaMap.get("green") < cValue
        ) {
          localMinimaMap.set("green", cValue);
        }
      });
    });
    console.log(gameID, ":", localMinimaMap, "\n\n");
    runningTotal +=
      localMinimaMap.get("red") *
      localMinimaMap.get("blue") *
      localMinimaMap.get("green");
  });
  console.log(runningTotal);
};

b();
