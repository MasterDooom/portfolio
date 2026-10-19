import { motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "./ChapterHeader.jsx";
import { SITE } from "../config.jsx";
import "./Contact.css";

export default function Contact() {
  const reduce = useReducedMotion();
  const { contact } = SITE;
  return (
    <section id="contact" className="r-contact" aria-label="The next chapter">
      <div className="r-contact__container">
        <ChapterHeader align="left" numeral={contact.numeral} label={contact.label} title={contact.title} lede={contact.lede} />
        <motion.div className="r-next-note"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .35 }}
          transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
          <span className="r-next-note__stamp">TO BE CONTINUED</span>
          <p className="r-next-note__line">The next entry will be added when it has been <em>earned</em>.</p>
          <a href="#hero" className="r-next-note__back">Return to the opening <span aria-hidden="true">↑</span></a>
        </motion.div>
      </div>
    </section>
  );
}
