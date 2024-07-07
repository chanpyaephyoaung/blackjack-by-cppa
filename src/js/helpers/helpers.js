import {
   MIN_CARD_VALUE,
   MAX_CARD_VALUE,
   MIN_SUIT_VALUE,
   MAX_SUIT_VALUE,
} from "../config/cardConfig";

// Promisifying setTimeouts
export const wait = (milliseconds) => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(), milliseconds);
   });
};

// Finding sum of values in an array
export const sumArrVals = (arr) => {
   if (arr.length === 0) return 0;
   else {
      return arr.reduce((acc, cur) => acc + cur, 0);
   }
};

// Count occurences of array elements
// Credit: https://stackoverflow.com/a/5668029
export const countArrElOccurences = (arr) => {
   const counts = {};

   for (const num of arr) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
   }

   return counts;
};

// Generate random number - Both min and max inclusive
export const generateRandNum = (min, max) => {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate random card
export const generateRandCard = (type) => {
   const suit = generateRandNum(MIN_SUIT_VALUE, MAX_SUIT_VALUE);
   const value = generateRandNum(MIN_CARD_VALUE, MAX_CARD_VALUE);

   return {
      type,
      card: {
         id: `${value}-${suit}`,
         value,
         suit,
      },
   };
};

export const updateCardsTotalScore = (scoreList) => {
   let updatedScoreForFaceCards = scoreList;
   // Set face card values to 10 if the scorelist contain face card/s
   if (scoreList.some((score) => score > 10)) {
      updatedScoreForFaceCards = scoreList.map((score) => (score > 10 ? 10 : score));
   }
   if (scoreList.includes(1) && sumArrVals(updatedScoreForFaceCards) <= 21) {
      updatedScoreForFaceCards = updatedScoreForFaceCards.map((score) =>
         score === 1 ? 11 : score
      );
   }
   if (scoreList.includes(11) && sumArrVals(updatedScoreForFaceCards) > 21) {
      updatedScoreForFaceCards = updatedScoreForFaceCards.map((score) =>
         score === 11 ? 1 : score
      );
   }

   return sumArrVals(updatedScoreForFaceCards);
};
