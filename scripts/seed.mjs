// scripts/seed.mjs  —  run: node scripts/seed.mjs
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// Read MONGODB_URI from process.env or .env.local
let uri = process.env.MONGODB_URI;
if (!uri) {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/MONGODB_URI=(.*)/);
      if (match) uri = match[1].trim();
    }
  } catch (_) {}
}

if (!uri) {
  console.error('Error: Please provide MONGODB_URI via environment variable or .env.local');
  process.exit(1);
}

const entries = [
  // ── Bioplastics (demo story) ──────────────────────────────────────────────
  {
    title: 'Biodegradable plastic film from banana peel starch and glycerol',
    field: 'Materials',
    hypothesis: 'Banana peel starch (~4% dry weight) combined with glycerol as a plasticiser can form a self-supporting flexible film suitable as a single-use packaging substitute.',
    method: 'Boiled 300 g fresh banana peel in 500 mL distilled water for 20 min. Filtered pulp, added 15 mL glycerol, cast 3 mm thick onto glass plates, air-dried at 25 °C for 72 h.',
    outcome: 'Film remained tacky after 72 h, then cracked and developed visible mold colonies by day 5. Tensile strength was immeasurable — samples disintegrated on handling.',
    probable_reason: 'Banana peel starch content is too low (~3–4%) relative to the glycerol load, leaving a water-rich, non-cross-linked matrix. No antimicrobial agent was included and ambient drying temperature allowed mold growth. A higher starch concentration or chemical cross-linking (e.g., citric acid) is needed.',
    tags: ['bioplastic', 'banana-peel', 'starch', 'glycerol', 'film-casting'],
    image_url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'A. Thomas',
    contributor_email: 'athomas@example.edu',
  },
  {
    title: 'Bioplastic from banana peel cellulose fibre alone without a binder',
    field: 'Materials',
    hypothesis: 'Compressed banana peel cellulose fibre, without added starch or synthetic binder, will self-bond under 5 MPa pressure into a rigid sheet due to inter-fibre hydrogen bonding.',
    method: 'Dried banana peel at 60 °C for 24 h, ball-milled to fine powder, hot-pressed at 5 MPa and 120 °C for 10 min in a 10 × 10 cm steel mold.',
    outcome: 'Sheet crumbled immediately upon demolding. Scanning electron micrograph showed no fibre fusion — only loosely packed particles.',
    probable_reason: 'Cellulose fibre alone does not form a continuous matrix without a compatibiliser, plasticiser, or sufficient hemicellulose acting as a natural binder. Banana peel has very low lignin content, so thermal lignin-flow bonding (common in wood-based boards) does not occur here.',
    tags: ['bioplastic', 'banana-peel', 'cellulose', 'hot-press', 'no-binder'],
    image_url: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'R. Menon',
  },

  // ── Chemistry ──────────────────────────────────────────────────────────────
  {
    title: 'Room-temperature green synthesis of silver nanoparticles using green tea extract',
    field: 'Chemistry',
    hypothesis: 'Polyphenols in green tea extract will reduce silver nitrate to Ag⁰ nanoparticles at room temperature without any added surfactant or capping agent.',
    method: 'Mixed 5 mL green tea extract (10 g/L, filtered) with 50 mL 1 mM AgNO₃ at 25 °C, stirred 2 h.',
    outcome: 'UV-Vis showed a weak, broad plasmon peak at ~450 nm. TEM revealed heavily aggregated particles (100–300 nm, polydisperse).',
    probable_reason: 'Polyphenol concentration was too low relative to Ag⁺ to ensure complete reduction; the slow kinetics allowed uncontrolled Ostwald ripening and aggregation. No capping agent (e.g., PVP) was present to stabilise nascent nuclei.',
    tags: ['nanoparticles', 'silver', 'green-chemistry', 'aggregation'],
    image_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'B. Rajan',
  },
  {
    title: 'Lycopene extraction from fresh tomato peel using ethanol',
    field: 'Chemistry',
    hypothesis: 'Ethanol is a safe, food-grade solvent that will efficiently extract lycopene from fresh tomato peel at 40 °C.',
    method: 'Homogenised 200 g fresh tomato peel in 500 mL 95% ethanol, stirred at 40 °C for 2 h, filtered, and evaporated at 40 °C under reduced pressure.',
    outcome: 'Yield: 0.09 mg lycopene / g wet peel. Literature values: 0.3–1.2 mg/g. Extract was orange-brown rather than deep red.',
    probable_reason: 'Lycopene is a highly non-polar, all-trans C₄₀ carotenoid. Ethanol has insufficient non-polarity to solvate it; hexane or acetone–hexane (1:1) mixtures are required. Mild heat may also have isomerised lycopene to less-pigmented cis-forms.',
    tags: ['lycopene', 'solvent-extraction', 'carotenoid', 'tomato'],
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'F. Agyemang',
  },
  {
    title: 'Caffeine isolation from tea leaves via single dichloromethane extraction',
    field: 'Chemistry',
    hypothesis: 'A single liquid–liquid extraction with dichloromethane after NaHCO₃ treatment will recover ~1 g pure caffeine from 50 g tea leaves.',
    method: 'Steeped 50 g tea in 500 mL boiling water 10 min. Filtered, added 5 g NaHCO₃. Extracted once with 150 mL DCM, evaporated.',
    outcome: '0.4 g crude caffeine recovered; product was greenish-grey and retained DCM smell.',
    probable_reason: 'A single extraction is insufficient; 3–4 extractions are needed for >90% recovery. NaHCO₃ co-precipitated some caffeine tannate. Inadequate evaporation left residual DCM.',
    tags: ['caffeine', 'liquid-liquid-extraction', 'tea', 'DCM'],
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'M. Patel',
  },

  // ── Biology ────────────────────────────────────────────────────────────────
  {
    title: 'Kombucha SCOBY as an antibacterial wound-dressing prototype',
    field: 'Biology',
    hypothesis: 'The bacterial cellulose membrane of a kombucha SCOBY, after sterilisation, will exhibit inhibition zones against S. aureus due to residual acetic acid and bacteriocins.',
    method: 'Grew SCOBY for 3 weeks, sterilised in 70% ethanol for 30 min, rinsed twice with sterile PBS, placed on S. aureus-inoculated MHA plates, incubated 37 °C for 24 h.',
    outcome: 'No inhibition zones detected on any replicate. SCOBY partially dissolved into the agar.',
    probable_reason: 'Ethanol sterilisation denatures the cellulose structure and removes all organic acids and live cultures responsible for antibacterial activity. The material was no longer biologically active post-treatment.',
    tags: ['kombucha', 'SCOBY', 'wound-dressing', 'S-aureus', 'bacterial-cellulose'],
    image_url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'E. Okonkwo',
  },
  {
    title: 'Neem leaf extract as foliar fungicide against tomato leaf spot',
    field: 'Biology',
    hypothesis: 'Weekly application of 5% cold-pressed neem extract will significantly reduce Alternaria leaf spot incidence on tomato plants over 5 weeks compared to an untreated control.',
    method: 'Sprayed 20 potted tomato plants (n=10 treatment, n=10 control) with 5% neem extract at 12:00 noon weekly for 5 weeks.',
    outcome: 'No statistically significant difference in leaf-spot rating between treatment and control (p=0.42, Mann–Whitney U).',
    probable_reason: 'Azadirachtin, the active compound, has a photodegradation half-life of ~1 h in full sun. Midday application left no effective residue. Sample size (n=10 per group) was also underpowered for detecting moderate effects.',
    tags: ['neem', 'fungicide', 'tomato', 'Alternaria', 'foliar-spray'],
    image_url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'P. Joseph',
  },

  // ── Computer Science / Machine Learning ───────────────────────────────────
  {
    title: 'Fine-tuning ResNet-18 on 200 smartphone leaf disease images',
    field: 'Computer Science',
    hypothesis: 'Transfer learning from ImageNet weights will allow ResNet-18 to classify 5 leaf diseases with >85% accuracy using only 200 images (40 per class).',
    method: 'Fine-tuned ResNet-18 (all layers unfrozen after epoch 5) on 200 images with random augmentation, 80/20 train-val split, Adam lr=1e-4, 30 epochs.',
    outcome: 'Training accuracy reached 100% by epoch 8; validation accuracy plateaued at 39–42% with high variance.',
    probable_reason: 'Severe overfitting caused by insufficient data. Near-duplicate images from the same leaf were split across train and val sets, inflating apparent training performance. Minimum recommended dataset is ~1,000 images per class for ResNet fine-tuning.',
    tags: ['computer-vision', 'transfer-learning', 'overfitting', 'ResNet', 'plant-disease'],
    image_url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'N. Das',
  },
  {
    title: 'GPT-2 small fine-tuned on 800 chemistry abstracts for hypothesis generation',
    field: 'Computer Science',
    hypothesis: 'A 124M parameter GPT-2 fine-tuned for 3 epochs on 800 chemistry paper abstracts will generate novel, plausible chemical hypotheses from a prompt.',
    method: 'Fine-tuned GPT-2-small on 800 PubChem-sourced abstracts (plain text, max 512 tokens) using HuggingFace Trainer, batch size 4, lr=5e-5.',
    outcome: 'Generated text was fluent but repetitive (top 5 trigrams dominated >40% of outputs) and contained invented compound names not present in any chemical database.',
    probable_reason: 'GPT-2-small lacks the parametric capacity to memorise diverse chemistry language; it collapses to high-frequency n-grams. No reinforcement from human feedback (RLHF) or factual grounding was applied.',
    tags: ['NLP', 'GPT-2', 'fine-tuning', 'chemistry', 'hallucination'],
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'L. Park',
  },

  // ── Physics / Electronics ─────────────────────────────────────────────────
  {
    title: 'Quarter-wave copper tape monopole antenna for 433 MHz LoRa sensor',
    field: 'Physics',
    hypothesis: 'A 17.3 cm copper tape strip on cardboard backing will function as a quarter-wave monopole, achieving >20 m range for a 433 MHz LoRa sensor node.',
    method: 'Cut 17.3 cm copper tape, adhered to cardboard, soldered to SMA connector, connected to Ra-02 LoRa module. Range tested in a 50 m open corridor.',
    outcome: 'Maximum reliable range: 3 m. Link margin ~15 dB worse than theoretical.',
    probable_reason: 'Copper tape on non-conductive substrate has a velocity factor < 1 (actual resonance length is shorter). No RF ground plane was provided, distorting the radiation pattern. Series resistance of tape adhesive layer added insertion loss.',
    tags: ['antenna', 'LoRa', '433MHz', 'RF', 'copper-tape'],
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'J. Abraham',
  },
  {
    title: 'Peltier TEC1-12706 as thermal cycler for PCR',
    field: 'Physics',
    hypothesis: 'Two TEC1-12706 modules driven by PWM with PID control will achieve PCR-grade temperature cycling (±0.5 °C accuracy, 3 °C/s ramp) for a standard 96-well-equivalent aluminium block.',
    method: 'PWM-driven TEC modules on 400 g aluminium block. PID tuned manually. Target steps: 95 °C (30 s), 55 °C (30 s), 72 °C (45 s) × 35 cycles.',
    outcome: 'Ramp rate: 0.8 °C/s (target 3 °C/s). Overshoot: ±4 °C at every setpoint. PCR product: faint bands with significant smearing.',
    probable_reason: 'Block thermal mass (400 g) exceeded Peltier module cooling capacity. Manual PID gains caused oscillation; the system was under-damped. Non-uniform thermal paste application created temperature gradients across wells.',
    tags: ['PCR', 'Peltier', 'thermal-cycler', 'PID', 'DIY-biology'],
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'G. Nair',
  },

  // ── Education ──────────────────────────────────────────────────────────────
  {
    title: 'Spaced repetition app (SM-2) for L2 vocabulary retention in grade-5 students',
    field: 'Education',
    hypothesis: 'Replacing 4 weeks of standard vocabulary homework with a spaced repetition flashcard app will improve post-test scores by ≥15% in grade-5 EFL learners.',
    method: 'Quasi-experimental: n=24 treatment (app), n=24 control (worksheet), 4 weeks, pre-/post-test with matched vocabulary lists.',
    outcome: 'Treatment group improved 9.2% vs control 7.8%; difference not significant (p=0.31, independent t-test).',
    probable_reason: 'Study was severely underpowered (need n≈80 per group for 80% power to detect 15% effect). App engagement dropped sharply after day 3 (median 4 min/day vs target 15 min/day) due to lack of gamification.',
    tags: ['spaced-repetition', 'vocabulary', 'EFL', 'EdTech', 'underpowered'],
    image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'H. Kimura',
  },
  {
    title: 'Collaborative Wikipedia editing as a university writing assessment',
    field: 'Education',
    hypothesis: 'Requiring undergraduate students to write and improve Wikipedia articles will produce higher-quality academic writing than traditional essay assignments, measured by analytic rubric.',
    method: 'n=42 students replaced one essay (2,000 words) with a Wikipedia contribution task (same rubric). Both groups were assessed blind by two markers.',
    outcome: 'Wikipedia group scored significantly lower on argument coherence (p=0.02) and citation quality (p=0.04). Students reported high frustration with Wikipedia editing interface.',
    probable_reason: 'Wikipedia\'s "verifiability not truth" policy conflicts with academic argumentation norms. The wiki markup learning curve consumed time that should have been spent on content. Task was not scaffolded.',
    tags: ['Wikipedia', 'writing-assessment', 'undergraduate', 'scaffolding'],
    image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'S. Osei',
  },

  // ── Environmental ──────────────────────────────────────────────────────────
  {
    title: 'Moringa seed powder coagulation for microplastic removal from drinking water',
    field: 'Environmental',
    hypothesis: 'Moringa oleifera seed powder at 1 g/L will coagulate polyethylene microbeads (100 mg/L) from water at >80% efficiency, avoiding synthetic chemical coagulants.',
    method: 'Added 1 g/L Moringa powder to 1 L spiked tap water. Jar test: 2 min rapid mix (100 rpm), 20 min slow mix (20 rpm), 30 min sedimentation.',
    outcome: 'Microplastic removal: 18%. Turbidity actually increased post-treatment due to Moringa debris.',
    probable_reason: 'Moringa coagulation relies on charge neutralisation of negatively charged colloidal particles. Polyethylene microbeads are non-polar and nearly charge-neutral; they are not susceptible to charge-based coagulation. A surfactant or hydrophobic flocculant would be needed.',
    tags: ['microplastics', 'Moringa', 'coagulation', 'water-treatment', 'PE-microbeads'],
    image_url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'T. Nguyen',
  },
  {
    title: 'Rice-husk biochar layer for arsenic removal in a household sand filter',
    field: 'Environmental',
    hypothesis: 'Adding a 5 cm layer of rice-husk biochar (pyrolysed at 500 °C) above the sand bed in a household slow-sand filter will increase arsenic(V) removal from 40% to >80%.',
    method: 'Column study: 5 cm biochar + 30 cm sand. Influent: 200 µg/L As(V) in well water. Flow rate: 0.2 m/h. Sampled every 6 h for 7 days.',
    outcome: 'Arsenic removal dropped from 40% (sand alone) to 28% (sand + biochar) after breakthrough at 18 h.',
    probable_reason: 'Rice-husk biochar at 500 °C has insufficient surface oxidation and low specific surface area for arsenate adsorption. Channelling through the loosely packed biochar layer reduced contact time. Higher pyrolysis temperature (700–800 °C) or iron-impregnation is needed.',
    tags: ['arsenic', 'biochar', 'sand-filter', 'rice-husk', 'adsorption'],
    image_url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'C. Mensah',
  },

  // ── Engineering ────────────────────────────────────────────────────────────
  {
    title: '3D-printed PLA serpentine heat exchanger for solar water pre-heating',
    field: 'Engineering',
    hypothesis: 'A 3D-printed PLA serpentine tube (0.3 mm wall, 2 m path) can pre-heat domestic water from 20 °C to 45 °C when embedded in a solar flat-plate collector operating at up to 60 °C.',
    method: 'Printed in PLA (FDM, 0.3 mm walls), pressure-tested at 3 bar, integrated into a 1 m² collector, 4-hour daily operation over 3 days at 50–62 °C fluid temperature.',
    outcome: 'PLA deformed visibly after day 2. Joints leaked on day 3. Max measurable pre-heat: 8 °C above ambient.',
    probable_reason: 'PLA glass-transition temperature is 55–60 °C, coinciding with the collector operating range. Thin 0.3 mm walls further reduced creep resistance. PETG (Tg ~85 °C) or ASA is the appropriate material for this application.',
    tags: ['3D-printing', 'PLA', 'heat-exchanger', 'solar', 'thermal-creep'],
    image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'V. Singh',
  },
  {
    title: 'DIY DVD-grating spectrometer with Raspberry Pi camera for water turbidity',
    field: 'Physics',
    hypothesis: 'A cardboard spectrometer with a DVD diffraction grating and Raspberry Pi v2 camera will measure water turbidity at 550 nm to ±5 NTU accuracy.',
    method: 'Constructed cardboard enclosure, DVD grating at 45°, RPi camera, calibrated with 4 reference turbidity standards. Tested over 5 days.',
    outcome: 'Wavelength calibration drifted ±15 nm between sessions. Same turbidity sample gave 40% measurement variation. Could not distinguish turbid samples from coloured samples.',
    probable_reason: 'LED light source (torch) had unstable spectrum and intensity (no reference beam). Grating angle not mechanically fixed — shifted between measurements. Cardboard enclosure transmitted stray light. Turbidity and colour are not separable with a single-detector spectrometer.',
    tags: ['spectrometer', 'DIY', 'Raspberry-Pi', 'turbidity', 'calibration'],
    image_url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    contributor_name: 'K. Osei',
  },
];

async function seed() {
  const client = new MongoClient(uri, {
    serverApi: { version: '1', strict: false, deprecationErrors: true },
  });
  try {
    await client.connect();
    const db = client.db('nullresult');
    const col = db.collection('entries');

    // Create text index
    await col.createIndex(
      { title: 'text', hypothesis: 'text', method: 'text', outcome: 'text', probable_reason: 'text', tags: 'text' },
      { name: 'fts', default_language: 'english' }
    ).catch(() => {});

    // Reset counter
    await db.collection('counters').deleteMany({});
    await db.collection('counters').insertOne({ _id: 'nr_seq', seq: 0 });
    await col.deleteMany({});

    const year = new Date().getFullYear();
    const docs = entries.map((e, i) => ({
      ...e,
      nr_id: `NR-${year}-${String(i + 1).padStart(4, '0')}`,
      created_at: new Date(Date.now() - (entries.length - i) * 3 * 86400000),
    }));

    await col.insertMany(docs);
    await db.collection('counters').updateOne({ _id: 'nr_seq' }, { $set: { seq: entries.length } });

    console.log(`✅ Seeded ${docs.length} entries with research preview images`);
    docs.forEach(d => console.log(`  ${d.nr_id} [${d.field}] ${d.title.slice(0, 50)}…`));
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
