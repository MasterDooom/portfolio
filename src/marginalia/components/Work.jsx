import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "./ChapterHeader.jsx";
import { SITE } from "../config.jsx";
import { WORKS } from "../data/works.js";
import "./Work.css";

const CATEGORIES = ["All", "Academic", "Sport", "Innovation", "Collection"];

export default function Work() {
  const reduce = useReducedMotion();
  const { work } = SITE;
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const visible = WORKS.filter((entry) => filter === "All" || entry.category === filter);

  useEffect(() => {
    if (!selected) return undefined;
    const previousFocus = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
    };
  }, [selected]);

  return (
    <section id="work" className="r-work" aria-label="Honours and milestones">
      <div className="r-work__container">
        <div className="r-work__header">
          <ChapterHeader align="center" numeral={work.numeral} label={work.label} title={work.title} lede={work.lede} />
        </div>
        <div className="r-work__filters" role="group" aria-label="Filter achievements">
          {CATEGORIES.map((category) => (
            <button
              type="button"
              key={category}
              className="r-work__filter"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <motion.ul layout className="r-work__grid" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visible.map((entry, index) => (
              <WorkCard key={entry.id} work={entry} index={index} reduce={reduce} onOpen={() => setSelected(entry)} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="r-dossier-backdrop"
            role="presentation"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => { if (event.currentTarget === event.target) setSelected(null); }}
          >
            <motion.section
              className="r-dossier"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dossier-title"
              initial={reduce ? false : { opacity: 0, y: 22, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: .98 }}
              transition={{ duration: .3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="r-dossier__top">
                <span>{selected.numeral} / {selected.category} dossier</span>
                <button type="button" className="r-dossier__close" autoFocus onClick={() => setSelected(null)} aria-label="Close achievement dossier">×</button>
              </div>
              <h2 id="dossier-title">{selected.title}</h2>
              <p className="r-dossier__dek">{selected.detail}</p>
              <div className="r-dossier__evidence">
                <div className="r-dossier__evidence-label">Evidence to attach</div>
                <p>{selected.evidence}</p>
              </div>
              <ul className="r-dossier__tags">
                {selected.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function WorkCard({ work, index, reduce, onOpen }) {
  return (
    <motion.li
      layout
      className="r-work__item"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .2 }}
      transition={{ duration: .65, delay: (index % 3) * .07, ease: [0.22, 1, 0.36, 1] }}
    >
      <button type="button" className="r-work__frame" onClick={onOpen} aria-label={`Open dossier for ${work.title}`}>
        <div className="r-work__frame-outer">
          <div className="r-work__frame-inner">
            <div className="r-work__canvas">
              <div className={`r-work__canvas-placeholder r-work__canvas-placeholder--${work.category.toLowerCase()}`} aria-hidden="true">
                <span className="r-work__canvas-numeral">{work.numeral}</span>
                <span className="r-work__canvas-label">{work.artLabel}</span>
              </div>
            </div>
          </div>
          <span className="r-work__plaque" aria-hidden="true">
            <span className="r-work__plaque-numeral">{work.numeral}</span>
            <span className="r-work__plaque-title">{work.title}</span>
          </span>
        </div>
      </button>
      <div className="r-work__meta">
        <h3 className="r-work__name"><button type="button" onClick={onOpen}>{work.title}</button></h3>
        <p className="r-work__role">{work.role} · <span>{work.year}</span></p>
        <p className="r-work__blurb">{work.blurb}</p>
        <ul className="r-work__tags">{work.tags.map((tag) => <li key={tag} className="r-work__tag">{tag}</li>)}</ul>
      </div>
    </motion.li>
  );
}
