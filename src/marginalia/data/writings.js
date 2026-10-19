// Selected projects. Keep claims aligned with what the current build demonstrates.
export const WRITINGS = [
  {
    id: "offgrid",
    numeral: "I",
    title: "Offgrid",
    category: "Android · Peer-to-peer systems",
    status: "MVP prototype",
    dek: "An offline-first Android messenger with a working two-emulator TCP demo and a longer-term mesh roadmap.",
    detail: "Offgrid is an offline-first Android messaging MVP with Compose screens for nearby-device discovery, chat, and emergency SOS. The current default transport is a mockable transport interface backed by a real TCP socket demo between two emulator instances; extra nearby entries on a single emulator are explicitly simulated. A legacy Wi-Fi Direct + TCP implementation is preserved as a reference, while real multi-hop relay and a hardware mesh transport remain future work. The engineering focus is making the transport boundary clear and separating demonstrated behaviour from the intended mesh-network architecture.",
    evidence: "Add a screen recording of the real two-emulator send/receive flow, a separate SOS demonstration, and screenshots of the app. Label the simulated nearby list and multi-hop hardware work accurately; do not present them as completed real-device mesh routing.",
    tags: ["Android", "Kotlin", "TCP transport", "Offline-first"],
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
