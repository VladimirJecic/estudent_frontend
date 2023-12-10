export default class HomePageViewModel {
  sBarCollapse;
  sBarItem;
  updateView;
  navigate;
  constructor(navigate) {
    this.sBarCollapsed = true;
    this.sBarItem = "rokovi";
    this.updateView = undefined;
    this.navigate = navigate;
  }
  copy = () => {
    const copyOfThis = new HomePageViewModel(this.navigate);
    copyOfThis.sBarCollapse = this.sBarCollapse;
    copyOfThis.sBarItem = this.sBarItem;
    copyOfThis.updateView = this.sBarItem;
    return copyOfThis;
  };
  handleSBCollapsing = () => {
    this.sBarCollapsed = !this.sBarCollapsed;
    this.updateView?.();
  };
  handleSBItemChange = (item) => {
    this.sBarItem = item;
    this.updateView?.();
    this.navigate?.("/home/" + this.sBarItem);
  };
}
