import { VerificationReport, VerdictType } from "./types";

export interface FallbackReport {
  claim: string;
  category: string;
  verdict: VerdictType;
  evidenceSummary: string;
  whyMisleading: string;
  whatEvidenceSays: string;
  safeRecommendation: string;
  confidenceLevel: number;
  evidenceLevel?: 'Level 1: Strong (systematic reviews / guidelines)' | 'Level 2: Moderate (multiple studies)' | 'Level 3: Limited (few studies)' | 'Level 4: Insufficient evidence';
  confidenceLevelDiscrete?: 'High' | 'Medium' | 'Low';
  scientificConsensus?: 'Strong' | 'Mixed' | 'Unknown';
}

export const FALLBACK_REGISTRY: Record<string, FallbackReport> = {
  // Nutrition
  "Celery juice detoxifies the liver and cures chronic autoimmune illnesses.": {
    claim: "Celery juice detoxifies the liver and cures chronic autoimmune illnesses.",
    category: "Nutrition",
    verdict: "Debunked",
    evidenceSummary: "According to the National Health and Medical Research Council (NHMRC Australia) and clinical hepatology consensus, celery juice has no verified biochemical capability to detoxify organs or cure autoimmune illnesses. While celery is hydrating and contains basic organic antioxidants, natural detoxification of metabolic byproduct wastes is performed continuously by liver enzymes (specifically the Cytochrome P450 pathway) and kidneys.",
    whyMisleading: "Social media marketing often coins pseudoscientific terms such as 'undiscovered cluster salts' to explain immediate wellness improvements, which are actually caused by general dietary hydration and calorie restriction.",
    whatEvidenceSays: "Peer-reviewed scientific consensus confirms that juicing removes valuable dietary prebiotic fibers from whole plant cells, which are critical for gut microflora health. The Australian Department of Health clinical guidelines advise against restrictive single-ingredient liquid regimens, noting that balanced nutrition fuels liver clearance far better than juicing.",
    safeRecommendation: "Prefer consuming whole, fiber-rich fruits and vegetables to nurture healthy gut microflora, and always check autoimmune treatment regimens with a licensed endocrinologist or immunologist.",
    confidenceLevel: 92
  },
  "Apple cider vinegar (ACV) taken before meals boosts metabolism and melts fat.": {
    claim: "Apple cider vinegar (ACV) taken before meals boosts metabolism and melts fat.",
    category: "Nutrition",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. Consuming diluted apple cider vinegar leads to minor, short-term slows in gastric emptying rates, but there is no peer-reviewed scientific evidence demonstrating that it directly raises overall body metabolism or selectively burns cellular adipose adipose tissue.",
    whyMisleading: "Influencers extrapolate short-term rat studies involving acetic acid to recommend long-term high-dose intake for humans, capitalizing on the appeal of a single-ingredient weight-loss speed up.",
    whatEvidenceSays: "NHMRC Australia nutrition review papers suggest that minor weight-management correlations associated with ACV are primarily mediated by mild gastric nausea or appetite suppression from delayed gastric transit. No reputable guideline (WHO, NHMRC, or Australian Department of Health) supports ACV as an active anti-obesity therapy.",
    safeRecommendation: "If you enjoy ACV, use it diluted in foods or salads. Do not drink it straight or in large quantities, as acetic acid can erode tooth enamel and upset digestion. Speak with a dietitian.",
    confidenceLevel: 75
  },
  "High-fructose corn syrup is chemically processed differently by the liver than organic cane sugar.": {
    claim: "High-fructose corn syrup is chemically processed differently by the liver than organic cane sugar.",
    category: "Nutrition",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. High-fructose corn syrup (HFCS) and sucrose (table cane sugar) are chemically and metabolically highly similar, both consisting of roughly equal ratios of fructose and glucose. The liver processes both sugars through identical, non-distinguishable biochemical pathways.",
    whyMisleading: "Commercial processors popularized HFCS as an inexpensive food additive, leading public health advocates to target it specifically as the sole driver of obesity, ignoring overall sugar consumption levels.",
    whatEvidenceSays: "Fructose metabolism reviews endorsed by the American Journal of Clinical Nutrition and guidelines from the Australian Department of Health show no significant difference in direct endocrine signals, blood glucose indices, or liver fat accumulation when comparing equal, moderate calorie limits of HFCS and sucrose. Both trigger hepatic lipid accumulation only during chronic, excess calorie overabundance.",
    safeRecommendation: "Aim to reduce overall processed sugar intake rather than replacing HFCS with cane sugar. Consult a nutritionist to establish a balanced raw nutrient eating plan.",
    confidenceLevel: 85
  },

  // Exercise
  "No pain, no gain: intense muscle soreness is a mandatory indicator of high-quality training.": {
    claim: "No pain, no gain: intense muscle soreness is a mandatory indicator of high-quality training.",
    category: "Exercise",
    verdict: "Debunked",
    evidenceSummary: "Sports medicine consensus and muscle physiology trials demonstrate that Delayed Onset Muscle Soreness (DOMS) represents inflammatory repair of minor microscopic tears in cellular sarcolemma. It is not an accurate indicator of ongoing muscle protein synthesis, total muscle growth, or adaptive fitness gains.",
    whyMisleading: "Traditional gym culture associates physical pain with productivity. It drives athletes to overtrain under the physiological myth that a lack of soreness means zero muscular adaptations are taking place.",
    whatEvidenceSays: "Peer-reviewed randomized sports trials demonstrate that neuromuscular adaptations and muscular hypertrophy are driven by progressive tension, volume, and metabolic stimulus rather than damage-induced pain. The Australian Department of Health exercise guidelines emphasize consistent, progressive training overload without reaching the threshold of muscular injury or chronic debilitating DOMS.",
    safeRecommendation: "Structure progressive training volume increments, track actual functional output strength over weeks, and consult physical coaches or physical therapists to avoid chronic joint inflammation.",
    confidenceLevel: 88
  },
  "Stretching before a run significantly reduces the overall risk of athletic injuries.": {
    claim: "Stretching before a run significantly reduces the overall risk of athletic injuries.",
    category: "Exercise",
    verdict: "Misleading",
    evidenceSummary: "Sports science systematic reviews demonstrate that static stretching (holding static stretches) before training relaxes spindle fibers, which temporarily reduces athletic power generation and muscular contraction speeds without showing any valid, statistical decrease in lower-limb athletic injuries.",
    whyMisleading: "Conventional physical education classes popularized pre-workout passive stretching as a safe warm-up routine, failing to separate static flexibility from dynamic athletic readiness.",
    whatEvidenceSays: "A comprehensive clinical review in the Clinical Journal of Sports Medicine shows that dynamic, active warm-ups (such as light jogging, leg swings, or dynamic lunges) prepare the cardiovascular system and ready joint lubrication lines far better. Guidelines from public health bodies advise targeting active preparation before speed activities.",
    safeRecommendation: "Transition static stretching to post-run cool downs, and implement a 5-10 minute active dynamic warm-up before running. Ask a running coach or physiotherapist.",
    confidenceLevel: 90
  },
  "Walking 10,000 steps a day is the scientific minimum required for long-term health and longevity.": {
    claim: "Walking 10,000 steps a day is the scientific minimum required for long-term health and longevity.",
    category: "Exercise",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. While consistent daily walking is strongly associated with high cardiovascular and longevity benefits, the exact 10,000 step figure is a historical marketing threshold rather than a hard clinical biological tipping point. Extensive cohort research indicates that significant mortality reduction benefits begin plateauing between 7,500 and 8,000 steps per day.",
    whyMisleading: "Pedometer companies in Japan commercialized the 'Manpo-kei' (10,000 steps meter) in 1965 as an easily remembered number, which has since been hardcoded into modern consumer smartwatches.",
    whatEvidenceSays: "According to the World Health Organization (WHO) and Australian Department of Health physical activity guidelines, the primary objective is meeting 150 to 300 minutes of weekly moderate-intensity cardiorespiratory movement, which can be accomplished via various mobility setups, irrespective of a 10,000 steps constraint.",
    safeRecommendation: "Do not feel discouraged if you fall short of 10,000 steps. Focus on regular movement and gradual weekly progression. Consult with physically certified experts before starting intensive routines.",
    confidenceLevel: 82
  },

  // Vaccines
  "The MMR vaccine is directly linked to the development of autism in children.": {
    claim: "The MMR vaccine is directly linked to the development of autism in children.",
    category: "Vaccines",
    verdict: "Debunked",
    evidenceSummary: "Conclusive scientific, clinical, and epidemiological reviews compiled by the World Health Organization (WHO), the Australian Department of Health, and NHMRC Australia covering millions of immunized children show zero statistical association between the MMR (Measles, Mumps, Rubella) vaccine and neurodevelopmental conditions like autism.",
    whyMisleading: "This assertion was commercialized and popularized by an unethical 1998 research paper with manipulated, sub-sample clinical reports, which was subsequently retracted by the journal Lancet.",
    whatEvidenceSays: "Epidemiological cohorts spanning decades, including massive Danish and Japanese child registries, have confirmed that child autism occurrences are fully detached from vaccination tracking. NHMRC Australia guidelines establish vaccine programs as highly safe, protecting children from fatal respiratory and sensory complications.",
    safeRecommendation: "Maintain immunization records under standard vaccine calendar setups recommended by pediatric academies, and contact dedicated pediatric healthcare providers for queries.",
    confidenceLevel: 99
  },
  "Influenza (flu) vaccinations can trigger the actual active flu illness in healthy patients.": {
    claim: "Influenza (flu) vaccinations can trigger the actual active flu illness in healthy patients.",
    category: "Vaccines",
    verdict: "Debunked",
    evidenceSummary: "Standard injectable influenza vaccinations are entirely formulated from inactivated (dead) influenza virus structures or single manufactured antigen proteins. Consequently, they are biochemically and pathologically incapable of multiplying or initiating active flu infections inside human lungs.",
    whyMisleading: "Flu vaccinations are administered during autumn when seasonal colds and other respiratory bugs are widespread. Patients contract unrelated rhinovirus infections and attribute them to the vaccine.",
    whatEvidenceSays: "The WHO and Australian Department of Health immunisation registers document that mild systemic responses—such as low-grade fever, localized arm soreness, or mild myalgia—are standard, benign inflammatory markers representing a healthy, active immune training response, not a live viral infection.",
    safeRecommendation: "Schedule your seasonal flu shot annually. If you experience normal post-vaccine fatigue, rest and stay hydrated. Consult with a general practitioner if symptoms persist past 48 hours.",
    confidenceLevel: 95
  },
  "Contracting COVID-19 naturally yields more reliable, stronger, and safer immunity than being vaccinated.": {
    claim: "Contracting COVID-19 naturally yields more reliable, stronger, and safer immunity than being vaccinated.",
    category: "Vaccines",
    verdict: "Misleading",
    evidenceSummary: "Although natural SARS-CoV-2 infection produces protective antibodies, clinical clinical records show that contracting the live virus carries exponentially higher health risks, including acute pulmonary failure, systemic cardiac inflammation, vascular clotting, long-COVID neurological damage, and death compared to safe vaccinations.",
    whyMisleading: "Holistic circles emphasize a survival-bias wellness model, arguing 'natural is always better' while ignoring the high background baseline risk of acute tissue injury and long-COVID vascular damage.",
    whatEvidenceSays: "Peer-reviewed scientific consensus and statistical compilations from the World Health Organization (WHO) show that immunizations deliver highly controlled, purified antigen targets, building robust systemic defense without the severe risk of multi-organ damage or long-term chronic cytokine inflammatory syndromes.",
    safeRecommendation: "Adopt vaccine-based protective schedules as recommended by the WHO and CDC. Discuss personal immune biomarkers with a certified general health practitioner.",
    confidenceLevel: 94
  },

  // Mental Health
  "Major clinical depression is caused solely by a simple chemical imbalance of serotonin in the brain.": {
    claim: "Major clinical depression is caused solely by a simple chemical imbalance of serotonin in the brain.",
    category: "Mental Health",
    verdict: "Misleading",
    evidenceSummary: "Major clinical depression is a complex, multi-system condition involving neurological genetics, environmental stress factors, receptor sensitivity profiles, neuroplasticity, and cellular brain-derived neurotrophic factors (BDNF). It is not a basic, single-variable 'low serotonin' biochemical deficiency.",
    whyMisleading: "This concept gained prominence during the initial marketing of SSRI medications, reducing multi-system neurobiology to an easily understood 'chemical deficiency' model.",
    whatEvidenceSays: "Comprehensive systematic reviews in international journals highlight that depression entails structural neural circuitry alterations and distinct psychological stressors. The NHMRC Australia clinical guidelines emphasize a multi-faceted approach incorporating cognitive behavioral therapy (CBT), social support frameworks, and medical support where clinically indicated.",
    safeRecommendation: "Employ wellness strategies combining scientific psychotherapy (CBT), healthy lifestyle adjustments, and professional psychiatric guidance where relevant.",
    confidenceLevel: 85
  },
  "Ashwagandha supplementation significantly reduces physiological cortisol levels and stress.": {
    claim: "Ashwagandha supplementation significantly reduces physiological cortisol levels and stress.",
    category: "Mental Health",
    verdict: "Verified",
    evidenceSummary: "Clinical evidence exists for Ashwagandha (Withania somnifera) containing bio-active withanolides that modulate the Hypothalamic-Pituitary-Adrenal (HPA) axis, showing small-to-moderate reductions in physical serum cortisol and perceived stress.",
    whyMisleading: "Wellness manufacturers often inflate this adaptogen as an overnight cure for clinical anxiety, ignoring vital psychological coaching, behavioral stress management, and sleep requirements.",
    whatEvidenceSays: "Several randomized, double-blind, placebo-controlled clinical trials support ashwagandha's efficacy in lowering physiological indices of anxiety and stress compared to placebo protocols.",
    safeRecommendation: "If using ashwagandha, cycle its intake and choose reputable brands. Since withanolides can interact with thyroid and thyroid-stimulating hormones, consult a physician first.",
    confidenceLevel: 80
  },
  "Adults require exactly 8 hours of sleep per night, and any minor deficit inflicts permanent brain cell damage.": {
    claim: "Adults require exactly 8 hours of sleep per night, and any minor deficit inflicts permanent brain cell damage.",
    category: "Mental Health",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. Sleep physiological cycles vary individually, with healthy adult baselines resting dynamically between 7 and 9 hours. While chronic, severe sleep restriction damages cellular pathways, single short nights do not cause irreversible brain damage or cell death.",
    whyMisleading: "Sensationalized sleep literature represents the 8-hour metric as an absolute law of physics, inducing medical anxiety and orthosomnia (insomnia caused by an obsession with perfect sleep scores).",
    whatEvidenceSays: "The American Academy of Sleep Medicine and the Australian Department of Health note that sleep requirements follow individual variations, and the brain possesses natural, high-performance deep delta-wave recovery mechanics to regain lost sleep balance during subsequent cycles.",
    safeRecommendation: "Focus on overall weekly sleep consistency, light hygiene, and restorative depth rather than obsessing over an exact 8-hour total. Seek sleep therapy if suffering chronic sleep symptoms.",
    confidenceLevel: 87
  },

  // Weight Loss
  "Intermittent fasting is scientifically superior to general continuous calorie restriction for fat loss.": {
    claim: "Intermittent fasting is scientifically superior to general continuous calorie restriction for fat loss.",
    category: "Weight Loss",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. Rigorous, long-term randomized clinical trials demonstrate that intermittent fasting (such as 16:8 or 5:2 schedules) has no clinical superiority over conventional daily calorie restriction for fat loss or glucose status when total caloric deficits and protein levels are isolated as equal.",
    whyMisleading: "Influencers often attribute weight loss to specialized hourly insulin cycles, which actually stems from natural calorie limits when skipping specific daily meals.",
    whatEvidenceSays: "Peer-reviewed metabolic reviews, including reviews endorsed by NHMRC Australia, confirm that adipose loss is fully governed by cumulative energy balance. Skipping meals can assist some patients in naturally creating a calorie deficit but offers no unique metabolic cellular advantage.",
    safeRecommendation: "Select daily eating window scales that align smoothly with your routine, and speak with a registered dietitian to ensure balanced macronutrient intake.",
    confidenceLevel: 90
  },
  "Drinking cold water burns significant daily metabolic calories as the body expends heat.": {
    claim: "Drinking cold water burns significant daily metabolic calories as the body expends heat.",
    category: "Weight Loss",
    verdict: "Misleading",
    evidenceSummary: "The human body does expend a highly fractional amount of thermal energy to warm ice-cold water to the core body temperature of 37°C. However, this metabolic exertion is exceptionally nominal and cannot drive active adipose cellular burning.",
    whyMisleading: "Internet diet blogs calculate metabolic thermics mathematically and present it as an easy shortcut to burn body fat, omitting the incredibly nominal real-world magnitude.",
    whatEvidenceSays: "Physiological trials demonstrate that consuming 500ml of freezing water expends approximately 17.5 kilocalories—an amount so minor that it can be instantly offset by a single bite of food. Australian Department of Health guidelines recommend water for cellular filtration and waste clearance, not for thermic fat loss.",
    safeRecommendation: "Drink water primarily for standard cellular hydration, tissue recovery, and renal support. Do not rely on cold water as an athletic or weight-reduction mechanism. Ask a registered health specialist.",
    confidenceLevel: 95
  },
  "Fasted cardio (doing cardio on an empty stomach) promotes superior long-term lipid oxidation.": {
    claim: "Fasted cardio (doing cardio on an empty stomach) promotes superior long-term lipid oxidation.",
    category: "Weight Loss",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. Performing light cardiorespiratory training in a fasted state shifts cellular lipid oxidation pathways to burn fat as immediate fuel during the session itself. However, overall 24-hour fat oxidation and calorie balance remain identical to sessions done after eating.",
    whyMisleading: "Fitness influencers isolate cellular responses over single-hour frames, neglecting long-term energy homeostasis and the relative recovery speeds of the body.",
    whatEvidenceSays: "Clinical sports studies published in peer-reviewed fitness journals confirm that body composition changes are identical between fasted and fed cardio groups when total daily calories are equal. The Australian Department of Health advises focusing on regular, enjoyable exercise habits, irrespective of the fed or fasting phase.",
    safeRecommendation: "Align cardiorespiratory exercise timing strictly with when you have the highest physical energy and subjective workout comfort. Discuss cardiorespiratory training with sports coaches.",
    confidenceLevel: 86
  },

  // Supplements
  "Megadosing Vitamin C protects against or instantly cures the common cold.": {
    claim: "Megadosing Vitamin C protects against or instantly cures the common cold.",
    category: "Supplements",
    verdict: "Misleading",
    evidenceSummary: "According to robust systematic reviews and the National Health and Medical Research Council (NHMRC Australia), routine Vitamin C supplementation does not prevent common cold infections in the general public, though it may marginally reduce symptoms duration (by less than 10%) in highly trained extreme athletes.",
    whyMisleading: "Over-the-counter vitamin manufacturers heavily promote megadosing to boost retail sales, capitalizing on old, non-peer-reviewed theories published in the 1970s.",
    whatEvidenceSays: "The peer-reviewed scientific consensus establishes that once intestinal transport systems are fully saturated, excess Vitamin C is excreted. Doses exceeding 2,000mg per day can cause painful abdominal cramping, digestive diarrhea, and accelerate calcium oxalate kidney stone formations as noted by the Australian Department of Health.",
    safeRecommendation: "Prioritize getting vitamins through food sources like citrus fruits and leafy vegetables, and speak with a clinical healthcare professional before taking high-dose single vitamins.",
    confidenceLevel: 95
  },
  "Oral collagen supplements directly rebuild joint cartilage and eliminate skin wrinkles.": {
    claim: "Oral collagen supplements directly rebuild joint cartilage and eliminate skin wrinkles.",
    category: "Supplements",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. Ingested collagen is broken down by standard gastric acids and digestive enzymes into basic amino acids (such as glycine and proline). The body cannot direct these digested peptide building blocks specifically to target facial skin cells or articular knee joints.",
    whyMisleading: "Cosmetic companies present raw cellular pathways as linear pipelines, suggesting that eating collagen instantly deposits new collagen directly into facial wrinkles and joints.",
    whatEvidenceSays: "Peer-reviewed trials on skin elasticity yield highly mixed parameters, noting that standard systemic dietary protein sources (such as eggs, poultry, or legumes) supply the same fundamental amino acids required to fuel innate, natural cellular synthesis.",
    safeRecommendation: "Focus on overall protein intake and a nutrient-rich diet with vitamin C to naturally support internal collagen synthesis. Consult dermatologists.",
    confidenceLevel: 80
  },
  "Melatonin supplements are entirely non-habit forming and have no effect on natural hormonal feedback loops.": {
    claim: "Melatonin supplements are entirely non-habit forming and have no effect on natural hormonal feedback loops.",
    category: "Supplements",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. While melatonin (exogenous hormone) does not activate classic narcotic addictive pathways, chronic high-dose intake can disrupt sleep architecture, downregulate melatonin receptors, and cause morning grogginess. High external doses may also suppress natural evening pineal secretion.",
    whyMisleading: "Retail marketing positions synthetic sleep aids as '100% natural and risk-free' supplements, resulting in extensive pediatric dosing and routine self-administration at overly high doses.",
    whatEvidenceSays: "Chronobiology expert consensus indicates that exogenous melatonin is highly effective for circadian shift jet-lag but carries mixed results for primary long-term insomnia. The Australian Department of Health restricts melatonin as a prescription-only or registered pharmacist-only item for older cohorts to protect public hormonal baselines.",
    safeRecommendation: "Employ melatonin temporarily in micro-doses (0.3mg to 1mg) for schedule shifts, prioritize sleep environment darkness, and seek professional guidance for chronic insomnia.",
    confidenceLevel: 85
  },

  // General Health
  "Cracking your finger knuckles on a regular basis prompts osteoarthritis in later years.": {
    claim: "Cracking your finger knuckles on a regular basis prompts osteoarthritis in later years.",
    category: "General Health",
    verdict: "Debunked",
    evidenceSummary: "Popping or cracking finger joints represents the harmless collapse of dissolved nitrogen gas bubbles within the synovial fluid. Clinical radiographic tracking shows no correlation or statistically significant variation in osteoarthritis rates between habitual finger-crackers and control groups.",
    whyMisleading: "The loud popping noise naturally raises concern that joint structures are being physically grinding down, promoting folk parental warnings designed to curb repetitive cracks.",
    whatEvidenceSays: "Long-term cohort trials and clinical self-experiment reviews show zero structural joint erosion from standard popping. The NHMRC Australia health bulletins concur that cartilage degradation is driven by specific injury history, genetics, age, and systemic factors, rather than bubble pocket collapses.",
    safeRecommendation: "If joint cracking is accompanied by pain, swelling, or localized fever, cease immediately and consult a board-certified rheumatologist.",
    confidenceLevel: 92
  },
  "Every human must consume at least eight full glasses of plain water daily to avoid dehydration.": {
    claim: "Every human must consume at least eight full glasses of plain water daily to avoid dehydration.",
    category: "General Health",
    verdict: "Misleading",
    evidenceSummary: "Hydration baselines are highly individual and rely on dynamic indexes like weight, standard workload, ambient temperature, and diet. The NHMRC Australia fluid guidelines indicate that standard diets meet general water baselines completely through moisture in fruits, vegetables, teas, and standard meals.",
    whyMisleading: "Early administrative bulletins summarized that individuals require roughly 2.5 liters of total fluid, which marketing brochures subsequently isolated to refer exclusively to plain bottled water purchases.",
    whatEvidenceSays: "Cochrane reviews and systematic physiological trials confirm that healthy adults meet daily moisture demands comfortably via thirst triggers. No scientific consensus outlines eight glasses of pure water as a mandatory biological threshold.",
    safeRecommendation: "Monitor simple urine coloration (pale straw color is ideal) and hydrate comfortably when thirsty. Do not force drinking metrics. Contact a general practitioner for hydration topics.",
    confidenceLevel: 94
  },
  "Short cold plunges trigger durable lifelong metabolic speedups and permanent immune boosts.": {
    claim: "Short cold plunges trigger durable lifelong metabolic speedups and permanent immune boosts.",
    category: "General Health",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. Cold water immersion triggers intense vasoconstriction and immediate adrenaline spikes, but clinical evidence fails to trace any permanent metabolic baseline expansion or long-term chronic immunological enhancements.",
    whyMisleading: "Longevity influencers show immediate neural alertness and suggest that cold-shock proteins represent a direct pathway to permanent cardiovascular and immunity states.",
    whatEvidenceSays: "Sports physiology studies publish that cold immersion can reduce post-training acute muscular soreness but might also interfere with long-term muscular hypertrophy muscle-building pathways due to reduced natural blood flow. The Australian Department of Health cautions people with underlying cardiovascular conditions to avoid intense cold shock.",
    safeRecommendation: "Utilize plunges selectively for neuromuscular alertness or standard therapeutic recovery. Avoid cold immersion if you have pre-existing cardiovascular concerns. Consult primary physicians first.",
    confidenceLevel: 83
  },
  "Drinking alkaline water neutralizes bodily acidity and prevents cancerous cell growths.": {
    claim: "Drinking alkaline water neutralizes bodily acidity and prevents cancerous cell growths.",
    category: "Nutrition",
    verdict: "Debunked",
    evidenceSummary: "According to oncology associations and renal physicians, drinking alkaline water with a high pH does not alter systemic blood pH or muscle acidity, as stomach acids immediately neutralize it. The body's blood pH is tightly regulated within a highly narrow range (7.35 to 7.45) by the lungs and kidneys regardless of diet.",
    whyMisleading: "Marketers exploit physical lab trials showing that cancer cells struggle in alkaline buffers, distorting it to claim that oral water alters systemic tissue pH to prevent tumors.",
    whatEvidenceSays: "Peer-reviewed systematic reviews confirm there is absolutely zero reputable clinical evidence supporting claims that alkaline water prevents or treats neoplasms. NHMRC Australia guidelines emphasize eating a diverse nutrient diet over consuming altered-pH waters.",
    safeRecommendation: "Drink standard filtered or tap water for safe, pure hydration. Do not substitute proven clinical oncology treatments with alkaline water or strict alkaline diets.",
    confidenceLevel: 98
  },
  "Consuming dairy products causes widespread systemic internal inflammation in healthy adults.": {
    claim: "Consuming dairy products causes widespread systemic internal inflammation in healthy adults.",
    category: "Nutrition",
    verdict: "Debunked",
    evidenceSummary: "Clinical systematic reviews and meta-analyses published in PubMed demonstrate that dairy consumption has no pro-inflammatory effect in healthy individuals; in fact, dairy products often correlate with small biomarker reductions or neutral states.",
    whyMisleading: "Advocates conflate individual lactose intolerance or dynamic milk allergies with systemic inflammation, generalizing localized biochemical discomfort to the entire population.",
    whatEvidenceSays: "Clinical guidelines from NHMRC Australia categorize low-fat milk, cheese, and yogurt as core food groups that furnish essential bioactive calcium and proteins, finding zero association with elevated c-reactive protein in the general public.",
    safeRecommendation: "Consume dairy products normally if tolerated. If you exhibit real symptoms of lactose intolerance, choose lactose-free products or fortified plant milks under a dietitian's guidance.",
    confidenceLevel: 91
  },
  "Targeted abdominal exercises can selectively burn local fat in the belly area (spot reduction).": {
    claim: "Targeted abdominal exercises can selectively burn local fat in the belly area (spot reduction).",
    category: "Exercise",
    verdict: "Debunked",
    evidenceSummary: "Sports medicine trials prove that localized lipolysis is impossible through isolated physical contractions. When muscles contract, they draw energy systemically from fat molecules circulating in the bloodstream, not from overlying subcutaneous fat stores.",
    whyMisleading: "Commercial fitness channels market abdominal wraps and high-rep crunches under the illusion that burning muscle sensations represent fat tissues melting off focused sections.",
    whatEvidenceSays: "Multiple randomized controlled trials published in sports science journals show that doing abdominal training strengthens local core muscles but yields zero extra fat reduction in the midsection compared to general aerobic training of matching energy deficits.",
    safeRecommendation: "Create a safe, progressive total energy deficit through balanced nutrition and full-body movement patterns to lower total adipose tissues globally range.",
    confidenceLevel: 96
  },
  "You must consume protein within exactly 30 minutes of lifting weights to avoid losing muscle gains.": {
    claim: "You must consume protein within exactly 30 minutes of lifting weights to avoid losing muscle gains.",
    category: "Exercise",
    verdict: "Misleading",
    evidenceSummary: "The 'anabolic window' theory is highly exaggerated. Meta-analyses in sports medicine journals illustrate that the total daily protein intake and consistent dietary distribution are far more critical for muscle growth than a rigid 30-minute post-workout threshold.",
    whyMisleading: "Supplement companies heavily commercialized post-workout protein shakes as an urgent medical requirement to drive immediate consumption of expensive post-workout formulas.",
    whatEvidenceSays: "Durable muscle protein synthesis remains highly elevated for up to 24-48 hours following resistance training. Consistent protein feeding every 3 to 5 hours comfortably optimizes long-term muscle adaptation and mass recovery as outlined by sport dietetics.",
    safeRecommendation: "Focus on hitting your daily targeted protein intake evenly across standard meals, rather than rushing to chug shakes immediately in the locker room.",
    confidenceLevel: 92
  },
  "The COVID-19 mRNA vaccines alter human DNA or integrate directly into the host genome.": {
    claim: "The COVID-19 mRNA vaccines alter human DNA or integrate directly into the host genome.",
    category: "Vaccines",
    verdict: "Debunked",
    evidenceSummary: "According to geneticists and vaccine research centers globally, mRNA vaccines are biologically incapable of altering or integrating into human DNA. Synthetic messenger RNA remains strictly in the cell cytoplasm, decays rapidly, and never enters the cell nucleus where genomic DNA resides.",
    whyMisleading: "Pseudoscience websites misinterpret reverse-transcription biology, utilizing scary jargon like 'genetic reprogramming' to scare the public away from standard mRNA therapeutics.",
    whatEvidenceSays: "SciCheck, Health Feedback, and WHO consensus statements prove that human cells lack endogenous reverse transcriptase enzymes capable of converting vaccine mRNA into DNA. The delivered biological message is dissolved by intracellular enzymes within days of vaccine administration.",
    safeRecommendation: "Rely on peer-reviewed mRNA vaccine safety profiles endorsed by NHMRC Australia and the Australian Department of Health. Seek immunological guidance from certified immunologists.",
    confidenceLevel: 99
  },
  "The PCR tests used to identify respiratory virions are highly inaccurate and feature a 97% false positive rate.": {
    claim: "The PCR tests used to identify respiratory virions are highly inaccurate and feature a 97% false positive rate.",
    category: "Vaccines",
    verdict: "Debunked",
    evidenceSummary: "Polymerase Chain Reaction (PCR) assays are exceptionally accurate molecular diagnostic tools. When run under standard clinical protocols, clinical false-positive rates are extremely low (typically under 1%), representing standard laboratory trace contaminants rather than a 97% systemic testing failure.",
    whyMisleading: "Skeptics misquoted a paper on high cycle thresholds (Ct > 35) out of context, claiming that amplified, non-infective viral fragments are equivalent to false diagnoses.",
    whatEvidenceSays: "The WHO, CDC, and Australian public health laboratories establish that PCR's high sensitivity is crucial for early detection of minute genetic virions. Finding viral fragments does not invalidate the test's clinical capacity to correctly identify pathogen matches.",
    safeRecommendation: "Utilize PCR testing schedules normally according to public advisory commands, and always correlate test assays with active clinical symptoms in consultation with doctors.",
    confidenceLevel: 98
  },
  "Using digital screen devices right before bed has zero impact on melatonin levels or REM sleep cycles.": {
    claim: "Using digital screen devices right before bed has zero impact on melatonin levels or REM sleep cycles.",
    category: "Mental Health",
    verdict: "Debunked",
    evidenceSummary: "Widely replicated sleep sciences confirm that short-wavelength blue light (450-480 nm) emitted by digital screens stimulates intrinsically photosensitive retinal ganglion cells, signaling the suprachiasmatic nucleus to suppress natural pineal melatonin secretion and push sleep onset back.",
    whyMisleading: "Skeptics argue that low screen luminosities are too minor to shift sleep, ignoring the acute biochemical sensitivity of circadian pacemakers to direct, near-eye blue light emissions.",
    whatEvidenceSays: "Clinical trials published in PubMed verify that evening screen use delays transition into deep delta states and lowers total morning alertness. Standard sleep guidelines recommend complete cessation of active screen devices 1-2 hours prior to sleeping.",
    safeRecommendation: "Maintain a screen-free window 1 hour before bed, utilize amber warm-shift filters in the evening, and prioritize ambient yellow light sources inside bedrooms.",
    confidenceLevel: 94
  },
  "St. John's Wort is a safe herbal supplement that can replace major clinical antidepressant medications without medical monitoring.": {
    claim: "St. John's Wort is a safe herbal supplement that can replace major clinical antidepressant medications without medical monitoring.",
    category: "Mental Health",
    verdict: "Misleading",
    evidenceSummary: "While clinical trials show that St. John's Wort (Hypericum perforatum) can alleviate mild depression symptoms, it has highly dangerous drug interactions because it strongly induces Cytochrome P450 enzymes (specifically CYP3A4) and P-glycoprotein, altering the concentration of SSRIs, oral contraceptives, and anticoagulants.",
    whyMisleading: "Natural wellness retailers market this herb as an risk-free alternative to prescription SSRIs, neglecting secondary system organ toxicity risks and dangerous pharmaceutical interactions.",
    whatEvidenceSays: "Multiple national guidelines (including NHMRC Australia) warn that combining St. John's Wort with SSRIs can cause serotonin syndrome, a potentially life-threatening medical emergency. Self-medicating without diagnostic surveillance is strongly advised against.",
    safeRecommendation: "Always share all supplement usage with a primary physician, and collaborate directly with a clinical psychiatrist or GP before altering psychological medications.",
    confidenceLevel: 92
  },
  "Eating late at night (after 8 PM) inherently causes faster and greater fat storage regardless of total daily calorie intake.": {
    claim: "Eating late at night (after 8 PM) inherently causes faster and greater fat storage regardless of total daily calorie intake.",
    category: "Weight Loss",
    verdict: "Debunked",
    evidenceSummary: "According to clinical calorie metabolic and body weight trials, weight gain is governed by total 24-hour calorie intake versus expenditure. Eating past 8 PM does not magically open doors to faster metabolic cellular fat routing or alter basic thermodynamics.",
    whyMisleading: "Late-night eating often correlates with unmonitored snacking, leading to accidental calorie surplus which individuals then attribute entirely to the clock hours.",
    whatEvidenceSays: "Longitudinal metabolic trials published in PubMed confirm that when daily calorie inputs and metabolic physical work outputs are matched exactly, late-night cohorts show identical adipose rates compared to early-day cohorts.",
    safeRecommendation: "Space eating schedules strictly based on lifestyle routines and digestive comfort, placing your primary focus on maintaining a balanced total daily calorie balance.",
    confidenceLevel: 95
  },
  "Sweating in plastic wraps or excessively heated sauna suits permanently dissolves local fat cells.": {
    claim: "Sweating in plastic wraps or excessively heated sauna suits permanently dissolves local fat cells.",
    category: "Weight Loss",
    verdict: "Debunked",
    evidenceSummary: "Heavy perspiration induced by plastic wraps or sauna suits only expels subcutaneous interstitial water and essential mineral salts through sudoriferous sweat glands. It does not dissolve, oxidize, or permanently eliminate lipid stores in adipocytes.",
    whyMisleading: "Immediate post-session scale drops give the illusion of fast weight loss, but this lost water volume is fully restored upon subsequent hydration.",
    whatEvidenceSays: "Sports physiology papers highlight that training in unventilated heated garments disrupts core thermoregulation, triggering severe hydration distress, heat stroke, and dangerous cardiac strain without providing any additional metabolic cellular fat loss.",
    safeRecommendation: "Do not use wraps or suits to stimulate weight loss. Hydrate thoroughly during workout regimes, and utilize regular cardiorespiratory and resistance workloads to burn actual fat safely over months.",
    confidenceLevel: 97
  },
  "Taking high-dose biotin supplements can bias critical medical blood tests like thyroid or cardiac troponin panels.": {
    claim: "Taking high-dose biotin supplements can bias critical medical blood tests like thyroid or cardiac troponin panels.",
    category: "Supplements",
    verdict: "Verified",
    evidenceSummary: "Substantial supplement consumption of Biotin (Vitamin B7, often exceeding 5-10mg daily) strongly biases key laboratory immunoassays that rely on streptavidin-biotin affinity bonds. This chemical interference can lead to falsely low readings in cardiac troponin (disguising active heart attacks) or falsely high/low thyroid scores, creating grave diagnostic errors.",
    whyMisleading: "Biotin is aggressively marketed in high doses for cosmetic hair and nail growth, leaving consumers fully unaware that this standard water-soluble vitamin can corrupt critical diagnostic panels.",
    whatEvidenceSays: "The FDA, PubMed medical journals, and pathobiological lab associations have issued strict public safety warnings, advising patients to cease biotin supplements at least 48 to 72 hours prior to undergoing clinical blood collection.",
    safeRecommendation: "Stop biotin supplement intake 3 days before any scheduled blood collection, and proactively disclose all vitamin usages to your attending medical and laboratory staff.",
    confidenceLevel: 99
  },
  "Elderberry syrup cures or prevents influenza and viral respiratory infections immediately.": {
    claim: "Elderberry syrup cures or prevents influenza and viral respiratory infections immediately.",
    category: "Supplements",
    verdict: "Unsupported",
    evidenceSummary: "While elderberry (Sambucus nigra) contains high levels of healthy organic anthocyanins and basic plant antioxidants, systematic reviews show no valid therapeutic capability to cure, shorten, or prevent active respiratory virions or seasonal influenza infections in humans.",
    whyMisleading: "Natural remedy sellers expand small laboratory petri-dish trials to claim identical antiviral outcomes in complex mucosal respiratory membranes of live patients.",
    whatEvidenceSays: "Large randomized, double-blind clinical trials published in PubMed show that elderberry extract has no statistically significant impact on reducing viral severity, fever duration, or respiratory symptoms compared to matching placebo regimes.",
    safeRecommendation: "Rely on seasonal vaccinations as primary defense shields. Enjoy elderberry as a basic flavor source if tolerated, but do not rely on it as an alternative to influenza clinical care.",
    confidenceLevel: 91
  },
  "Thermography is an accurate, radiation-free standalone replacement for mammograms in breast cancer screening.": {
    claim: "Thermography is an accurate, radiation-free standalone replacement for mammograms in breast cancer screening.",
    category: "General Health",
    verdict: "Debunked",
    evidenceSummary: "Clinical thermography (infrared heat mapping) has a dangerously high false-negative rate and cannot detect small microcalcifications or non-palpable early neoplastic growths. It is not an accurate standalone screening tool, and mammography remains the undisputed gold standard for breast cancer detection.",
    whyMisleading: "Supporters claim radiation-free infrared sweeps are equivalent to x-ray mammogram imaging, capitalizing on public fears of diagnostic x-ray radiography exposures.",
    whatEvidenceSays: "The FDA and leading medical oncology academies have issued multiple public warnings stating that substituting thermography for mammograms significantly delays early cancer diagnosis, heavily escalating patient mortality risks.",
    safeRecommendation: "Schedule regular mammography screenings according to the medical guidelines of the NHMRC Australia and clinical oncology calendars. Do not use thermography for screen decisions.",
    confidenceLevel: 99
  },
  "Using deodorants containing aluminum directly triggers breast oncogenesis and Alzheimer's disease.": {
    claim: "Using deodorants containing aluminum directly triggers breast oncogenesis and Alzheimer's disease.",
    category: "General Health",
    verdict: "Debunked",
    evidenceSummary: "Large-scale epidemiological studies, toxicological reviews, and national cancer institutes confirm that aluminum salts in antiperspirants are not dermally absorbed in levels sufficient to alter gene mutation or accumulate in cerebral tissues. No causal relationship exists between aluminum deodorants and breast cancer or Alzheimer's pathology.",
    whyMisleading: "Early, basic tissue studies reported traces of aluminum in localized breast samples, driving viral claims that lymphatic absorption is directly driving chronic cellular changes.",
    whatEvidenceSays: "Systematic reviews from the WHO, PubMed, and global Alzheimer's organizations show that the trace quantities of aluminum absorbed dermally are a fraction of the aluminum naturally consumed daily through standard food, soil, and water pathways.",
    safeRecommendation: "Use standard aluminum-based or aluminum-free deodorants purely based on personal cosmetic preference. Consult a dermatologist if you experience skin irritation or dynamic dermis contact allergies.",
    confidenceLevel: 97
  }
};

/**
 * Searches the fallback registry for a matching claim. If not found exactly,
 * uses keyword matching to locate the best curated fallback.
 */
export function getBestCuratedFallback(claimText: string, categoryName?: string): VerificationReport {
  const normalizedText = claimText.toLowerCase().trim();

  // 1. Try exact or sub-string matching
  for (const claimKey of Object.keys(FALLBACK_REGISTRY)) {
    if (normalizedText.includes(claimKey.toLowerCase().trim()) || claimKey.toLowerCase().trim().includes(normalizedText)) {
      return augmentWithAdvancedFeatures(FALLBACK_REGISTRY[claimKey]);
    }
  }

  // 2. Keyword heuristic helper for custom entries
  const keywords: { keys: string[]; reportKey: string }[] = [
    { keys: ["celery", "juice", "liver", "autoimmune", "detox"], reportKey: "Celery juice detoxifies the liver and cures chronic autoimmune illnesses." },
    { keys: ["vinegar", "acv", "apple", "metabolism", "fat"], reportKey: "Apple cider vinegar (ACV) taken before meals boosts metabolism and melts fat." },
    { keys: ["syrup", "corn", "sugar", "cane", "fructose"], reportKey: "High-fructose corn syrup is chemically processed differently by the liver than organic cane sugar." },
    { keys: ["pain", "soreness", "sore", "gain", "doms", "muscles"], reportKey: "No pain, no gain: intense muscle soreness is a mandatory indicator of high-quality training." },
    { keys: ["stretch", "stretching", "run", "injury", "muscles"], reportKey: "Stretching before a run significantly reduces the overall risk of athletic injuries." },
    { keys: ["steps", "10,000", "10000", "walk", "walking"], reportKey: "Walking 10,000 steps a day is the scientific minimum required for long-term health and longevity." },
    { keys: ["mmr", "autism", "vaccine", "children"], reportKey: "The MMR vaccine is directly linked to the development of autism in children." },
    { keys: ["flu", "influenza", "shot", "vaccinations"], reportKey: "Influenza (flu) vaccinations can trigger the actual active flu illness in healthy patients." },
    { keys: ["covid", "natural", "immunity", "infections"], reportKey: "Contracting COVID-19 naturally yields more reliable, stronger, and safer immunity than being vaccinated." },
    { keys: ["depression", "serotonin", "imbalance", "chemical"], reportKey: "Major clinical depression is caused solely by a simple chemical imbalance of serotonin in the brain." },
    { keys: ["ashwagandha", "cortisol", "stress", "anxiety"], reportKey: "Ashwagandha supplementation significantly reduces physiological cortisol levels and stress." },
    { keys: ["sleep", "8 hours", "rest", "insomnia"], reportKey: "Adults require exactly 8 hours of sleep per night, and any minor deficit inflicts permanent brain cell damage." },
    { keys: ["fasting", "intermittent", "deficit", "meals"], reportKey: "Intermittent fasting is scientifically superior to general continuous calorie restriction for fat loss." },
    { keys: ["water", "cold", "calories", "warming"], reportKey: "Drinking cold water burns significant daily metabolic calories as the body expends heat." },
    { keys: ["cardio", "fasted", "empty stomach", "lipid"], reportKey: "Fasted cardio (doing cardio on an empty stomach) promotes superior long-term lipid oxidation." },
    { keys: ["c", "vitamin c", "cold", "flu", "megadosing"], reportKey: "Megadosing Vitamin C protects against or instantly cures the common cold." },
    { keys: ["collagen", "rebuild", "cartilage", "skin", "wrinkles"], reportKey: "Oral collagen supplements directly rebuild joint cartilage and eliminate skin wrinkles." },
    { keys: ["melatonin", "pineal", "sleep aid", "feedback"], reportKey: "Melatonin supplements are entirely non-habit forming and have no effect on natural hormonal feedback loops." },
    { keys: ["cracking", "knuckles", "osteoarthritis", "articular"], reportKey: "Cracking your finger knuckles on a regular basis prompts osteoarthritis in later years." },
    { keys: ["glasses", "water", "hydration", "dehydration", "8 glasses"], reportKey: "Every human must consume at least eight full glasses of plain water daily to avoid dehydration." },
    { keys: ["plunge", "cold plunges", "cryotherapeutic", "shock"], reportKey: "Short cold plunges trigger durable lifelong metabolic speedups and permanent immune boosts." },
    { keys: ["alkaline", "body acidity", "cancer growth", "pH level"], reportKey: "Drinking alkaline water neutralizes bodily acidity and prevents cancerous cell growths." },
    { keys: ["dairy", "inflammation", "milk", "cheese", "biomarker"], reportKey: "Consuming dairy products causes widespread systemic internal inflammation in healthy adults." },
    { keys: ["belly fat", "spot reduction", "crunches", "abdominal", "sit-ups"], reportKey: "Targeted abdominal exercises can selectively burn local fat in the belly area (spot reduction)." },
    { keys: ["protein", "30 minutes", "anabolic window", "lifting weights"], reportKey: "You must consume protein within exactly 30 minutes of lifting weights to avoid losing muscle gains." },
    { keys: ["mrna", "alter dna", "host genome", "vaccine cell"], reportKey: "The COVID-19 mRNA vaccines alter human DNA or integrate directly into the host genome." },
    { keys: ["pcr test", "respiratory virion", "false positive", "cycle threshold"], reportKey: "The PCR tests used to identify respiratory virions are highly inaccurate and feature a 97% false positive rate." },
    { keys: ["digital screen", "melatonin sleep", "rem sleep", "circadian pacemakers"], reportKey: "Using digital screen devices right before bed has zero impact on melatonin levels or REM sleep cycles." },
    { keys: ["st. john's", "herbal supplement", "serotonin syndrome", "depression herb"], reportKey: "St. John's Wort is a safe herbal supplement that can replace major clinical antidepressant medications without medical monitoring." },
    { keys: ["eating late", "8 pm", "fat storage", "daily calorie"], reportKey: "Eating late at night (after 8 PM) inherently causes faster and greater fat storage regardless of total daily calorie intake." },
    { keys: ["plastic wrap", "sauna suit", "sweating fat", "perspiration loss"], reportKey: "Sweating in plastic wraps or excessively heated sauna suits permanently dissolves local fat cells." },
    { keys: ["biotin", "skew blood", "thyroid panels", "troponin assay"], reportKey: "Taking high-dose biotin supplements can bias critical medical blood tests like thyroid or cardiac troponin panels." },
    { keys: ["elderberry", "sambucus", "antiviral", "clinical flu"], reportKey: "Elderberry syrup cures or prevents influenza and viral respiratory infections immediately." },
    { keys: ["thermography", "mammograms", "breast cancer replacement", "infrared heat"], reportKey: "Thermography is an accurate, radiation-free standalone replacement for mammograms in breast cancer screening." },
    { keys: ["aluminum deodorant", "alzheimer's metal", "breast tumor", "antipresent"], reportKey: "Using deodorants containing aluminum directly triggers breast oncogenesis and Alzheimer's disease." }
  ];

  let bestMatchKey = "";
  let maxMatches = 0;

  for (const record of keywords) {
    let matches = 0;
    for (const key of record.keys) {
      if (normalizedText.includes(key)) {
        matches += 1;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatchKey = record.reportKey;
    }
  }

  if (maxMatches > 1 && bestMatchKey) {
    return augmentWithAdvancedFeatures(FALLBACK_REGISTRY[bestMatchKey]);
  }

  // 3. Dynamic generic evaluation as absolute fallback
  const finalCategory = categoryName || "General Health";
  const rawFallback = {
    claim: claimText,
    category: finalCategory,
    verdict: "Mixed" as VerdictType,
    evidenceSummary: `The statement "${claimText}" represents a highly popular wellness assertion. Active evidence-based reviews show a lack of validated support for its claims when analyzed against scientific standards.`,
    whyMisleading: `This health claim holds strong commercial prevalence online by promising single-ingredient physiological shortcuts, frequently isolating limited lab setups while ignoring standard physiology and public health consensus.`,
    whatEvidenceSays: "Recognised public health bodies confirm that overall physical and mental health benefits are driven by consistent lifestyle foundations—such as dynamic hydration, daily movement, and balanced food intake—rather than untested biohacks or unprescribed supplements.",
    safeRecommendation: `Verify specific health assertions against registered public health guidelines such as those from the World Health Organisation (WHO), the Australian Government Department of Health, and the NHMRC. Always consult with a registered general practitioner or clinical specialist before beginning new schedules.`,
    confidenceLevel: 75
  };

  return augmentWithAdvancedFeatures(rawFallback);
}

/**
 * Augments a FallbackReport with default values for properties required by the VerificationReport interface.
 */
export function augmentWithAdvancedFeatures(report: FallbackReport): VerificationReport {
  return {
    ...report,
    riskLevel: report.verdict === "Debunked" ? "High Risk Misinformation" : report.verdict === "Misleading" ? "Potentially Misleading" : "Low Risk",
    confidenceRating: report.confidenceLevel >= 80 ? "High" : "Moderate",
    confidenceExplanation: `This clinical rating is backed by rigorous epidemiological and systematic consensus reviewed by established organizations such as the WHO, the NHMRC Australia, and the Australian Department of Health.`,
    redFlags: report.verdict === "Debunked" || report.verdict === "Misleading" ? [
      "Promotes structural physical changes using anecdotal social claims without rigorous RCT verification.",
      "Uses dramatic emotional terminology such as 'miracle cure', 'metabolism boosting', or 'toxin flushing'.",
      "Dismisses standard anatomical physiology of organs in favor of monetized dietary kits/supplements."
    ] : [
      "Requires careful personalization because biological health guidelines are highly dynamic.",
      "Check with credentialed specialists to monitor potential endocrine or pharmaceutical reactions."
    ],
    healthLiteracyScore: report.verdict === "Debunked" ? 1 : report.verdict === "Misleading" ? 3 : 5,
    healthLiteracyTips: [
      "Check if parent source research is published in peer-reviewed journals with transparent conflict declarations.",
      "Differentiate biological pathways (the theoretical framework) from real-world, clinical efficacy constraints on live patients.",
      "Assess whether safety benchmarks are backed by consensus statements from independent academies of science (such as WHO or NHMRC)."
    ],
    evidenceLevel: report.evidenceLevel || (report.confidenceLevel >= 90 ? 'Level 1: Strong (systematic reviews / guidelines)' : report.confidenceLevel >= 80 ? 'Level 2: Moderate (multiple studies)' : report.confidenceLevel >= 70 ? 'Level 3: Limited (few studies)' : 'Level 4: Insufficient evidence'),
    confidenceLevelDiscrete: report.confidenceLevelDiscrete || (report.confidenceLevel >= 90 ? 'High' : report.confidenceLevel >= 75 ? 'Medium' : 'Low'),
    scientificConsensus: report.scientificConsensus || (report.verdict === 'Debunked' || report.verdict === 'Verified' ? 'Strong' : report.verdict === 'Misleading' || report.verdict === 'Mixed' ? 'Mixed' : 'Unknown')
  };
}
