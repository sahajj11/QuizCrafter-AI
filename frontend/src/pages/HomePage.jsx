import React from 'react'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import DashboardLayout from '../components/Test'

import SignUp from './SignUp'

const HomePage = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <Testimonials />
    <Footer />
    
   
    </>
  )
}

export default HomePage
