import React, { createContext, useContext, useState } from 'react';

const SteamContext = createContext();

export const useSteam = () => useContext(SteamContext);

export const SteamProvider = ({ children }) => {
  const [numberOfDots, setNumberOfDots] = useState(400);
  const [dotSpeed, setDotSpeed] = useState(1);

  const value = {
    numberOfDots, setNumberOfDots,
    dotSpeed, setDotSpeed,
  };

  return <SteamContext.Provider value={value}>{children}</SteamContext.Provider>;
};

export default SteamContext;