import { Component } from "react";

import "./index.css";

class Register extends Component {
  state = {
    emailInput: "",
    passwordInput: "",
    roleInput: "",
    confirmPasswordInput: "",
    nameInput: "",
    displayErrorMsg: "",
  };


  makeApiCallRegister = async () => {
    const { nameInput, emailInput, passwordInput, roleInput } = this.state;
    const {history} = this.props;
    this.setState({ displayErrorMsg: "" });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        role: roleInput,
      }),
    };

    const registerResponse = await fetch(
      "http://localhost:5000/api/auth/register",
      options
    );
    const registerResponseData = await registerResponse.json();
    if (registerResponse.ok === true) {
      this.setState({
        displayErrorMsg: "",
        nameInput: "",
        emailInput: "",
        passwordInput: "",
        confirmPasswordInput: "",
        roleInput: "",
      });
      history.push('/login');
    } else {
      this.setState({ displayErrorMsg: registerResponseData.msg });
    }
  };

  onChangeEmailInput = (event) => {
    this.setState({ emailInput: event.target.value });
  };

  onChangeRoleInput = (event) => {
    this.setState({ roleInput: event.target.value });
  };

  onChangePasswordInput = (event) => {
    this.setState({ passwordInput: event.target.value });
  };
  onChangeConfirmPasswordInput = (event) => {
    this.setState({ confirmPasswordInput: event.target.value });
  };

  onChangeNameInput = (event) => {
    this.setState({ nameInput: event.target.value });
  };

  submitRegistrationForm = (event) => {
    event.preventDefault();
    const { passwordInput, confirmPasswordInput } = this.state;
    if (passwordInput !== confirmPasswordInput) {
      this.setState({
        displayErrorMsg: "Password and confirm password didn't match",
      });
    } else {
      this.makeApiCallRegister();
    }
  };

  render() {
    const {
      emailInput,
      passwordInput,
      confirmPasswordInput,
      nameInput,
      displayErrorMsg,
      roleInput
    } = this.state;
    return (
      <div class="register-bg ">
        <form class="registration-form" onSubmit={this.submitRegistrationForm}>
          <img
            src="https://res.cloudinary.com/daxizvsge/image/upload/v1721659877/Screenshot_2024-07-22_201718_ai0imn.png"
            alt="registration-logo"
            class="registration-logo"
          />
          <input
            type="text"
            required
            class="name-input"
            placeholder="Enter Name"
            onChange={this.onChangeNameInput}
            value={nameInput}
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
            type="role"
            required
            class="role-input"
            placeholder="Enter role"
            onChange={this.onChangeRoleInput}
            value={roleInput}
          />

          <input
            type="password"
            required
            class="password-input"
            placeholder="Enter password"
            onChange={this.onChangePasswordInput}
            value={passwordInput}
          />

          <input
            type="password"
            required
            class="password-input"
            placeholder="Re-type to confirm password"
            onChange={this.onChangeConfirmPasswordInput}
            value={confirmPasswordInput}
          />
          {displayErrorMsg && (
            <p className="register-error">{displayErrorMsg}</p>
          )}
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
