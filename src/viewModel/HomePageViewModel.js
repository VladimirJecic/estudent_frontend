export default class HomePageViewModel {
  #sBarCollapsed;
  #sBarItem;
  #navigate;
  updateView;
  constructor(navigate) {
    this.#sBarCollapsed = true;
    this.#sBarItem = "rokovi";
    this.#navigate = navigate;
    this.updateView = undefined;
  }
  project = () => {
    return {
      sBarCollapsed: this.#sBarCollapsed,
      sBarItem: this.#sBarItem,
    };
  };
  handleSBCollapsing = () => {
    this.#sBarCollapsed = !this.#sBarCollapsed;
    this.updateView?.();
  };
  handleSBItemChange = (item) => {
    this.#sBarItem = item;
    this.updateView?.();
    this.#navigate?.("/home/" + this.#sBarItem);
  };
  logOut = () => {
    sessionStorage.clear();
    this.#navigate("/login");
  };
  signUp = () => {
    this.#navigate("/signUp");
  };
}
