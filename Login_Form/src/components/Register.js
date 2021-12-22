import React, { useContext, useState } from "react";
import { MyContext } from "../contexts/MyContext";

function Register() {
  const { toggleNav, registerUser } = useContext(MyContext);
  const initialState = {
    userInfo: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      repassword: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);

  // On Submit the Registration Form
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await registerUser(state.userInfo);
    if (data.success) {
      setState({
        ...initialState,
        successMsg: data.message,
      });
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // On change the Input Value (name, email, password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Show Message on Success or Error
  let successMsg = "";
  let errorMsg = "";

  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
    setInterval(window.location.reload(), 6000);
  }

  return (
    <div className="_loginRegister">
      <h1>Sign Up</h1>
      <form onSubmit={submitForm} noValidate>
      <div className="row">
        <div className="col from-group">
          <label>First Name</label>
          <input
            name="first_name"
            required
            type="text"
            className="form-control"
            value={state.userInfo.first_name}
            onChange={onChangeValue}
            placeholder="First Name"
          />
        </div>
        <div className="col from-group">
          <label>Last Name</label>
          <input
            name="last_name"
            required
            type="text"
            className="form-control"
            value={state.userInfo.last_name}
            onChange={onChangeValue}
            placeholder="Last Name"
          />
        </div>
        </div>
        <div className="row">
        <div className="col from-group">
          <label>Phone</label>
          <input
            name="phone"
            required
            type="text"
            maxLength="10"
            minLength="10"
            className="form-control"
            value={state.userInfo.phone}
            onChange={onChangeValue}
            placeholder="Phone Number"
          />
        </div>
        <div className="col from-group">
          <label>Email</label>
          <input
            name="email"
            required
            type="email"
            className="form-control"
            value={state.userInfo.email}
            onChange={onChangeValue}
            placeholder="Email"
          />
        </div>
        </div>
        <div  className="row my-3">
        <div className="col from-group">
          <label>Gender</label>
          </div>
          
          <div className="col from-group"> 
          <div  className="row px-3">
          <div className="col form-check">
            <input className="form-check-input" type="radio" name="gender" checked id="male" onChange={onChangeValue} />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="col form-check">
            <input className="form-check-input" type="radio" name="gender" id="female" onChange={onChangeValue} />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          </div>
        </div>
        </div>
        <div className="row">
        <div className="col from-group">
          <label>Password</label>
          <input
            name="password"
            required
            type="password"
            className="form-control"
            value={state.userInfo.password}
            onChange={onChangeValue}
            placeholder="Password"
          />
        </div>
        <div className="col from-group">
          <label>Confirm Password</label>
          <input
            name="repassword"
            required
            type="password"
            className="form-control"
            value={state.userInfo.repassword}
            onChange={onChangeValue}
            placeholder="Confirm Password"
          />
        </div>
        </div>
        {errorMsg}
        {successMsg}

        <div className="from-group mt-3">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
      <div className="from-group">
        <button onClick={toggleNav} className="btn btn-link">
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Register;
