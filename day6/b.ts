import text from "./example.txt";
// import text from "./input.txt";

const calculateDistance = ({
  time,
  distance,
}: {
  time: number;
  distance: number;
}) => {
  // each hold increases speeed by 1
  let countOfScenarios = 0;
  for (let index = 0; index < time; index++) {
    // calculate hold

    let holdTime = index;
    // calculate speed

    let speed = holdTime;

    // calculte distance
    let travelTime = time - holdTime;

    let runDistance = travelTime * speed;

    if (distance < runDistance) {
      countOfScenarios++;
    }
  }

  return countOfScenarios;
};

const a = () => {
  let raceExampleData = [{ time: 71530, distance: 940200 }];

  let raceInputData = [{ time: 58996469, distance: 478223210191071 }];

  const result: number[] = raceInputData.reduce((prev, curr) => {
    let localMax = calculateDistance(curr);

    prev.push(localMax);
    return prev;
  }, []);

  console.log(result);
};

a();
