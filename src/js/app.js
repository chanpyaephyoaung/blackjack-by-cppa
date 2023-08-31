import gameRulesModalView from "./views/modal/gameRulesModalView";
import { chipsList } from "./models/chipsmodel";
import chipView from "./views/chips/chipView";

const controlBetChipsList = () => {
  chipView.render(chipsList);
};

const init = () => {
  chipView.addHandlerRender(controlBetChipsList);
};

init();
