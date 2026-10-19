import { useCallback, useState } from "react";
import Marginalia from "./marginalia/Marginalia.jsx";
import Intro from "./marginalia/components/Intro.jsx";

export default function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const finishIntro = useCallback(() => setIntroVisible(false), []);
  return <>
    <Marginalia />
    {introVisible && <Intro onComplete={finishIntro} />}
  </>;
}
