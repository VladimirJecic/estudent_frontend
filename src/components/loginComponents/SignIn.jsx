import logo from "../assets/logo-small.jpg";
import "../assets/componentCSS/LoginPage.css";

const SignIn = ({
  warningVisibility,
  handleLoginModeChange,
  handleUserDataChanged,
  handleLogin,
}) => {
  return (
    <div className="wrapper fadeInDown loginRoot">
      <div className="formContent">
        <h2 className="active" onClick={() => handleLoginModeChange()}>
          Sign In
        </h2>
        <h2
          className="inactive underlineHover"
          onClick={() => handleLoginModeChange()}
        >
          Sign up
        </h2>
        <div className="fadeIn first">
          <img src={logo} className="icon" alt="User Icon" />
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="fadeIn second"
            name="indexNum"
            placeholder="index number, in format xxxx/20xx"
            onChange={(e) => {
              handleUserDataChanged(e);
            }}
          />
          <input
            type="text"
            className="fadeIn third"
            name="password"
            placeholder="password"
            onChange={(e) => handleUserDataChanged(e)}
          />
          {warningVisibility ? (
            <p className="warning" role="alert">
              That was the wrong username or password. Please try again.
            </p>
          ) : null}
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
