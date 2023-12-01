/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, React } from "react";
const HomePageViewModel = () => {
  const [sBarCollapsed, setSBarCollapsed] = useState(true);
  const [sBarItem, setSBarItem] = useState("rokovi");
  const handleSBCollapsing = () => {
    setSBarCollapsed(!sBarCollapsed);
  };
  const handleSBItemChange = (item) => {
    setSBarItem(item);
  };
  return {
    sBarItem,
    sBarCollapsed,
    handleSBCollapsing,
    handleSBItemChange,
  };
};
export default HomePageViewModel;
