// import text from "./example.txt";
// import text from "./input.txt";
import fs from "fs";
const a = () => {
  // destination range start, the source range start, and the range length.
  // seed -> soil -> fertilizer -> water -> light -> temperature -> humidity -> location

  //   seeds: 79 14 55 13

  // seed-to-soil map:
  // 50 98 2
  // 52 50 48

  //   Any source numbers that aren't mapped correspond to the same destination number. So, seed number 10 corresponds to soil number 10.

  const seeds: string[] = [];

  const lookupMaps: Record<
    string,
    {
      destinationStart: number;
      sourceStart: number;
      rangeLength: number;
    }[]
  > = {
    "seed-to-soil": [],
    "soil-to-fertilizer": [],
    "fertilizer-to-water": [],
    "water-to-light": [],
    "light-to-temperature": [],
    "temperature-to-humidity": [],
    "humidity-to-location": [],
  };

  const lookupConstructedMaps: Record<string, Map<number, number>> = {
    "seed-to-soil": new Map(),
    "soil-to-fertilizer": new Map(),
    "fertilizer-to-water": new Map(),
    "water-to-light": new Map(),
    "light-to-temperature": new Map(),
    "temperature-to-humidity": new Map(),
    "humidity-to-location": new Map(),
  };

  let currentFlag: string = "";

  const text = fs.readFileSync("day5/input.txt", {
    encoding: "utf8",
    flag: "r",
  });

  text.split("\n").map((line, idx) => {
    if (idx === 0) {
      const potentialSeeds = line.split(": ").at(1);
      if (potentialSeeds) {
        seeds.push(...potentialSeeds.split(" "));
      }
    }
    if (line === "") {
      currentFlag = "";
    }
    if (
      (idx !== 0 && line.includes("seed-to-soil")) ||
      currentFlag === "seed-to-soil"
    ) {
      currentFlag = "seed-to-soil";

      if (!line.includes("seed-to-soil")) {
        let [destinationRangeStart, sourceRangeStart, rangeLength] =
          line.split(" ");

        if (destinationRangeStart && sourceRangeStart && rangeLength) {
          lookupMaps[currentFlag].push({
            destinationStart: +destinationRangeStart,
            sourceStart: +sourceRangeStart,
            rangeLength: +rangeLength,
          });
        }
      }
    }
    if (
      (idx !== 0 && line.includes("soil-to-fertilizer")) ||
      currentFlag === "soil-to-fertilizer"
    ) {
      currentFlag = "soil-to-fertilizer";

      if (!line.includes("soil-to-fertilizer")) {
        let [destinationRangeStart, sourceRangeStart, rangeLength] =
          line.split(" ");

        if (destinationRangeStart && sourceRangeStart && rangeLength) {
          lookupMaps[currentFlag].push({
            destinationStart: +destinationRangeStart,
            sourceStart: +sourceRangeStart,
            rangeLength: +rangeLength,
          });
        }
      }
    }

    if (
      (idx !== 0 && line.includes("fertilizer-to-water")) ||
      currentFlag === "fertilizer-to-water"
    ) {
      currentFlag = "fertilizer-to-water";

      if (!line.includes("fertilizer-to-water")) {
        let [destinationRangeStart, sourceRangeStart, rangeLength] =
          line.split(" ");

        if (destinationRangeStart && sourceRangeStart && rangeLength) {
          lookupMaps[currentFlag].push({
            destinationStart: +destinationRangeStart,
            sourceStart: +sourceRangeStart,
            rangeLength: +rangeLength,
          });
        }
      }
    }

    if (
      (idx !== 0 && line.includes("water-to-light")) ||
      currentFlag === "water-to-light"
    ) {
      currentFlag = "water-to-light";
      if (!line.includes("water-to-light")) {
        let [destinationRangeStart, sourceRangeStart, rangeLength] =
          line.split(" ");

        if (destinationRangeStart && sourceRangeStart && rangeLength) {
          lookupMaps[currentFlag].push({
            destinationStart: +destinationRangeStart,
            sourceStart: +sourceRangeStart,
            rangeLength: +rangeLength,
          });
        }
      }
    }

    if (
      (idx !== 0 && line.includes("light-to-temperature")) ||
      currentFlag === "light-to-temperature"
    ) {
      currentFlag = "light-to-temperature";
      if (!line.includes("light-to-temperature")) {
        let [destinationRangeStart, sourceRangeStart, rangeLength] =
          line.split(" ");

        if (destinationRangeStart && sourceRangeStart && rangeLength) {
          lookupMaps[currentFlag].push({
            destinationStart: +destinationRangeStart,
            sourceStart: +sourceRangeStart,
            rangeLength: +rangeLength,
          });
        }
      }
    }

    if (
      (idx !== 0 && line.includes("temperature-to-humidity")) ||
      currentFlag === "temperature-to-humidity"
    ) {
      currentFlag = "temperature-to-humidity";
      if (!line.includes("temperature-to-humidity")) {
        let [destinationRangeStart, sourceRangeStart, rangeLength] =
          line.split(" ");

        if (destinationRangeStart && sourceRangeStart && rangeLength) {
          lookupMaps[currentFlag].push({
            destinationStart: +destinationRangeStart,
            sourceStart: +sourceRangeStart,
            rangeLength: +rangeLength,
          });
        }
      }
    }

    if (
      (idx !== 0 && line.includes("humidity-to-location")) ||
      currentFlag === "humidity-to-location"
    ) {
      currentFlag = "humidity-to-location";
      if (!line.includes("humidity-to-location")) {
        let [destinationRangeStart, sourceRangeStart, rangeLength] =
          line.split(" ");

        if (destinationRangeStart && sourceRangeStart && rangeLength) {
          lookupMaps[currentFlag].push({
            destinationStart: +destinationRangeStart,
            sourceStart: +sourceRangeStart,
            rangeLength: +rangeLength,
          });
        }
      }
    }
  });

  Object.entries(lookupMaps).map((lookupMap) => {
    let mapping = lookupMap[0];
    let values = lookupMap[1];

    values.map((data) => {
      let currentRange = data.rangeLength;

      for (let index = 0; index < currentRange; index++) {
        lookupConstructedMaps[mapping].set(
          data.sourceStart + index,
          data.destinationStart + index
        );
      }
    });
  });

  const minLocation = seeds.reduce((previousMin, seed) => {
    let currentValue;

    const seedNumeric = +seed;

    if (lookupConstructedMaps["seed-to-soil"].has(seedNumeric)) {
      currentValue = lookupConstructedMaps["seed-to-soil"].get(seedNumeric);
    } else {
      currentValue = seedNumeric;
    }

    if (lookupConstructedMaps["soil-to-fertilizer"].has(currentValue)) {
      currentValue =
        lookupConstructedMaps["soil-to-fertilizer"].get(currentValue);
    } else {
      currentValue = currentValue;
    }

    if (lookupConstructedMaps["fertilizer-to-water"].has(currentValue)) {
      currentValue =
        lookupConstructedMaps["fertilizer-to-water"].get(currentValue);
    } else {
      currentValue = currentValue;
    }

    if (lookupConstructedMaps["water-to-light"].has(currentValue)) {
      currentValue = lookupConstructedMaps["water-to-light"].get(currentValue);
    } else {
      currentValue = currentValue;
    }

    if (lookupConstructedMaps["light-to-temperature"].has(currentValue)) {
      currentValue =
        lookupConstructedMaps["light-to-temperature"].get(currentValue);
    } else {
      currentValue = currentValue;
    }

    if (lookupConstructedMaps["temperature-to-humidity"].has(currentValue)) {
      currentValue =
        lookupConstructedMaps["temperature-to-humidity"].get(currentValue);
    } else {
      currentValue = currentValue;
    }

    if (lookupConstructedMaps["humidity-to-location"].has(currentValue)) {
      currentValue =
        lookupConstructedMaps["humidity-to-location"].get(currentValue);
    } else {
      currentValue = currentValue;
    }

    if (currentValue < previousMin) {
      previousMin = currentValue;
    }

    return previousMin;
  }, Infinity);

  console.log(minLocation);
};

a();
