import Sidebar from "./Sidebar";
import ActiveContent from "./activeContent/ActiveContent";

const HomePage = ({ homePageViewModel }) => {
  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar
        sBarCollapsed={homePageViewModel.sBarCollapsed}
        handleSBItemChange={homePageViewModel.handleSBItemChange}
      />
      <ActiveContent
        handleSBCollapsing={homePageViewModel.handleSBCollapsing}
        prepareActiveContentNavigation={
          homePageViewModel.prepareActiveContentNavigation
        }
      />
    </div>
  );
};

export default HomePage;
