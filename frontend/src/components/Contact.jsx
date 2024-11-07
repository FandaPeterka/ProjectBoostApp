import React, { useRef, useState } from "react";
import { motion } from "framer-motion";  // Import for animation effects
import emailjs from "@emailjs/browser";  // Import to handle email sending directly from the client-side

import { styles } from "../styles";  // Styles from a central style definition
import { SectionWrapper } from "../hoc";  // Higher order component for consistent section wrapping
import { slideIn } from "../utils/motion";  // Custom motion effect for component entrance

const Contact = () => {
  // Reference to the form for direct DOM manipulations or value retrieval
  const formRef = useRef();
  // Local state for form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to handle the sending/loading state of the form
  const [loading, setLoading] = useState(false);

  // Handler for form field changes, updates local state
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state to true during the sending process

    // Send email using emailjs service with environment variables for security
    emailjs
      .send(
        process.env.VITE_APP_EMAILJS_SERVICE_ID,
        process.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Fanda",
          from_email: form.email,
          to_email: "cyberfandap@seznam.cz",
          message: form.message,
        },
        process.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);  // Reset loading state on successful send
          alert("Thank you. I will get back to you as soon as possible.");
          // Clear form fields
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);  // Reset loading state on error
          console.error("Ahh, something went wrong. Please try again.");
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");