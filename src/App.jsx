import GlobalStyles from "./components/GlobalStyles";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import Prices from "./components/Prices";
import Booking from "./components/Booking";
import Reviews from "./components/Reviews";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Prices />
      <Booking />
      <Reviews />
      <Contacts />
      <Footer />
    </>
  );
}
