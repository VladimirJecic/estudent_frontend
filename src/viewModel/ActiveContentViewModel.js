/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
const ActiveContentViewModel = (sBarItem) => {
  const PrepareNavigation = (navigate) => {
    useEffect(() => {
      let route = "/home/" + sBarItem;
      navigate(route);
    }, [sBarItem]);
  };
  return {
    prepareNavigation: PrepareNavigation,
  };
};
export default ActiveContentViewModel;
