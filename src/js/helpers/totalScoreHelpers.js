import totalScoreView from "../views/totalScore/totalScoreView";
import { playerState } from "../models/playerState";
import { gameState } from "../models/gameState";

export const updateTotalScoresAfterRoundEnd = () => {
   // Update total score display on UI
   totalScoreView.updateTotalScore(playerState.totalScore);
   // Set game state to ended
   gameState.hasEnded = true;
};
