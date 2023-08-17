import React from "react";

function ToggleMenu = ()=>{

  constructor(props){
    super(props);
    
  }
  // function collapseSideBar = ()=>{
  //   $("#sidebar").toggleClass("active");
  // }
  return (
    <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={collapseSideBar}>
      <i className="fa fa-bars"></i>
      <span className="sr-only">Toggle Menu</span>
    </button>
  );
}

export default ToggleMenu;
