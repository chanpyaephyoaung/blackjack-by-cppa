import chipsListView from "../views/chips/chipsListView";
import betAreaView from "../views/betArea/betAreaView";
import totalBetView from "../views/totalBet/totalBetView";
import { chipsList } from "../models/chipsmodel";
import { playerState } from "../models/playerState";
import { sumArrVals } from "../helpers/helpers";

export const controlBetChipsList = () => {
  chipsListView.render(chipsList);
};

export const controlPlaceBet = (placedBet) => {
  // Add the current placed bet to the player's bet list
  playerState.bets.push(placedBet);

  // Update total bets amount
  const placedBetsValsArr = playerState.bets.map((item) => +item.value);
  playerState.totalbets = sumArrVals(placedBetsValsArr);

  // Show and update total bet display on UI
  totalBetView.updateTotalBetsVal(playerState.totalbets);

  // Add bets to the bet area
  betAreaView.render(placedBet);

  console.log(playerState.bets);
};
