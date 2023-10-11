import { useState, useRef, useContext } from "react";

import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/Auth-context";

const AuthForm = () => {
  const enteredEmail = useRef("");
  const enteredPassword = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;
    setIsLoading(true);

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=9m7T7PICwj7lHrzj9y5ktkgzEstCJo";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=9m7T7PICwj7lHrzj9y5ktkgzEstCJo";
    }

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    setIsLoading(false);
    if (res.ok) {
      const data = await res.json();

      AuthCtx.login(data.idToken);
      history.replace("/");
    } else {
      const error = await res.json();
      alert(error.error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={enteredEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={enteredPassword} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
