import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class Login extends Component {
  state = { emailInput: "", passwordInput: "", displayErrMsg: "" };

  onChangeEmailInput = (event) => {
    this.setState({ emailInput: event.target.value });
  };

  onChangePasswordInput = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  submitLoginForm = async (event) => {
    this.setState({ displayErrMsg: "" });
    event.preventDefault();
    const { emailInput, passwordInput } = this.state;
    const {history} = this.props;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    };
    const loginResponse = await fetch(
      "http://localhost:5000/api/auth/login",
      options
    );
    const loginResponseData = await loginResponse.json();
    if (loginResponse.ok === true) {
      const jwtToken = loginResponseData.token;
      Cookies.set("jwtToken", jwtToken, { expires: 30 });
      this.setState({ displayErrMsg: "", emailInput: "", passwordInput: "" });
      console.log(loginResponseData);
      history.push('/dashboard');
    } else {
      this.setState({ displayErrMsg: loginResponseData.msg });
    }
  };

  render() {
    const { emailInput, passwordInput, displayErrMsg } = this.state;
    return (
      <div class="login-bg">
        <form class="login-form" onSubmit={this.submitLoginForm}>
          <img
            src="https://res.cloudinary.com/daxizvsge/image/upload/v1721659877/Screenshot_2024-07-22_201718_ai0imn.png"
            alt="login-logo"
            class="login-logo"
          />

          <input
            type="email"
            required
            class="email-input"
            placeholder="Enter email"
            onChange={this.onChangeEmailInput}
            value={emailInput}
          />

          <input
            type="password"
            required
            class="password-input"
            placeholder="Enter password"
            onChange={this.onChangePasswordInput}
            value={passwordInput}
          />
          {displayErrMsg && <p className="login-err-msg">{displayErrMsg}</p>}
          <button class="login-button" type="submit">
            Login
          </button>
          <p className="register-prompt">
            Didn't have an account?<Link to="/register">Create One</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
