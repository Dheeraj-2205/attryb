import React, { createContext, useState } from "react";
export const LoginContext = createContext();

function LoginContextProvider({ children }) {
  const [checkingError, setCheckingError] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        checkingError,
        setCheckingError,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
