import Hero from "../../components/Hero/Hero"
import Slider from "../../components/Slider/Slider" 
import Brands from "../../components/Brands/Brands"
import MoreModels from "../../components/MoreModels/MoreModels"
import Contacts from "../../components/Contacts/Contacts"
import FAQ from "../../components/FAQ/FAQ"
import {Helmet} from "react-helmet-async"
import {useTranslation} from "react-i18next"



export default function Home() {

  const { t } = useTranslation()

  return (
    <main className={`page`}>
      <Helmet>
        <title>{t("titles.home")}</title>
      </Helmet>
      <Hero />
      <Slider />
      <Brands />
      <MoreModels />
      <Contacts />
      <FAQ />
    </main>
  )
}