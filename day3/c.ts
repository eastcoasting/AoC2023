import text from "./example.txt";
// import text from "./input.txt";

const isDigit = (char: string) => {
  return Number(char) === +char;
};

const isSymbol = (char: string) => {
  return !isDigit(char) && char !== ".";
};

const getBounds = ({
  currentIdx,
  line,
}: {
  currentIdx: number;
  line: string;
}) => {
  const remainingLine = structuredClone(line).slice(currentIdx);

  let size = 0;

  for (let bIdx = 0; bIdx < remainingLine.length; bIdx++) {
    if (isDigit(remainingLine[bIdx])) {
      size += 1;
    } else {
      break;
    }
  }
  return [currentIdx, size + currentIdx - 1];
};

const a = () => {
  text.split("\n").map((l) => {
    // walk and find numbers - get the start stop of the number then check if any sides have a symbol if so then add to array of good values and then jump to end of number found and keep moving

    let currentSkipUntil = null;

    for (let idx = 0; idx < l.length; idx++) {
      const char = l[idx];

      if (char === ".") continue;

      if (currentSkipUntil && idx < currentSkipUntil) {
        console.log("we are skipping idx", idx, "on line", l, "\n");
        continue;
      }

      if (isDigit(char)) {
        const numberBounds = getBounds({ currentIdx: idx, line: l });

        if (numberBounds.at(0) && numberBounds.at(1)) {
          let finalPosition = numberBounds.at(1);

          if (finalPosition && finalPosition >= idx) {
            console.log("setting skip to", finalPosition);
            currentSkipUntil = finalPosition;
          }
        }

        console.log("there is a number from ", numberBounds, "\n");
      } else if (isSymbol(char)) {
        // console.log(char);
      }
    }
  });
};

a();
