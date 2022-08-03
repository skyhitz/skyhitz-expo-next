import { Text, useSx, View, H1, P, Row, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import Navbar from 'app/ui/navbar'
import BackgroundImage from 'app/ui/background-image'
import Footer from 'app/ui/footer'

export function HomeScreen() {

  return (
    <BackgroundImage>
    <Navbar />
    {/* <MainWrapper /> */}
    <Footer />
  </BackgroundImage>
  )
}
