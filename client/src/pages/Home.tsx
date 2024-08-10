import React from 'react'
import HeroSection from '../components/Herosection'
import SimpleCards from '../components/CarouselComponent'
import bgImage from "../assets/Background.jpeg";

function Home() {
  return (
    <section 
      className="flex items-center justify-center h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
    <div>
      <HeroSection />
      <SimpleCards />
    </div>
    </section>
  );
}

export default Home


