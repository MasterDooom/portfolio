// Selected projects. Keep claims aligned with what the current build demonstrates.
export const WRITINGS = [
  {
    id: "offgrid",
    numeral: "I",
    title: "Offgrid",
    category: "Android · Peer-to-peer systems",
    status: "Prototype in development",
    dek: "A communication app designed for when the internet is unavailable.",
    detail: "Offgrid is an Android project exploring secure, internet-free communication between nearby devices. It uses Google Nearby Connections for peer-to-peer links and is built around private messaging, mesh discovery, network visibility, hop-by-hop AES-GCM encryption, and emergency SOS broadcasting. A key engineering challenge is making multi-hop delivery work reliably across A → B → C without pretending the devices are connected directly. The portfolio should only claim relay behaviour that can be demonstrated on real devices.",
    evidence: "Add a short screen recording from real devices, a routing trace for a genuine multi-hop message, screenshots of the app, and the repository. Clearly label anything still under development.",
    tags: ["Android", "Nearby Connections", "Peer-to-peer", "Encryption"],
    href: "https://github.com/MasterDooom/offgrid",
  },
  {
    id: "unmix",
    numeral: "II",
    title: "Unmix",
    category: "Audio research · Signal processing",
    status: "In development",
    dek: "An audio source-separation project exploring ICA, PCA whitening, and FastICA.",
    detail: "Unmix explores how mixed audio can be separated into source signals. The current research direction includes PCA whitening, symmetric FastICA, synthetic mixtures, generated-audio demonstrations, and a web interface for mixing and separating tracks. Add real benchmarks and screenshots from the current build before presenting performance claims.",
    evidence: "Add the repository, a concise pipeline diagram, screenshots of the working interface, and a small table showing tested inputs and results.",
    tags: ["ICA / FastICA", "Signal processing", "Audio", "Research"],
    href: "https://github.com/MasterDooom/unmix",
  },
];
