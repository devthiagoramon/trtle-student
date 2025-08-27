import { createContext, useContext, useState } from "react";

export const NavbarContext = createContext();

export const NavbarProvider = ({children}) => {

    const [showNavbar, setShowNavbar] = useState(false);

    const handleOpenNavbar = () => {
        setShowNavbar(true);
    }

    const handleCloseNavbar = () => {
        setShowNavbar(false);
    }

    const value = {
        showNavbar,
        handleOpenNavbar,
        handleCloseNavbar
    }

    return <NavbarContext.Provider value={value}>
        {children}
    </NavbarContext.Provider>
}

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context){
        throw new Error("useNavbar deve ser usado dentro de um NavBarProvider.");
    }
    return context;
}
