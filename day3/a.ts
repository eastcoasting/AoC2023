// import text from "./example.txt";
import text from "./input.txt";

const isDigit = (char: string) => {
  return Number(char) === +char;
};

const isSymbol = (char: string) => {
  return !isDigit(char) && char !== ".";
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

const a = () => {
  const allSymbols = new Set();

  let globalTotal = 0;

  text.split("\n").map((l, yIdx) => {
    let allChars = l.split("");

    allChars.map((c) => {
      if (isSymbol(c)) {
        allSymbols.add(c);
      }
    });

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
        const localNumberToCheck = +r.join("");

        let numberRange = r.length - 1;

        let startX = currentPositionX;
        const endX = numberRange + currentPositionX;

        let foundSymbol = false;
        while (numberRange >= 0 && !foundSymbol) {
          foundSymbol = findNeighboringSymbol(startX, yIdx) ?? false;

          if (foundSymbol) {
            globalTotal += localNumberToCheck;

            break;
          }
          startX += 1;
          numberRange -= 1;
        }

        currentPositionX += r.length;
        foundSymbol = false;
      } else {
        currentPositionX += r.length;
      }
    });
  });
  console.log(globalTotal);
};

a();
