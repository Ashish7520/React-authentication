import AuthContext from "../../store/Auth-context";
import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";

const ProfileForm = () => {
  const authctx = useContext(AuthContext);
  const token = authctx.token;
  const inputrefpassword = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredPassword = inputrefpassword.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=9m7T7PICwj7lHrzj9y5ktkgzEstCJo",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredPassword,
          returnSecureToken: false, // Change this to true
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const errorData = await response.json();
      console.log("Error:", errorData);
    }
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={inputrefpassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
