import betAreaChipsView from "../views/betArea/betAreaChipsView";
import totalBetView from "../views/totalBet/totalBetView";
import totalScoreView from "../views/totalScore/totalScoreView";
import { playerState } from "../models/playerState";

export const controlResetBets = async () => {
  // Clear the bets in UI with animation
  await betAreaChipsView.clearBetAreaChips();

  // Reset player bet history, total bets and total score
  playerState.betChipListHistory = [];
  playerState.totalScore += playerState.totalbets;
  playerState.totalbets = 0;

  // Reset total bet display on UI to 0
  totalBetView.updateTotalBetsVal(0);

  // Reset total score display on UI to initial score
  totalScoreView.updateTotalScore(playerState.totalScore);
};
