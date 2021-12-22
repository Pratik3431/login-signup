import React, { useContext, useState } from "react";
import { MyContext } from "../contexts/MyContext";

function Login() {
  const { toggleNav, loginUser, isLoggedIn } = useContext(MyContext);
  const [fopass, setfopass] = useState(false);

  const changepass = () => {
    setfopass(true);
  };

  const initialState = {
    userInfo: {
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = useState(initialState);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if (data.success && data.token) {
      setState({
        ...initialState,
      });
      localStorage.setItem("loginToken", data.token);
      await isLoggedIn();
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // Show Message on Error or Success
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  const refresh = () => {
    window.location.reload();
  }

  return fopass ? (
    <>
      <div className="_loginRegister">
        <h1>Forgot Password</h1>
        <form>
          <div className="from-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="from-group">
            <button className="btn btn-primary">Reset Password</button>
          </div>
        </form>
        <div className="from-group">
          <button onClick={refresh} className="btn btn-link">
            Back to Login
          </button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="_loginRegister">
        <h1>Login</h1>
        <form onSubmit={submitForm} noValidate>
          <div className="from-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              required
              placeholder="Enter your email"
              value={state.userInfo.email}
              onChange={onChangeValue}
            />
          </div>
          <div className="from-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              required
              className="form-control"
              placeholder="Enter your password"
              value={state.userInfo.password}
              onChange={onChangeValue}
            />
          </div>
          {errorMsg}
          {successMsg}
          <div className="from-group">
            <button onClick={changepass} className="btn btn-link text-end">
              Forget Password?
            </button>
          </div>
          <div className="from-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="from-group">
          <button onClick={toggleNav} className="btn btn-link">
          Don't have an account ?
          </button>
        </div>
        
      </div>
    </>
  );
}

export default Login;
