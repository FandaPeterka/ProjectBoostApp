import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    // Pokud není hook použit uvnitř AuthContextProvider, vyvolá se chyba
    if (!context) {
        throw Error("useAuthContext must be used inside AuthContextProvider");
    }

    return context;
}; 