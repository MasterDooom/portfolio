import { useEffect } from "react";
import "./tokens.css";
import "./Marginalia.css";
import { useLenis } from "./hooks/useLenis.js";
import { SITE } from "./config.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Work from "./components/Work.jsx";
import Writing from "./components/Writing.jsx";
import Stack from "./components/Stack.jsx";
import Press from "./components/Press.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollIndex from "./components/ScrollIndex.jsx";
import "./folio-overrides.css";

export default function Marginalia() {
  useLenis();
  useEffect(() => {
    document.title = SITE.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    description.content = SITE.description;
    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.content = SITE.themeColor;
  }, []);

  return (
    <main className="r-root" style={{ "--r-font-display": '"Instrument Serif", "Fraunces", Georgia, serif' }}>
      <a href="#r-content" className="r-skip-link">Skip to content</a>
      <ScrollIndex />
      <Hero />
      <div id="r-content" />
      <About />
      <Work />
      <Writing />
      <Stack />
      <Press />
      <Contact />
      <Footer />
    </main>
  );
}
