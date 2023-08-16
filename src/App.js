import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useState } from "react";

function App() {
  const [sBarCollapsed, setSBarCollapsed] = useState(true);
  const [sBarItem, setSBarItem] = useState("home");
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
}

export default App;
