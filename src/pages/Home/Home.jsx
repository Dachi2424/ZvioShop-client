import Hero from "../../components/Hero/Hero"
import Slider from "../../components/Slider/Slider" 
import Brands from "../../components/Brands/Brands"
import Contacts from "../../components/Contacts/Contacts"
import FAQ from "../../components/FAQ/FAQ"
import { useState } from "react"


export default function Home() {

  const [closing, setClosing] = useState(false)

  return (
    <main className={`page`}>
      <Hero />
      <Slider />
      <Brands />
      <Contacts />
      <FAQ />
    </main>
  )
}