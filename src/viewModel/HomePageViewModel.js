/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
const HomePageViewModel = () => {
  const [sBarCollapsed, setSBarCollapsed] = useState(true);
  const [sBarItem, setSBarItem] = useState("rokovi");
  const handleSBCollapsing = () => {
    setSBarCollapsed(!sBarCollapsed);
  };
  const handleSBItemChange = (item) => {
    setSBarItem(item);
  };
  const PrepareActiveContentNavigation = (navigate) => {
    useEffect(() => {
      let route = "/home/" + sBarItem;
      navigate(route);
    }, [sBarItem]);
  };

  return {
    sBarCollapsed,
    sBarItem,
    handleSBCollapsing,
    handleSBItemChange,
    prepareActiveContentNavigation: PrepareActiveContentNavigation,
  };
};
export default HomePageViewModel;
