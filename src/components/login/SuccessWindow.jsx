import "../../assets/componentCSS/SuccessWindow.css";

const SuccessWindow = ({ title, successMessage, hideWindow }) => {
  return (
    <div className="window-background success">
      <div className="window-content">
        <div className="window-header">
          <b className="window-title col-10">{title}</b>
          <button className="close col-2" onClick={() => hideWindow()}>
            ×
          </button>
        </div>
        <div className="window-body">
          {successMessage?.split("\n").map((msgLine, key) => {
            return (
              <p key={key} className="window-message green">
                {msgLine}
                {/* <br /> */}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SuccessWindow;
