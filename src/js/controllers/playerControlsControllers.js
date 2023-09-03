import betAreaChipsView from "../views/betArea/betAreaChipsView";
import totalBetView from "../views/totalBet/totalBetView";
import { playerState } from "../models/playerState";

export const controlResetBets = async () => {
  // Clear the bets in UI with animation
  await betAreaChipsView.clearBetAreaChips();

  // Reset player's bet history
  playerState.betChipListHistory = [];

  // Reset total bet display on UI to 0
  totalBetView.updateTotalBetsVal(0);
};
