import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

function App() {
  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
