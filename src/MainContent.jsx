import Header from "./Header";
import { useState, useEffect } from "react";

function MainContent({ handleSBCollapsing, sBarItem }) {
  const [content, setContent] = useState("null");
  useEffect(() => {
    switch (sBarItem) {
      case "home":
        setContent(
          <div>
            <h2 className="mb-4">Home</h2>
            <p>Domi slatki dome.</p>
          </div>
        );
        break;
      case "about":
        setContent(
          <div>
            <h2 className="mb-4">About</h2>
            <p>
              Pricam ti pricu. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        );
        break;
      default:
        setContent(null);
    }
  }, [sBarItem]);

  return (
    <div id="content" className="p-4 p-md-5">
      <Header handleSBCollapsing={handleSBCollapsing} />
      {content}
    </div>
  );
}

export default MainContent;
