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

// const b = () => {
//   let currNumArray: string[] = [];
//   let foundStringArray: {
//     foundNumber: number | null;
//     position: number | null;
//   }[][] = [];

//   text.split("\n").map((l, idx) => {
//     validStringNumbers.forEach((stringNumber, idx) => {
//       if (l.includes(stringNumber)) {
//         let foundPosition = l.split(stringNumber).at(0)?.length;

//         if (foundStringArray[idx] !== undefined) {
//           let nFoundStringNumbers = foundStringArray[idx].length;

//           if (!foundPosition) return;
//           foundStringArray[idx][nFoundStringNumbers].position = foundPosition;
//           foundStringArray[idx][nFoundStringNumbers].foundNumber = idx + 1;
//         } else {
//           let nFoundStringNumbers = 0;

//           if (!foundPosition) return;
//           foundStringArray[idx][nFoundStringNumbers] = {
//             position: null,
//             foundNumber: null,
//           };
//           foundStringArray[idx][nFoundStringNumbers].position = foundPosition;
//           foundStringArray[idx][nFoundStringNumbers].foundNumber = idx + 1;
//         }
//       }
//     });
//   });

//   console.log(foundStringArray);

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
