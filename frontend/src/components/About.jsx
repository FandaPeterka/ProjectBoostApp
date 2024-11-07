import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

// Modified ServiceCard to accept and display an icon
const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[200px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="h-20 w-20 mb-4" />
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
};

const About = () => {
  // Services array now includes paths to icons
  const services = [
    { title: "Projects", icon: "/project.png" },
    { title: "Task Structuring", icon: "/tasks.png" },
    { title: "SMART Goals", icon: "/goals.png" },
    { title: "Pomodoro Technique", icon: "/pomodoro.png" },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] space-y-4'
      >
        <h1 className="text-2xl font-bold">Welcome to FocusBoost!</h1>
        <p>Your ultimate tool for achieving peak concentration and productivity! Whether you're a student gearing up for exams, a professional juggling tasks, a freelancer seeking focus, or a content creator in need of uninterrupted creative time, I'm here to assist.</p>

        <h2 className="text-xl font-semibold">Here's what I can do for you:</h2>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Task Structuring:</strong> Break down your tasks into manageable chunks with set time limits to enhance your time management skills.</li>
            <li><strong>SMART Goals:</strong> I'll help you define Specific, Measurable, Achievable, Relevant, and Time-bound objectives.</li>
            <li><strong>Pomodoro Technique:</strong> Utilize focused work sessions with planned breaks to maximize efficiency without burnout.</li>
        </ul>

        <p>With a clean, minimalist interface, I promise an intuitive user experience free from distractions, allowing you to focus solely on your tasks. Ready to boost your productivity? Let's get started together!</p>
      </motion.p>
      {/* Karty se schopnostmi */}
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} title={service.title} icon={service.icon} />
        ))}
      </div>
    </>
  )
};

export default SectionWrapper(About, "about");