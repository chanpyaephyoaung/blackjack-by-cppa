import playerControlsRightBtnsView from "../views/buttons/playerControlsRightBtnsView";
import playerControlsLeftBtnsView from "../views/buttons/playerControlsLeftBtnsView";

export const addInitialBtns = async () => {
   const initialBtns = [
      {
         type: "bet",
         variant: "primary",
         textSize: "reg",
      },
      {
         type: "reset",
         variant: "danger",
         textSize: "reg",
      },
   ];

   await playerControlsRightBtnsView.addBtn(initialBtns);
};

export const animateBtnsAfterBetPlaced = async () => {
   // Hide Initial Play Controls Right Buttons
   await playerControlsRightBtnsView.removeBtns(["bet", "reset"]);

   // Add Play Controls Right Play Buttons
   const playerControlsRightPlayBtns = [
      {
         type: "hit",
         variant: "primary",
         textSize: "reg",
      },
      {
         type: "stand",
         variant: "danger",
         textSize: "reg",
      },
   ];

   await playerControlsRightBtnsView.addBtn(playerControlsRightPlayBtns);

   // Add Play Controls Left Play Buttons
   const playerControlsLeftPlayBtns = [
      {
         type: "double-down",
         variant: "secondary",
         textSize: "sm",
      },
   ];

   await playerControlsLeftBtnsView.addBtn(playerControlsLeftPlayBtns);
};
