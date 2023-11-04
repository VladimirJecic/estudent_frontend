import logo from "../../assets/logo-small.jpg";
import "../../assets/componentCSS/LoginPage.css";
import { useNavigate } from "react-router-dom";
const SignUp = ({
  warningVisibility,
  changeLoginMode,
  changeUserData,
  handleRegister,
}) => {
  const navigate = useNavigate();
  return (
    <div className="wrapper fadeInDown loginRoot">
      <div className="formContent">
        <h2
          className="inactive underlineHover"
          onClick={() => changeLoginMode()}
        >
          Sign In
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
            placeholder="username"
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
            name="confirm_password"
            placeholder="confirm password"
          />
          <br></br>
          {warningVisibility ? (
            <p className="warning" role="alert">
              That was the wrong username or password. Please try again.
            </p>
          ) : null}
          <input type="submit" className="fadeIn fourth" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
