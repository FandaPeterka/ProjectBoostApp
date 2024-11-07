import React from 'react';
import './DrawerLeft.css'; // Přesvědčte se, že tento soubor správně existuje a je správně naimportovaný
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const DrawerLeft = ({ isOpen, toggleDrawer, children }) => {
    return (
        <div className={`leftDrawer ${isOpen ? 'open' : 'closed'}`}>
            <div className="leftDrawer-toggle" onClick={toggleDrawer}>
                {isOpen ? <SlArrowLeft /> : <SlArrowRight />}
            </div>
            <div className="leftDrawer-content">
                {children}
            </div>
        </div>
    );
};

export default DrawerLeft;