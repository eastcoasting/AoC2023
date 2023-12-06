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
  let raceExampleData = [
    { time: 7, distance: 9 },
    { time: 15, distance: 40 },
    { time: 30, distance: 200 },
  ];

  let raceInputData = [
    { time: 58, distance: 478 },
    { time: 99, distance: 2232 },
    { time: 64, distance: 1019 },
    { time: 69, distance: 1071 },
  ];

  const result: number[] = raceInputData.reduce((prev, curr) => {
    let localMax = calculateDistance(curr);

    prev.push(localMax);
    return prev;
  }, []);

  console.log(result);
};

a();
