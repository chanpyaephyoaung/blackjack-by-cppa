import View from "../View";
import { ALERT_SHOW_ON_UI_DURATION } from "../../config/alertConfig";
import { ALERT_TOGGLE_DURATION } from "../../config/animationConfig";
import { wait } from "../../helpers/helpers";

class AlertView extends View {
  _alertContainer = document.querySelector(".alert").parentElement;
  _alert = document.querySelector(".alert");
  _alertMessageEl = document.querySelector(".alert__message");
  _alertIsShown = false;

  async showAlert(message = "Something went wrong", type = "danger") {
    if (!this._alertIsShown) {
      // Indicate that alert is currently on display
      this._alertIsShown = true;

      // Add alert type class
      this._alert.classList.add(`alert--${type}`);

      this._alertContainer.classList.remove("hidden");
      this._alertMessageEl.textContent = message;

      await wait(ALERT_SHOW_ON_UI_DURATION);
      // Add disppearing animation
      this._alert.style.animation = `disappearToBelow ${ALERT_TOGGLE_DURATION}ms ease-out forwards`;

      // Hide alert only after disappearing animation
      await wait(ALERT_TOGGLE_DURATION);
      this._alertContainer.classList.add("hidden");
      this._alert.style.animation = "";
      // Remove alert type class
      this._alert.classList.remove(`alert--${type}`);

      // Reset that alert has finished displaying
      this._alertIsShown = false;
    }
  }
}

export default new AlertView();
