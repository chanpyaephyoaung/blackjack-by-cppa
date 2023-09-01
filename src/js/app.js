import gameRulesModalView from "./views/modal/gameRulesModalView";
import chipsListView from "./views/chips/chipsListView";
import { controlBetChipsList, controlPlaceBet } from "./controllers/chipsControllers";

const init = () => {
  chipsListView.addHandlerRender(controlBetChipsList);
  chipsListView.addHandlerPlaceBet(controlPlaceBet);
};

init();
