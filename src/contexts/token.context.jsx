import { createContext, useState } from "react";

export const TokenContext = createContext({
  accessToken: null,
  setAccessToken: () => null,
});

export const TokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const value = { accessToken, setAccessToken };
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
