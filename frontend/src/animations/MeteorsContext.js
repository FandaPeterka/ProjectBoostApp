// MeteorsContext.js
import { createContext, useContext } from 'react';

const MeteorsContext = createContext();

export const useMeteors = () => useContext(MeteorsContext);

export default MeteorsContext;