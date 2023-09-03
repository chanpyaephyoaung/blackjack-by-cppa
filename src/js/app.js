import gameRulesModalView from "./views/modal/gameRulesModalView";
import totalBetView from "./views/totalBet/totalBetView";
import totalScoreView from "./views/totalScore/totalScoreView";
import chipsListView from "./views/chips/chipsListView";
import playerControlsRightView from "./views/playerControls/playerControlsRightView";
import { controlResetBets } from "./controllers/playerControlsControllers";
import { controlBetChipsList, controlPlaceBet } from "./controllers/chipsControllers";
import { controlTotalScore } from "./controllers/totalScoreControllers";

const init = () => {
  chipsListView.addHandlerRender(controlBetChipsList);
  chipsListView.addHandlerPlaceBet(controlPlaceBet);
  playerControlsRightView.addHandlerBtnReset(controlResetBets);
  totalScoreView.addHandlerDisplayScore(controlTotalScore);
};

init();
