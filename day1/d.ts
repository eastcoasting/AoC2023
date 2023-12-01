// import text from "./example.txt";
// // import text from "./input.txt";

// const validStringNumbers = [
//   "one",
//   "two",
//   "three",
//   "four",
//   "five",
//   "six",
//   "seven",
//   "eight",
//   "nine",
// ];

// const stringNumberStartChars = ["o", "t", "f", "s", "e", "n"];
// type stringNumberStartCharsType = "o" | "t" | "f" | "s" | "e" | "n";

// const moveForward = (
//   maxCharsToMove: number,
//   options: string[],
//   inputString: string
// ) => {
//   const updatedString = structuredClone(inputString).slice(0, maxCharsToMove);

//   let convertedFoundNumber = null;

//   options.find((o) => {
//     if (updatedString.includes(o)) {
//       convertedFoundNumber = validStringNumbers.findIndex((n) => {
//         return n === o;
//       });
//     }
//   });
//   return convertedFoundNumber;
// };

// const checkIfStringNumber = (
//   foundChar: stringNumberStartCharsType | string,
//   inputString: string
// ) => {
//   let finalFoundNumber;
//   if (foundChar === "o" && moveForward(3, ["one"], inputString)) {
//     finalFoundNumber = moveForward(3, ["one"], inputString);

//     console.log('we found one', finalFoundNumber)
//     return finalFoundNumber;
//   }

//   if (foundChar === "t" && moveForward(5, ["two", "three"], inputString)) {
//     finalFoundNumber = moveForward(5, ["two", "three"], inputString);
//     return finalFoundNumber;
//   }

//   //   if (foundChar === "f") {
//   //     // move three more
//   //   }
//   //   if (foundChar === "s") {
//   //     // move four more
//   //   }
//   //   if (foundChar === "e") {
//   //     // move five more
//   //   }
//   //   if (foundChar === "n") {
//   //     // move three more
//   //   }
//   //   if (finalFoundNumber) {
//   //     return finalFoundNumber;
//   //   }
// };

// const b = () => {
//   let currNumArray: string[] = [];

//   text.split("\n").map((l, idx) => {
//     currNumArray[idx] = "";

//     for (let index = 0; index < l.length; index++) {
//       const currChar = l[index];

//       if (stringNumberStartChars.includes(currChar)) {

//         const value = checkIfStringNumber(
//           currChar,
//           structuredClone(l).slice(index)
//         );

//         if (value !== null && value !== undefined) {
//           //   console.log("we found", value);
//         }
//       }
//     }

//     //     l.split("").map((c) => {
//     //       if (Number(c) === +c && c !== undefined) {

//     // if ()

//     //         currNumArray[idx] += c;
//     //   }
//     // });
//   });

//   //   const conformedNumbers = currNumArray.map((nL) => {
//   //     if (!nL) return;

//   //     if (nL.length === 2) return nL;

//   //     if (nL.length === 1 && nL.at(0) !== undefined) {
//   //       let firstN = nL.at(0);
//   //       if (firstN === undefined) return;
//   //       return firstN + firstN;
//   //     }

//   //     if (nL.length >= 2) {
//   //       let firstN = nL.at(0);
//   //       let lastN = nL.at(-1);

//   //       if (firstN && lastN) {
//   //         return firstN + lastN;
//   //       }
//   //     }
//   //   });

//   //   const result = conformedNumbers.reduce(
//   //     (acc: number, curr: string | undefined) => {
//   //       if (!curr) return acc;
//   //       acc += +curr ?? 0;
//   //       return acc;
//   //     },
//   //     0
//   //   );

//   //   console.log(result);
// };

// b();
