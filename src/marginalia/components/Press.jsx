import { motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "./ChapterHeader.jsx";
import { SITE } from "../config.jsx";
import "./Press.css";

const PROMPTS = [
  { n: "01", title: "The challenge", question: "What challenged me more than I expected?", note: "Use one real moment, then explain the response you chose." },
  { n: "02", title: "The shift", question: "What habit, skill, or idea did I carry forward?", note: "Connect the experience to a concrete change in how you work." },
  { n: "03", title: "The next attempt", question: "What would I do differently next time?", note: "Keep it honest and specific; growth is stronger than a perfect story." },
];

export default function Press() {
  const reduce = useReducedMotion();
  const { press } = SITE;
  return (
    <section id="press" className="r-press" aria-label="Reflections and field notes">
      <div className="r-press__container">
        <ChapterHeader align="left" numeral={press.numeral} label={press.label} title={press.title} lede={press.lede} />
        <div className="r-field-notes">
          {PROMPTS.map((item, index) => (
            <motion.article key={item.n} className="r-field-notes__item"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .3 }}
              transition={{ duration: .6, delay: index * .08, ease: [.22, 1, .36, 1] }}>
              <span className="r-field-notes__n">{item.n}</span>
              <span className="r-field-notes__label">{item.title}</span>
              <h3>{item.question}</h3>
              <p>{item.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
