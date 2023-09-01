import gameRulesModalView from "./views/modal/gameRulesModalView";
import totalBetView from "./views/totalBet/totalBetView";
import chipsListView from "./views/chips/chipsListView";
import { controlBetChipsList, controlPlaceBet } from "./controllers/chipsControllers";

const init = () => {
  chipsListView.addHandlerRender(controlBetChipsList);
  chipsListView.addHandlerPlaceBet(controlPlaceBet);
};

init();
