import gameRulesModalView from "./views/modal/gameRulesModalView";
import chipsListContainerView from "./views/chips/chipsListContainerView";
import chipsListView from "./views/chips/chipsListView";
import { controlBetChipsList } from "./controllers/chipsControllers";

const init = () => {
  chipsListView.addHandlerRender(controlBetChipsList);
};

init();
