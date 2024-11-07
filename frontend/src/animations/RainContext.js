// RainContext.js
import { createContext, useContext } from 'react';

const RainContext = createContext();

export const useRain = () => useContext(RainContext);

export default RainContext;