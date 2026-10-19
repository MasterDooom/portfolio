import { motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "./ChapterHeader.jsx";
import { SITE } from "../config.jsx";
import "./Stack.css";
const GROUPS=[
{title:"Languages",items:[["Python","Unmix · signal processing"],["Kotlin","Offgrid · Android"],["TypeScript","Web interfaces"],["JavaScript","Web development"]]},
{title:"Frameworks",items:[["React","Project and portfolio interfaces"],["Jetpack Compose","Android UI"],["FastAPI","Python API development"]]},
{title:"Engineering",items:[["PCA & FastICA","Audio source-separation experiments"],["TCP sockets","Two-emulator communication demo"],["NumPy / SciPy","Numerical and signal processing"]]},
{title:"Tools",items:[["Git & GitHub","Version control and project collaboration"],["Vite","Frontend development"],["Pytest / Vitest","Automated testing"]]}];
export default function Stack(){const reduce=useReducedMotion();const {stack:cfg}=SITE;return <section id="stack" className="r-stack" aria-label="Technical toolkit"><div className="r-stack__container"><div className="r-stack__header"><ChapterHeader align="left" numeral={cfg.numeral} label={cfg.label} title={cfg.title} lede={cfg.lede}/></div><div className="r-toolkit">{GROUPS.map((group,i)=><motion.article key={group.title} className="r-toolkit__group" initial={reduce?false:{opacity:0,y:16}} whileInView={reduce?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5,delay:i*.06}}><h3>{group.title}</h3><ul>{group.items.map(item=><li key={item[0]}><span>{item[0]}</span><small>{item[1]}</small></li>)}</ul></motion.article>)}</div><p className="r-stack__note">Skills are shown in context of the projects where I've applied them, not as a proficiency ranking.</p></div></section>}