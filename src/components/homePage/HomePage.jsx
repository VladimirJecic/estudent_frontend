import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import ActiveContent from "./activeContent/ActiveContent";
import HomePageViewModel from "../../viewModel/HomePageViewModel";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const viewModel = useMemo(() => new HomePageViewModel(navigate), [navigate]);
  const [viewModelState, setViewModelState] = useState(viewModel.project());

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar
        sBarCollapsed={viewModelState.sBarCollapsed}
        handleSBItemChange={viewModel.handleSBItemChange}
        logOut={viewModel.logOut}
      />
      <ActiveContent
        handleSBCollapsing={viewModel.handleSBCollapsing}
        logOut={viewModel.logOut}
        signUp={viewModel.signUp}
      />
    </div>
  );
};

export default HomePage;
