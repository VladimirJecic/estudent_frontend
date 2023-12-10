import { useState } from "react";
import Sidebar from "./Sidebar";
import ActiveContent from "./activeContent/ActiveContent";
import HomePageViewModel from "../../viewModel/HomePageViewModel";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [homePageViewModel, setHomePageViewModel] = useState(
    new HomePageViewModel(useNavigate())
  );
  homePageViewModel.updateView = () => {
    setHomePageViewModel(homePageViewModel.copy);
  };
  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar
        sBarCollapsed={homePageViewModel.sBarCollapsed}
        handleSBItemChange={homePageViewModel.handleSBItemChange}
      />
      <ActiveContent
        handleSBCollapsing={homePageViewModel.handleSBCollapsing}
      />
    </div>
  );
};

export default HomePage;
