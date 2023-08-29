import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useState } from "react";
// import "../assets/App.scss";
// import "../assets/HomePage.css";

const HomePage = () => {
  const [sBarCollapsed, setSBarCollapsed] = useState(true);
  const [sBarItem, setSBarItem] = useState("rokovi");
  const handleSBCollapsing = () => {
    setSBarCollapsed(!sBarCollapsed);
  };
  const handleSBItemChange = (item) => {
    setSBarItem(item);
  };
  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar
        sBarCollapsed={sBarCollapsed}
        handleSBItemChange={handleSBItemChange}
      />
      <MainContent
        handleSBCollapsing={handleSBCollapsing}
        sBarItem={sBarItem}
      />
    </div>
  );
};

export default HomePage;
