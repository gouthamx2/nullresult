-- 18 realistic failed-experiment entries for the NullResult demo
-- Run this AFTER schema.sql in the Supabase SQL editor

insert into entries (title, field, author, what_tried, what_happened, why_failed, failure_category, hours_spent) values

-- MATERIALS / BIOPLASTICS (demo story entries)
('Banana peel starch bioplastic with glycerol', 'Materials', 'A. Thomas',
 'Boiled banana peel paste with vinegar and glycerol, cast into thin sheets and air-dried at room temperature.',
 'Sheets stayed tacky for 72 h, then cracked and grew mold within a week.',
 'Peel starch content too low (~4%) and water activity too high; no antimicrobial agent or controlled drying temperature used.',
 'Wrong parameters', 40),

('Banana peel plastic using only peel fibre', 'Materials', 'R. Menon',
 'Dried banana peel, blended into a fine fibre paste, pressed into a rectangular mold at 1 MPa, no starch or binder added.',
 'Brittle pieces crumbled on demolding; tensile strength near zero.',
 'Cellulose fibre alone does not form a continuous cohesive film without a plasticiser or compatibiliser.',
 'Flawed hypothesis', 25),

('Cassava starch film plasticised with sorbitol', 'Materials', 'S. Kumar',
 'Cast cassava starch (4 g/100 mL) and sorbitol (30% w/w starch) at 60 °C for 12 h.',
 'Film was optically clear but absorbed moisture and went limp within 48 h in a humid room (RH > 70%).',
 'Hydrophilic starch matrix with no hydrophobic coating or cross-linking agent.',
 'Wrong parameters', 18),

-- AGRICULTURE
('Neem extract as a leaf-spot fungicide on tomato', 'Agriculture', 'P. Joseph',
 'Sprayed 5% neem extract (cold-pressed) weekly on 20 potted tomato plants over 5 weeks.',
 'No significant difference from the untreated control; leaf-spot progression identical in both groups.',
 'Azadirachtin degrades rapidly in UV light; extract was applied midday and likely had <2 h efficacy window. n=20 was also underpowered.',
 'Sample size', 60),

('Vermicompost tea as a seed germination booster for wheat', 'Agriculture', 'D. Osei',
 'Soaked wheat seeds in 10% vermicompost tea for 24 h before sowing in sandy loam.',
 'Germination rate 61%, slightly lower than the water-soaked control at 66%. No statistically significant effect.',
 'High microbial load in the tea may have competed with seed coat microbiome. Tea concentration possibly too high.',
 'Flawed hypothesis', 12),

-- MACHINE LEARNING / AI
('Fine-tuning ResNet18 on 200 leaf disease images', 'Machine learning', 'N. Das',
 'Trained a pretrained ResNet18 to classify 5 leaf diseases from 200 phone photos (40 per class).',
 'Validation accuracy stuck at ~40% while training accuracy hit 100% after epoch 5.',
 'Severe overfitting: too few images. Near-duplicate photos from the same plant leaked across train/val split.',
 'Data leakage', 30),

('GPT-2 fine-tune on 800 chemistry paper abstracts for hypothesis generation', 'Machine learning', 'L. Park',
 'Fine-tuned GPT-2 small (124M) on 800 chemistry abstracts for 3 epochs to generate novel hypotheses.',
 'Output sentences were grammatically correct but repetitive and contained factual hallucinations (e.g. citing non-existent compounds).',
 'Model too small and dataset too narrow; no RLHF or verification step. Outputs drifted toward the most common n-gram patterns.',
 'Flawed hypothesis', 22),

-- ELECTRONICS / HARDWARE
('Copper tape antenna for a 433 MHz sensor', 'Electronics', 'J. Abraham',
 'Built a quarter-wave monopole antenna (17.3 cm) from copper tape on a cardboard backing for a 433 MHz LoRa module.',
 'Range under 3 m, far below the 30 m target in an open corridor.',
 'Copper tape on non-conductive cardboard has high series resistance; no ground plane was included. Antenna was also slightly undersized for the velocity factor.',
 'Wrong parameters', 12),

('Peltier cooler as a low-cost PCR thermal cycler', 'Electronics', 'G. Nair',
 'Used two TEC1-12706 Peltier modules driven by a microcontroller PWM to ramp between 55 °C, 72 °C, and 95 °C for PCR.',
 'Ramp rate was 0.8 °C/s (target 3 °C/s). Temperature overshot by ±4 °C at each setpoint. PCR product was faint and contaminated.',
 'PID not tuned for the thermal mass of the aluminium block. Peltier modules underpowered for the block size; thermal paste application was uneven.',
 'Equipment problem', 48),

-- CHEMISTRY / BIOCHEMISTRY
('Extraction of lycopene from tomato peel with ethanol', 'Chemistry', 'F. Agyemang',
 'Homogenised 200 g fresh tomato peel in 500 mL ethanol, filtered, and evaporated under mild heat (40 °C).',
 'Yield was 0.09 mg/g wet weight vs. literature values of 0.3–1.2 mg/g. Extract was orange-brown rather than deep red.',
 'Lycopene is non-polar; ethanol is a poor solvent. Hexane or acetone:hexane mixtures are required. Mild heat may also have isomerised the pigment.',
 'Wrong parameters', 20),

('Room-temperature synthesis of silver nanoparticles using green tea extract', 'Chemistry', 'B. Rajan',
 'Mixed 5 mL green tea extract with 50 mL 1 mM AgNO₃ and stirred at 25 °C for 2 h.',
 'Solution turned faint yellow but UV-Vis showed a broad, weak peak at 450 nm. TEM showed aggregated particles (>200 nm).',
 'Tea polyphenol concentration was too low; reaction proceeded too slowly allowing uncontrolled aggregation. No capping agent used.',
 'Wrong parameters', 15),

-- ENVIRONMENTAL / WATER
('Moringa seed powder for microplastic removal from water', 'Environmental', 'T. Nguyen',
 'Added 1 g/L Moringa oleifera seed powder to 1 L tap water spiked with 100 mg/L polyethylene microbeads, stirred 30 min.',
 'Turbidity increased initially then settled. Microplastic removal was ~18%, far below the 80% target.',
 'Moringa coagulation works mainly on charged colloidal particles; PE microbeads are non-polar and require a different flocculant or surfactant.',
 'Flawed hypothesis', 35),

('Sand filtration biochar layer for arsenic removal', 'Environmental', 'C. Mensah',
 'Added a 5 cm biochar (rice husk, 500 °C pyrolysis) layer to a conventional sand filter for arsenic removal from well water.',
 'Arsenic removal dropped from 40% (sand only) to 28% with biochar after 3 days of operation.',
 'Rice-husk biochar at 500 °C has insufficient surface oxidation for arsenate adsorption. Channeling through the biochar layer reduced contact time.',
 'Wrong parameters', 55),

-- BIOLOGY / MICROBIOLOGY
('Kombucha SCOBY as a wound dressing prototype', 'Biology', 'E. Okonkwo',
 'Grew SCOBY mats for 3 weeks, sterilised in 70% ethanol, and applied to simulated wound agar plates inoculated with S. aureus.',
 'No inhibition zones on any plates. SCOBY mat dissolved partially in the agar.',
 'Ethanol sterilisation likely killed the beneficial bacteria and denatured the cellulose structure. Acidic compounds in SCOBY also altered agar pH.',
 'Contamination', 28),

('Isolating caffeine from tea leaves by hot water extraction', 'Chemistry', 'M. Patel',
 'Steeped 50 g tea leaves in 500 mL boiling water for 10 min, filtered, added NaHCO₃, then extracted with dichloromethane.',
 'Only 0.4 g crude caffeine recovered (literature: ~1 g). Product was greenish and smelled of DCM.',
 'Incomplete DCM removal; NaHCO₃ neutralisation step removed tannins but also co-precipitated some caffeine salts. Multiple extraction cycles needed.',
 'Wrong parameters', 10),

-- PHYSICS / OPTICS
('DIY spectrometer with DVD grating and webcam for water quality', 'Physics', 'K. Osei',
 'Built a cardboard spectrometer using a DVD diffraction grating and a Raspberry Pi camera to measure water turbidity at 550 nm.',
 'Calibration drifted ±15 nm between sessions. Measurements of the same sample varied by 40%. Cannot distinguish turbidity from color.',
 'Light source (LED torch) had unstable intensity and spectrum. Grating angle was not mechanically fixed. Stray light from the cardboard enclosure.',
 'Equipment problem', 32),

-- SOCIAL SCIENCE / EDUCATION (broadens scope)
('Spaced repetition app for vocabulary retention in 5th graders', 'Education', 'H. Kimura',
 'Replaced 4 weeks of standard vocabulary homework with a custom flashcard app using SM-2 spacing algorithm for 24 students.',
 'Post-test scores were 2% higher but not statistically significant (p = 0.31). Students reported the app "boring" in exit survey.',
 'Underpowered study (n=24, needed ~80 for 80% power). App had no gamification; engagement dropped after day 3.',
 'Sample size', 80),

-- ENGINEERING
('3D-printed PLA heat exchanger for solar water heating', 'Engineering', 'V. Singh',
 'Printed a serpentine heat exchanger in PLA (0.3 mm wall) and connected it to a solar collector loop at up to 60 °C.',
 'PLA deformed after 3 days of cycling; joints leaked. Max operating temperature was ~40 °C before visible warping.',
 'PLA glass-transition temperature is ~60 °C — too close to operating conditions. PETG or ASA required for this temperature range.',
 'Wrong parameters', 45);
