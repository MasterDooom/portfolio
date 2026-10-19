import { useCallback, useEffect, useState } from "react";
import Marginalia from "./marginalia/Marginalia.jsx";
import Intro from "./marginalia/components/Intro.jsx";
import About from "./marginalia/components/About.jsx";
import Writing from "./marginalia/components/Writing.jsx";
import Work from "./marginalia/components/Work.jsx";
import Stack from "./marginalia/components/Stack.jsx";
import Contact from "./marginalia/components/Contact.jsx";
import Footer from "./marginalia/components/Footer.jsx";
import Hero from "./marginalia/components/Hero.jsx";
import "./portfolio-pages.css";

const PAGES = [
  { id: "about", label: "About", numeral: "I" },
  { id: "projects", label: "Projects", numeral: "II" },
  { id: "honours", label: "Honours", numeral: "III" },
  { id: "tech-stack", label: "Tech stack", numeral: "IV" },
  { id: "contact", label: "Contact", numeral: "V" },
];
function readPage() {
  const raw = window.location.hash.replace(/^#\/?/, "").split(/[?&]/)[0];
  return PAGES.some((p) => p.id === raw) ? raw : "about";
}
function PageNav({ page }) {
  return <header className="portfolio-nav">
    <a className="portfolio-nav__brand" href="#/about" aria-label="Portfolio home">
      <span className="portfolio-nav__mark">ST</span><span>PORTFOLIO</span>
    </a>
    <nav aria-label="Main navigation">
      {PAGES.map((item) => <a key={item.id} href={`#/${item.id}`} className={page === item.id ? "is-active" : ""} aria-current={page === item.id ? "page" : undefined}>
        <span>{item.label}</span><small>{item.numeral}</small>
      </a>)}
    </nav>
  </header>;
}
function PageHeading({ page }) {
  const info = {
    projects: ["SELECTED WORK / II", "Ideas made tangible.", "Projects, experiments, and what I contributed to each."],
    honours: ["HONOURS / III", "Practice and recognition.", "A collection of milestones across mathematics, sport, and building ideas."],
    "tech-stack": ["TOOLS & METHODS / IV", "The tools behind the work.", "Languages, frameworks, and engineering concepts connected to projects where I've used them."],
    contact: ["CONTACT / V", "Let's build something useful.", "Find me online or get in touch."],
  }[page];
  return <div className="portfolio-page-heading"><p>{info[0]}</p><h1>{info[1]}</h1><div>{info[2]}</div></div>;
}
export default function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [page, setPage] = useState(() => typeof window === "undefined" ? "about" : readPage());
  const finishIntro = useCallback(() => setIntroVisible(false), []);
  useEffect(() => {
    const sync = () => setPage(readPage());
    window.addEventListener("hashchange", sync);
    if (!window.location.hash.startsWith("#/")) window.history.replaceState(null, "", window.location.pathname + window.location.search + "#/about");
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = page === "about" ? "Portfolio" : PAGES.find((p) => p.id === page)?.label + " — Portfolio";
  }, [page]);
  return <>
    <div className="portfolio-shell">
      {page !== "about" && <PageNav page={page} />}
      {page === "about" && <><Marginalia /></>}
      {page === "projects" && <><PageNav page={page} /><main className="portfolio-page portfolio-page--projects"><PageHeading page={page}/><Writing /></main><Footer /></>}
      {page === "honours" && <><main className="portfolio-page portfolio-page--honours"><PageHeading page={page}/><Work /></main><Footer /></>}
      {page === "tech-stack" && <><main className="portfolio-page portfolio-page--stack"><PageHeading page={page}/><Stack /></main><Footer /></>}
      {page === "contact" && <><main className="portfolio-page portfolio-page--contact"><PageHeading page={page}/><Contact /></main><Footer /></>}
    </div>
    {introVisible && <Intro onComplete={finishIntro} />}
  </>;
}
