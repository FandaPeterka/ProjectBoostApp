import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";  // Import motion from framer-motion
import { SectionWrapper } from "../hoc";  // Import the SectionWrapper HOC if applicable
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas"; // Ensure the correct path to EarthCanvas
import { styles } from "../styles";


const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signup(email, password, username);
        if (res) {
            navigate('/'); // Redirects to the homepage after successful registration
        }
    };

    return (
        <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-y-auto overflow-x-hidden`}>
            <motion.div
                  variants={slideIn("left", "tween", 0.2, 1)}
                  className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
            >
<p className={styles.sectionSubText}>Join Us</p>
                <h3 className={styles.sectionHeadText}>Sign Up</h3>                <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-5'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            <span className='text-white font-medium mb-4'>Your Email</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            <span className='text-white font-medium mb-4'>Username</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
                            />
                        </label>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            <span className='text-white font-medium mb-4'>Your Password</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                </form>
            </motion.div>

            <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
            >
                <EarthCanvas />
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Signup, "signup");