import chipsListView from "../views/chips/chipsListView";
import betAreaChipsView from "../views/betArea/betAreaChipsView";
import totalBetView from "../views/totalBet/totalBetView";
import totalScoreView from "../views/totalScore/totalScoreView";
import alertView from "../views/alert/alertView";
import { chipsList } from "../models/chipsmodel";
import { playerState } from "../models/playerState";
import { sumArrVals, countArrElOccurences } from "../helpers/helpers";

export const controlBetChipsList = () => {
  chipsListView.render(chipsList);
};

// Upgrade player's bet chips history when necessary
const upgradeBetChipsListHistory = (mainChipsList, betChipListHistory) => {
  const placedBetsTypes = betChipListHistory.map(({ type }) => type);
  const chipsFrequency = countArrElOccurences(placedBetsTypes);
  let upgraded = false;

  placedBetsTypes.forEach((betType) => {
    // Info on upgrading chip
    const targetChipTypeModel = mainChipsList.find((chip) => chip.type === betType);

    // Upgrade chip if the number of a chip type reached its upgrade point
    if (chipsFrequency[betType] === targetChipTypeModel.upgrade.requiredPoint) {
      const targetChipType = targetChipTypeModel.upgrade.targetType;
      const targetChipVal = targetChipTypeModel.upgrade.targetValue;

      // Update the bet history with upgraded chip instead of degraded chips
      // [{type: 1k, value: 1000}, {type: 1k, value: 1000}] => [{type: 2k, value: 2000}]
      const upgradedChip = {
        type: targetChipType,
        value: targetChipVal,
      };

      betChipListHistory = [
        ...betChipListHistory.filter((betChip) => betChip.type !== betType),
        upgradedChip,
      ];

      // Reset that chip frequency to 0
      chipsFrequency[betType] = 0;

      upgraded = true;
    }
  });

  return upgraded ? betChipListHistory : null;
};

export const controlPlaceBet = async (placedBet) => {
  // Warn  if the player does not have enough money left to bet
  if (playerState.totalScore < placedBet.value) {
    // Show alert
    await alertView.showAlert("Not enough money!");
    return;
  }

  // Add the current placed bet to the player's bet list
  playerState.betChipListHistory.push(placedBet);

  // Update total bets amount
  const placedBetsValsArr = playerState.betChipListHistory.map(({ value }) => value);
  playerState.totalbets = sumArrVals(placedBetsValsArr);

  // Show and update total bet display on UI
  totalBetView.updateTotalBetsVal(playerState.totalbets);

  // Show and update total score display on UI
  const updatedTotalScore = playerState.totalScore - placedBet.value;
  totalScoreView.updateTotalScore(updatedTotalScore);

  // Update total score state
  playerState.totalScore = updatedTotalScore;

  // Add bets to the bet area
  betAreaChipsView.render(placedBet);

  // Upgrade bet chips history if needed
  if (upgradeBetChipsListHistory(chipsList, playerState.betChipListHistory)) {
    playerState.betChipListHistory = upgradeBetChipsListHistory(
      chipsList,
      playerState.betChipListHistory
    );
    betAreaChipsView.render(playerState.betChipListHistory);
  }
};
