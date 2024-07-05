import gameRulesModalView from "./views/modal/gameRulesModalView";
import totalBetView from "./views/totalBet/totalBetView";
import totalScoreView from "./views/totalScore/totalScoreView";
import chipsListView from "./views/chips/chipsListView";
import playerControlsRightView from "./views/playerControls/playerControlsRightView";
import playerControlsLeftView from "./views/playerControls/playerControlsLeftView";
import {
   controlResetBets,
   controlInitialBet,
   controlHitNewCard,
} from "./controllers/playerControlsRightControllers";
import { controlPlayerControlsRightInitialBtns } from "./controllers/playerControlsRightControllers";
import { controlBetChipsList, controlPlaceBet } from "./controllers/chipsControllers";
import { controlTotalScore } from "./controllers/totalScoreControllers";

const init = () => {
   chipsListView.addHandlerRender(controlBetChipsList);
   chipsListView.addHandlerPlaceBet(controlPlaceBet);
   playerControlsRightView.addHandlerInitialRender(controlPlayerControlsRightInitialBtns);
   playerControlsRightView.addHandlerBtnReset(controlResetBets);
   playerControlsRightView.addHandlerBtnBet(controlInitialBet);
   playerControlsRightView.addHandlerBtnHit(controlHitNewCard);
   playerControlsLeftView.addHandlerBtnDoubleDown(() => console.log("Double down!"));

   totalScoreView.addHandlerDisplayScore(controlTotalScore);
};

init();
