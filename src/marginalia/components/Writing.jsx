import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "./ChapterHeader.jsx";
import { SITE } from "../config.jsx";
import { WRITINGS } from "../data/writings.js";
import "./Writing.css";

function ProjectVisual({ type, reduce }) {
  if (type === "offgrid") return <svg className="r-project-art r-project-art--network" viewBox="0 0 520 250" role="img" aria-label="Illustration of connected devices">
    <g className="network-lines" fill="none"><path d="M65 65 L190 115 L330 45 L455 105 L365 200 L190 115 L105 200 L65 65 M190 115 L365 200 M330 45 L365 200 M105 200 L455 105"/></g>
    {[[65,65],[190,115],[330,45],[455,105],[365,200],[105,200]].map(([x,y],i)=><g key={i} className={reduce?"network-node":"network-node network-node--animated"} style={{"--node-delay":(i*.25)+"s"}}><circle cx={x} cy={y} r="24" className="node-glow"/><circle cx={x} cy={y} r={i===1?6:4} className={i===1?"node-core node-core--active":"node-core"}/></g>)}
    <text x="65" y="35">DEVICE 01</text><text x="190" y="150" textAnchor="middle">NODE</text><text x="455" y="135" textAnchor="middle">DEVICE 02</text><text x="24" y="235">PEER-TO-PEER / CONCEPT</text>
  </svg>;
  return <svg className="r-project-art r-project-art--audio" viewBox="0 0 520 250" role="img" aria-label="Audio waveforms and source separation pipeline">
    <g className="audio-grid">{Array.from({length:11},(_,i)=><line key={"v"+i} x1={25+i*47} y1="20" x2={25+i*47} y2="215"/>)}{[45,90,135,180,215].map(y=><line key={y} x1="20" y1={y} x2="500" y2={y}/>)}</g>
    {[0,1,2].map(track=><g key={track} transform={"translate(0,"+(track*58)+")"}><path className={"audio-wave audio-wave--"+track} d={Array.from({length:96},(_,i)=>{const x=22+i*5;const y=43+Math.sin(i*.42+track)*((Math.sin(i*.17+track*1.4)+1)*4+2);return (i?"L":"M")+x+" "+y}).join(" ")}/><text x="25" y="18">{["MIX","SOURCE A","SOURCE B"][track]}</text></g>)}
    <line className="audio-playhead" x1="255" y1="18" x2="255" y2="205"/><text x="24" y="239">MIX</text><text x="118" y="239">→ PCA / WHITEN</text><text x="310" y="239">→ ICA</text><text x="420" y="239">→ SOURCES</text>
  </svg>;
}
export default function Writing() {
  const reduce=useReducedMotion(); const [selected,setSelected]=useState(null);
  useEffect(()=>{if(!selected)return undefined;const previousFocus=document.activeElement;const oldOverflow=document.body.style.overflow;const onKeyDown=e=>{if(e.key==="Escape")setSelected(null);};document.body.style.overflow="hidden";document.addEventListener("keydown",onKeyDown);return()=>{document.body.style.overflow=oldOverflow;document.removeEventListener("keydown",onKeyDown);if(previousFocus&&previousFocus.focus)previousFocus.focus();};},[selected]);
  const {writing}=SITE;
  return <section id="writing" className="r-writing" aria-label="Selected projects"><div className="r-writing__container">
    <div className="r-writing__header"><ChapterHeader align="left" numeral={writing.numeral} label={writing.label} title={writing.title} lede={writing.lede}/></div>
    <div className="r-project-grid">{WRITINGS.map((project,index)=><motion.article key={project.id} className={"r-project-card r-project-card--"+project.id} initial={reduce?false:{opacity:0,y:22}} whileInView={reduce?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.6,delay:index*.1,ease:[.22,1,.36,1]}}>
      <div className="r-project-card__art"><ProjectVisual type={project.id} reduce={reduce}/><span className="r-project-card__index">{project.numeral} / SELECTED PROJECT</span></div>
      <div className="r-project-card__body"><div className="r-project-card__eyebrow">{project.category} · {project.status}</div><h3>{project.title}</h3><p>{project.dek}</p><div className="r-project-card__contribution"><span>MY CONTRIBUTIONS</span><p>{project.contribution}</p></div><ul className="r-project-dialog__tags">{project.tags.map(tag=><li key={tag}><span className="r-tech-mark" aria-hidden="true">{tag.includes("Python")?"Py":tag.includes("Kotlin")?"K":tag.includes("React")?"Re":tag.includes("TypeScript")?"TS":tag.includes("Android")?"A":tag.includes("Compose")?"Co":tag.includes("FastAPI")?"API":tag.includes("SciPy")?"Σ":tag.includes("PCA")?"∿":tag.includes("TCP")?"↔":tag.includes("NumPy")?"∑":tag.includes("Vitest")?"✓":tag.includes("Vite")?"ϟ":"⌘"}</span>{tag}</li>)}</ul>
      <div className="r-project-card__actions"><button type="button" onClick={()=>setSelected(project)}>How it works <span aria-hidden="true">↗</span></button><a href={project.href} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a></div></div>
    </motion.article>)}</div></div>
    <AnimatePresence>{selected&&<motion.div className="r-project-backdrop" role="presentation" initial={reduce?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={e=>{if(e.target===e.currentTarget)setSelected(null);}}>
      <motion.section className="r-project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={reduce?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}}>
      <div className="r-project-dialog__top"><span>{selected.numeral} / PROJECT OVERVIEW</span><button type="button" autoFocus onClick={()=>setSelected(null)} aria-label="Close project detail">×</button></div><h2 id="project-dialog-title">{selected.title}</h2><p className="r-project-dialog__dek">{selected.detail}</p><h3 className="r-project-dialog__subhead">What I worked on</h3><p className="r-project-dialog__dek">{selected.contribution}</p><ul className="r-project-dialog__tags">{selected.tags.map(tag=><li key={tag}><span className="r-tech-mark" aria-hidden="true">{tag.includes("Python")?"Py":tag.includes("Kotlin")?"K":tag.includes("React")?"Re":tag.includes("TypeScript")?"TS":tag.includes("Android")?"A":tag.includes("Compose")?"Co":tag.includes("FastAPI")?"API":tag.includes("SciPy")?"Σ":tag.includes("PCA")?"∿":tag.includes("TCP")?"↔":tag.includes("NumPy")?"∑":tag.includes("Vitest")?"✓":tag.includes("Vite")?"ϟ":"⌘"}</span>{tag}</li>)}</ul><a className="r-project-dialog__repo" href={selected.href} target="_blank" rel="noreferrer">View repository on GitHub <span aria-hidden="true">↗</span></a>
      </motion.section></motion.div>}</AnimatePresence>
  </section>;
}
