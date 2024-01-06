import "../../assets/componentCSS/SuccessWindow.css";

const SuccessWindow = ({ successMessage, hideWindow }) => {
  return (
    <div className="window-background success">
      <div className="window-content">
        <div className="window-header">
          <b className="window-title col-10">Registration successful</b>
          <button className="close col-2" onClick={() => hideWindow()}>
            ×
          </button>
        </div>
        <div className="window-body">
          {successMessage?.split("\n").map((errLine, key) => {
            return (
              <p key={key} className="window-message green">
                {errLine}
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
