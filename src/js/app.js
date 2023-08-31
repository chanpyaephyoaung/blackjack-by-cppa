import gameRulesModalView from "./views/modal/gameRulesModalView";
import chipsListView from "./views/chips/chipsListView";
import { controlBetChipsList } from "./controllers/chipsControllers";

const init = () => {
  chipsListView.addHandlerRender(controlBetChipsList);
};

init();
