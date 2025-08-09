export type AlertType = "success" | "error";

export interface AlertState {
  isVisible: boolean;
  type: AlertType;
  message: string;
}

class AlertService {
  private static _instance: AlertService;
  private listener: ((state: AlertState) => void) | null = null;
  public state: AlertState = {
    isVisible: false,
    type: "success",
    message: "",
  };

  static get instance() {
    if (!AlertService._instance) {
      AlertService._instance = new AlertService();
    }
    return AlertService._instance;
  }

  setListener(listener: (state: AlertState) => void) {
    this.listener = listener;
  }

  removeListener() {
    this.listener = null;
  }

  private notify() {
    if (this.listener) this.listener(this.state);
  }

  success(message: string) {
    this.state = { isVisible: true, type: "success", message };
    this.notify();
    setTimeout(() => this.hide(), 4000);
  }

  error(message: string) {
    this.state = { isVisible: true, type: "error", message };
    this.notify();
    setTimeout(() => this.hide(), 4000);
  }

  hide() {
    this.state = { ...this.state, isVisible: false };
    this.notify();
  }
}

const alertService = AlertService.instance;
export default alertService;
