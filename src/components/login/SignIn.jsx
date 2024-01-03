import logo from "../../assets/logo-small.jpg";
import "../../assets/componentCSS/LoginPage.css";
import { useNavigate } from "react-router-dom";

const SignIn = ({
  errorMessage,
  changeLoginMode,
  changeUserData,
  handleLogin,
}) => {
  const navigate = useNavigate();
  return (
    <div className="wrapper fadeInDown loginRoot">
      <div className="formContent">
        <h2 className="active">Sign In</h2>
        <h2
          className="inactive underlineHover"
          onClick={() => changeLoginMode()}
        >
          Sign up
        </h2>
        <div className="fadeIn first">
          <img src={logo} className="icon" alt="User Icon" />
        </div>
        <form onSubmit={(e) => handleLogin(e, navigate)}>
          <input
            type="text"
            className="fadeIn second"
            name="indexNum"
            placeholder="index number, in format xxxx/20xx"
            onChange={(e) => {
              changeUserData(e);
            }}
          />
          <input
            type="text"
            className="fadeIn third"
            name="password"
            placeholder="password"
            onChange={(e) => changeUserData(e)}
          />
          {errorMessage && (
            <div className="warning" role="alert">
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
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
