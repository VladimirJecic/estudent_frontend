import logo from "../../assets/logo-small.jpg";
import "../../assets/componentCSS/LoginPage.css";
import { useNavigate } from "react-router-dom";
import SuccessWindow from "./SuccessWindow";
const SignUp = ({
  errorMessage,
  successMessage,
  changeUserData,
  handleRegister,
  hideWindow,
}) => {
  const navigate = useNavigate();
  return (
    <div className="wrapper fadeInDown loginRoot">
      {successMessage && (
        <SuccessWindow
          successMessage={successMessage}
          hideWindow={hideWindow}
        />
      )}
      <div className="formContent">
        <h2
          className="inactive underlineHover fa fa-long-arrow-left back-arrow"
          onClick={() => navigate("/home/rokovi")}
        >
          {" "}
        </h2>
        <h2 className="active">Sign up</h2>
        <div className="fadeIn first">
          <img src={logo} className="icon" alt="User Icon" />
        </div>
        <form onSubmit={(e) => handleRegister(e, navigate)}>
          <input
            type="text"
            className="fadeIn first"
            name="indexNum"
            placeholder="index number"
            onChange={(e) => {
              changeUserData(e);
            }}
          />
          <input
            type="text"
            className="fadeIn first"
            name="name"
            placeholder="full name"
            onChange={(e) => {
              changeUserData(e);
            }}
          />
          <input
            type="text"
            className="fadeIn second"
            name="password"
            placeholder="password"
            onChange={(e) => {
              changeUserData(e);
            }}
          />
          <input
            type="text"
            className="fadeIn third"
            name="confirmPassword"
            placeholder="confirm password"
            onChange={(e) => {
              changeUserData(e);
            }}
          />
          <br></br>
          {errorMessage && (
            <div className="warning">
              {errorMessage?.split(".").map((errLine, key) => {
                return (
                  <p key={key} className="errLine">
                    {errLine}
                    <br />
                  </p>
                );
              })}
            </div>
          )}
          <input type="submit" className="fadeIn fourth" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
