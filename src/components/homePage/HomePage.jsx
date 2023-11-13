import Sidebar from "./Sidebar";
import ActiveContent from "./activeContent/ActiveContent";
import useHomePageViewModel from "../../viewModel/HomePageViewModel";

const HomePage = () => {
  const homePageViewModel = useHomePageViewModel();
  // console.log("HomePage rendered");
  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar
        sBarCollapsed={homePageViewModel.sBarCollapsed}
        handleSBItemChange={homePageViewModel.handleSBItemChange}
      />
      <ActiveContent
        handleSBCollapsing={homePageViewModel.handleSBCollapsing}
        sBarItem={homePageViewModel.sBarItem}
      />
    </div>
  );
};

export default HomePage;
