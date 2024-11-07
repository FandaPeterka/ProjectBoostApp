import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const MilestoneCard = ({ milestone }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        textAlign: "left",  // Ensures all text inside the card is aligned to the left
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={milestone.date}
      iconStyle={{ background: milestone.iconBg, textAlign: "center" }} // Keeps icons centered
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={milestone.icon}
            alt={milestone.category}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <h3 className='text-white text-[24px] font-bold'>{milestone.title}</h3>
      <p
        className='text-secondary text-[16px] font-semibold'
        style={{ margin: 0 }}
      >
        {milestone.category}
      </p>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {milestone.points.map((point, index) => (
          <li
            key={`milestone-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const userMilestones = [
    {
      title: "Week 1",
      category: "Initial Gains",
      icon: "climbing.png",
      iconBg: "#000000",
      date: "First Week",
      points: [
        "Introduction to core productivity techniques.",
        "First steps in utilizing the Pomodoro Technique for focused work sessions.",
        "Noticeable improvement in daily task completion."
      ],
    },
    {
      title: "Month 1",
      category: "Consolidation",
      icon: "walk.png",
      iconBg: "#000000",
      date: "One Month",
      points: [
        "Consistent use of SMART goals to refine task objectives.",
        "Improved daily planning and prioritization of tasks.",
        "Enhanced focus and reduction in procrastination.",
      ],
    },
    {
      title: "Month 3",
      category: "Advanced Techniques",
      icon: "gloves.png",
      iconBg: "#000000",
      date: "Three Months",
      points: [
        "Mastery of time management tools provided by the app.",
        "Ability to sustain longer periods of deep focus.",
        "Start of behavioral changes leading to less stress and improved work-life balance.",
      ],
    },
    {
      title: "Month 6",
      category: "Long-term Adaptation",
      icon: "angel.png",
      iconBg: "#000000",
      date: "Six Months",
      points: [
        "Full integration of productivity techniques into daily routines.",
        "Significant improvement in work output and efficiency.",
        "Positive habits solidified, leading to ongoing personal and professional development.",
      ],
    }
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Your Progress Timeline</p>
        <h2 className={styles.sectionHeadText}>Way to Better Concentration</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {userMilestones.map((milestone, index) => (
            <MilestoneCard key={index} milestone={milestone} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");