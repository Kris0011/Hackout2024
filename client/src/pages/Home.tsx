import HeroSection from '../components/Herosection'
import bgImage from "../assets/Background.jpeg"

function Home() {
  return (
    <section className="bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
      <HeroSection />
    </section>
  )
}

export default Home


