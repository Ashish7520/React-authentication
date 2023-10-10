import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLogin: false,
  login: (token) => {},
  logOut: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const isLogin = !!token;

  const loginHander = (token) => {
    console.log(token);
    setToken(token);
  };

  const logOutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLogin: isLogin,
    login: loginHander,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
