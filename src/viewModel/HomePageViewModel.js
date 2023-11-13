/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
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
    sBarCollapsed,
    handleSBCollapsing,
    handleSBItemChange,
    sBarItem,
  };
};
export default HomePageViewModel;
