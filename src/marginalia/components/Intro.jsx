import { useEffect, useState } from "react";
import "./Intro.css";

const NODES = [
  [18, 34], [27, 22], [31, 47], [39, 31], [45, 17], [48, 43],
  [55, 28], [60, 50], [66, 18], [71, 37], [78, 25], [84, 45],
  [37, 65], [51, 67], [64, 65], [74, 57], [24, 57], [58, 11],
];
const EDGES = [[0,1],[0,2],[1,3],[2,3],[2,12],[3,4],[3,5],[4,6],[5,6],[5,12],[5,13],[6,7],[6,8],[6,9],[7,13],[7,14],[8,10],[9,10],[9,11],[9,14],[10,11],[11,15],[12,13],[13,14],[14,15],[1,16],[2,16],[8,17],[4,17]];

export default function Intro({ onComplete }) {
  const [burst, setBurst] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const burstAt = window.setTimeout(() => setBurst(true), reduced ? 80 : 2450);
    const finish = window.setTimeout(onComplete, reduced ? 180 : 3200);
    return () => { window.clearTimeout(burstAt); window.clearTimeout(finish); };
  }, [onComplete]);

  return <div className={`r-intro ${burst ? "is-bursting" : ""}`} aria-label="Introducing Sambhav Tade's engineering portfolio" role="status">
    <div className="r-intro__nebula" />
    <svg className="r-intro__constellation" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {EDGES.map(([a,b],i) => <line key={`e${i}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} style={{"--edge-delay":`${i*42}ms`}} />)}
      {NODES.map(([x,y],i) => <g key={`n${i}`} className="r-intro__node" style={{"--node-delay":`${i*72}ms`}}><circle className="r-intro__halo" cx={x} cy={y} r="1.8"/><circle className="r-intro__dot" cx={x} cy={y} r=".48"/></g>)}
    </svg>
    <div className="r-intro__wordmark"><span>ST</span><i>ENGINEERING PORTFOLIO · 2026</i></div>
    <div className="r-intro__title"><span>Build</span><em>what matters.</em></div>
    <div className="r-intro__rule"><i /></div>
  </div>;
}
