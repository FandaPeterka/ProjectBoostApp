import React from 'react'
//import { About, Contact, Experience, Hero, StarsCanvas } from "./components"
import Hero from "../components/Hero"
import About from "../components/About"
import Experience from "../components/Experience"
import Contact from "../components/Contact"

const FocusBooster = () => {
  return (
   
      <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center overflow-y-auto">
              <Hero></Hero>
          </div>

          <div>
            <About></About>
            <Experience></Experience>
          </div>

          <div className="relative z-0">
            <Contact></Contact>
          </div>
      </div>
    
  )
}

export default FocusBooster





