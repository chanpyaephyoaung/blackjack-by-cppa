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
   // Convert face cards (J, Q, K) to 10
   let updatedScoreForFaceCards = scoreList.map((score) => (score > 10 ? 10 : score));

   // Calculate the total score considering the Aces
   let totalScore = sumArrVals(updatedScoreForFaceCards);
   let aceCount = updatedScoreForFaceCards.filter((score) => score === 1).length;

   // Handle Aces: convert them to 11 if it doesn't cause a bust
   while (aceCount > 0 && totalScore + 10 <= 21) {
      totalScore += 10; // Convert Ace from 1 to 11
      aceCount--;
   }

   return totalScore;
};
