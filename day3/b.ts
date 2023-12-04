// import text from "./example.txt";
import text from "./input.txt";

const isDigit = (char: string) => {
  return Number(char) === +char;
};

const isSymbol = (char: string) => {
  return char === "*";
};

const findNeighboringSymbol = (x: number, y: number) => {
  const grid = text.split("\n").map((r) => {
    return r.split("");
  });

  if (x !== 0) {
    // not left edge
    if (isSymbol(grid[y][x - 1])) return true; //left
  }

  if (x < grid[0].length - 1) {
    // not right edge
    if (isSymbol(grid[y][x + 1])) return true; //right
  }

  if (y !== 0) {
    // not top edge
    if (isSymbol(grid[y - 1][x])) return true; //top
  }

  if (y < grid.length - 1) {
    // not bottom edge
    if (isSymbol(grid[y + 1][x])) return true; //below
  }

  if (x > 0 && y > 0) {
    // not top left corner
    if (isSymbol(grid[y - 1][x - 1])) return true; //top left
  }

  if (x < grid[0].length - 1 && y > 0) {
    // not top right corner
    if (isSymbol(grid[y - 1][x + 1])) return true; //top right
  }

  if (x > 0 && y < grid.length - 1) {
    // not bottom left
    if (isSymbol(grid[y + 1][x - 1])) return true; //below left
  }

  if (x < grid[0].length - 1 && y < grid.length - 1) {
    // not bottom right
    if (isSymbol(grid[y + 1][x + 1])) return true; //below right
  }
};

const findNeighboringNumber = (x: number, y: number) => {
  const grid = text.split("\n").map((r) => {
    return r.split("");
  });

  const foundNeighbors = [];

  if (x !== 0) {
    // not left edge
    if (isDigit(grid[y][x - 1])) foundNeighbors.push({ y: y, x: x - 1 });
  }

  if (x < grid[0].length - 1) {
    // not right edge
    if (isDigit(grid[y][x + 1])) foundNeighbors.push({ y: y, x: x + 1 });
  }

  if (y !== 0) {
    // not top edge
    if (isDigit(grid[y - 1][x])) foundNeighbors.push({ y: y - 1, x: x });
  }

  if (y < grid.length - 1) {
    // not bottom edge
    if (isDigit(grid[y + 1][x])) foundNeighbors.push({ y: y + 1, x: x });
  }

  if (x > 0 && y > 0) {
    // not top left corner
    if (isDigit(grid[y - 1][x - 1]))
      foundNeighbors.push({ y: y - 1, x: x - 1 });
  }

  if (x < grid[0].length - 1 && y > 0) {
    // not top right corner
    if (isDigit(grid[y - 1][x + 1]))
      foundNeighbors.push({ y: y - 1, x: x + 1 });
  }

  if (x > 0 && y < grid.length - 1) {
    // not bottom left
    if (isDigit(grid[y + 1][x - 1]))
      foundNeighbors.push({ y: y + 1, x: x - 1 });
  }

  if (x < grid[0].length - 1 && y < grid.length - 1) {
    // not bottom right
    if (isDigit(grid[y + 1][x + 1]))
      foundNeighbors.push({ y: y + 1, x: x + 1 });
  }
  return foundNeighbors;
};

// we check left and right, first we go left adding numbers get start position
// then we check right get end position
// then we add together any numbers and we get the whole number back out

const walkToFindNumber = (x: number, y: number, grid: string[][]) => {
  let localXLeft = x - 1;
  let localXRight = x + 1;

  // Scan left
  while (localXLeft >= 0 && isDigit(grid[y][localXLeft])) {
    localXLeft -= 1;
  }

  // Scan right
  while (localXRight < grid[0].length && isDigit(grid[y][localXRight])) {
    localXRight += 1;
  }

  let constructedNumber = "";
  for (let cIdx = localXLeft + 1; cIdx < localXRight; cIdx++) {
    constructedNumber += grid[y][cIdx];
  }

  return constructedNumber;
};

const b = () => {
  let globalTotal = 0;

  const referenceGrid = text
    .split("\n")
    .map((r) => {
      return r.split("");
    })
    .map((l) => {
      return l.map((c) => {
        if (isDigit(c) || isSymbol(c)) {
          return c;
        } else {
          return ".";
        }
      });
    });

  text.split("\n").map((l, yIdx) => {
    let allChars = l.split("");

    const regroupedArray = [];
    for (let idx = 0; idx < allChars.length; idx++) {
      const currentChar = allChars[idx];

      if (regroupedArray.length === 0) {
        regroupedArray.push([currentChar]);
      } else {
        if (isDigit(currentChar) && isDigit(allChars[idx - 1])) {
          regroupedArray.at(-1)?.push(currentChar);
        } else if (allChars[idx - 1] === "." && !isDigit(currentChar)) {
          regroupedArray.at(-1)?.push(currentChar);
        } else {
          regroupedArray.push([currentChar]);
        }
      }
    }

    let currentPositionX = 0;

    regroupedArray.map((r) => {
      const firstChar = r.at(0);

      if (firstChar && isDigit(firstChar)) {
        let numberRange = r.length - 1;

        let startX = currentPositionX;
        let endX = numberRange + currentPositionX;

        let foundSymbol = false;
        while (numberRange >= 0 && !foundSymbol) {
          foundSymbol = findNeighboringSymbol(startX, yIdx) ?? false;

          if (foundSymbol) {
            break;
          }
          startX += 1;
          numberRange -= 1;
        }

        if (!foundSymbol) {
          while (endX >= 0 && referenceGrid[yIdx][endX] !== ".") {
            referenceGrid[yIdx][endX] = ".";

            endX -= 1;
          }
        }

        currentPositionX += r.length;
        foundSymbol = false;
      } else {
        currentPositionX += r.length;
      }
    });
  });

  referenceGrid.map((l, lIdx) => {
    l.map((c, cIdx) => {
      if (isSymbol(c)) {
        const foundNeighbors = findNeighboringNumber(cIdx, lIdx);

        // if y is the same and x is + / - 1 then we remove one

        const tagYs = new Map();

        foundNeighbors.map((pair) => {
          if (!tagYs.has(pair.y)) {
            tagYs.set(pair.y, [pair.x]);
          } else {
            let arrayToCheck = tagYs.get(pair.y);

            if (
              arrayToCheck.includes(pair.x - 1) ||
              arrayToCheck.includes(pair.x + 1)
            ) {
            } else {
              arrayToCheck.push(pair.x);
              tagYs.set(pair.y, arrayToCheck);
            }
          }
        });
        if (foundNeighbors.length > 0) {

          const foundNumbers: string[] = [];

          tagYs.forEach((val: number[], key: number) => {
            if (!val || val.length <= 0) return;

            if (typeof val.at(0) === "undefined") return;

            if (val.length === 2) {
              let fNumber1 = walkToFindNumber(val.at(0), key, referenceGrid);
              foundNumbers.push(fNumber1);
              let fNumber2 = walkToFindNumber(val.at(1), key, referenceGrid);
              foundNumbers.push(fNumber2);
            } else {
              let fNumber = walkToFindNumber(val.at(0), key, referenceGrid);
              foundNumbers.push(fNumber);
            }
          });

          if (foundNumbers.length === 2) {
            const validParts = foundNumbers;

            globalTotal += Number(validParts.at(0)) * Number(validParts.at(1));
          } else {
          }
        }
      }
    });
  });

  console.log(globalTotal);
};

b();
