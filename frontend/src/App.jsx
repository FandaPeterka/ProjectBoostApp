import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FocusBooster from "./pages/FocusBooster";
import StarsCanvas from "./pages/canvas/Stars";
import { useAuthContext } from './hooks/useAuthContext'; // Import the hook that provides auth context

const AppWrapper = () => {
    const { user } = useAuthContext(); // Destructure user directly from the context
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect user to home if they are already logged in and trying to access login or signup
        if (user && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
            navigate('/');
        }
    }, [user, navigate]); // Depend on user and navigate to handle changes

    const location = window.location.pathname;
    const isAuthPage = location === '/login' || location === '/signup';

    return (
        <div className="App relative bg-primary min-h-screen w-full overflow-y-auto z-[5000]">
            <Navbar />
            {isAuthPage && <StarsCanvas />}
            <div className="pages w-full h-full">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                    <Route path="/focus-booster" element={<FocusBooster />} />
                </Routes>
            </div>
        </div>
    );
}

const App = () => {
    return (
        <BrowserRouter>
            <AppWrapper />
        </BrowserRouter>
    );
}

export default App;