import chipsListView from "../views/chips/chipsListView";
import { chipsList } from "../models/chipsmodel";

export const controlBetChipsList = () => {
  chipsListView.render(chipsList);
};
