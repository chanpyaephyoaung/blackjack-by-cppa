import totalScoreView from "../views/totalScore/totalScoreView";
import { playerState } from "../models/playerState";

export const controlTotalScore = () => {
  totalScoreView.updateTotalScore(playerState.totalScore);
};
