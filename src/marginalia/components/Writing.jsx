import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "./ChapterHeader.jsx";
import { SITE } from "../config.jsx";
import { WRITINGS } from "../data/writings.js";
import "./Writing.css";

export default function Writing() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!selected) return undefined;
    const previousFocus = document.activeElement;
    const onKeyDown = (event) => { if (event.key === "Escape") setSelected(null); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
    };
  }, [selected]);
  const { writing } = SITE;

  return (
    <section id="writing" className="r-writing" aria-label="Selected projects">
      <div className="r-writing__container">
        <div className="r-writing__header">
          <ChapterHeader align="left" numeral={writing.numeral} label={writing.label} title={writing.title} lede={writing.lede} />
        </div>
        <ol className="r-writing__list">
          {WRITINGS.map((project, index) => (
            <motion.li
              key={project.id}
              className="r-writing__item"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ duration: .6, delay: index * .07, ease: [0.22, 1, .36, 1] }}
            >
              <button type="button" className="r-writing__row" onClick={() => setSelected(project)}>
                <span className="r-writing__numeral">{project.numeral}</span>
                <div className="r-writing__main">
                  <h3 className="r-writing__name">{project.title}</h3>
                  <p className="r-writing__dek">{project.dek}</p>
                  <p className="r-writing__meta"><span>{project.category}</span><span aria-hidden="true">·</span><span>{project.status}</span></p>
                </div>
                <span className="r-writing__arrow" aria-hidden="true">↗</span>
              </button>
            </motion.li>
          ))}
        </ol>
        <p className="r-writing__footer-note">Select a project for a short case note. Add demo links and supporting evidence as each build matures.</p>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="r-project-backdrop" role="presentation"
            initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(event) => { if (event.currentTarget === event.target) setSelected(null); }}>
            <motion.section className="r-project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title"
              initial={reduce ? false : { opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }}>
              <div className="r-project-dialog__top"><span>{selected.numeral} / CASE NOTE</span><button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Close project detail">×</button></div>
              <h2 id="project-dialog-title">{selected.title}</h2>
              <p className="r-project-dialog__dek">{selected.detail}</p>
              <div className="r-project-dialog__evidence"><span>Next evidence to add</span><p>{selected.evidence}</p></div>
              <ul className="r-project-dialog__tags">{selected.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              {selected.href && <a className="r-project-dialog__repo" href={selected.href} target="_blank" rel="noreferrer">Open repository <span aria-hidden="true">↗</span></a>}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
