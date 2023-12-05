// import text from "./example.txt";
import text from "./input.txt";

const b = () => {
  // destination range start, the source range start, and the range length.
  // seed -> soil -> fertilizer -> water -> light -> temperature -> humidity -> location

  //   seeds: 79 14 55 13

  // seed-to-soil map:
  // 50 98 2
  // 52 50 48

  //   Any source numbers that aren't mapped correspond to the same destination number. So, seed number 10 corresponds to soil number 10.

  const seeds: number[] = [];

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

  // const lookupConstructedMaps: Record<string, Map<number, number>> = {
  //   "seed-to-soil": new Map(),
  //   "soil-to-fertilizer": new Map(),
  //   "fertilizer-to-water": new Map(),
  //   "water-to-light": new Map(),
  //   "light-to-temperature": new Map(),
  //   "temperature-to-humidity": new Map(),
  //   "humidity-to-location": new Map(),
  // };

  let currentFlag: string = "";

  text.split("\n").map((line, idx) => {
    if (idx === 0) {
      const potentialSeeds = line.split(": ").at(1);
      if (potentialSeeds) {
        const seedInputData = potentialSeeds.split(" ");

        // every other item is a range, we push in that many items from start

        for (let idx = 0; idx < seedInputData.length; idx++) {
          const currentValue = seedInputData[idx];

          if (idx % 2) {
            // these are the range
            const seedRange = +currentValue;
            const seedStart = +seedInputData[idx - 1];

            for (let rangeIdx = 0; rangeIdx < seedRange; rangeIdx++) {

              let newSeedRangeItem = seedStart + rangeIdx
              seeds.push(newSeedRangeItem);

            }

            // seeds.push(...potentialSeeds.split(" "));
          }
        }
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

  const checkInRange = (
    lookupMap: {
      destinationStart: number;
      sourceStart: number;
      rangeLength: number;
    }[],
    valueToFind: number
  ) => {
    let updatedValue;

    lookupMap.filter((data) => {
      // if number to find is equal or greater than destination start and less than or equal to destination start _ rangelength
      // then number to find is value to find - destination start
      // and that number is source start + ^

      if (
        valueToFind >= data.sourceStart &&
        valueToFind <= data.sourceStart + data.rangeLength - 1
      ) {
        let offset = valueToFind - data.sourceStart;

        updatedValue = data.destinationStart + offset;
      }
    });

    if (updatedValue === undefined) {
      return valueToFind;
    } else {
      return updatedValue;
    }
  };

  const minLocation = seeds.reduce((previousMin, seed) => {
    let currentValue;

    const seedNumeric = +seed;

    // see if any of the lookup map min -> range are <> seed

    currentValue = checkInRange(lookupMaps["seed-to-soil"], seedNumeric);
    currentValue = checkInRange(lookupMaps["soil-to-fertilizer"], currentValue);
    currentValue = checkInRange(
      lookupMaps["fertilizer-to-water"],
      currentValue
    );
    currentValue = checkInRange(lookupMaps["water-to-light"], currentValue);
    currentValue = checkInRange(
      lookupMaps["light-to-temperature"],
      currentValue
    );
    currentValue = checkInRange(
      lookupMaps["temperature-to-humidity"],
      currentValue
    );
    currentValue = checkInRange(
      lookupMaps["humidity-to-location"],
      currentValue
    );

    if (currentValue < previousMin) {
      previousMin = currentValue;
    }

    return previousMin;
  }, Infinity);

  console.log(minLocation);
};

b();
