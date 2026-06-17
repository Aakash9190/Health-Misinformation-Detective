import { CuratedClaim } from './types';

export const CURATED_CLAIMS: CuratedClaim[] = [
  // Nutrition
  {
    id: 'nut-1',
    category: 'Nutrition',
    claim: 'Celery juice detoxifies the liver and cures chronic autoimmune illnesses.',
    description: 'A popular fitness influencer diet claim stating that drinking fresh pure celery juice on an empty stomach purges pathogens and heavy metals.',
    popularSource: 'Social media influencers, wellness bloggers',
    typicalVerdict: 'Debunked',
    biasRating: 'High'
  },
  {
    id: 'nut-2',
    category: 'Nutrition',
    claim: 'Apple cider vinegar (ACV) taken before meals boosts metabolism and melts fat.',
    description: 'Claim that apple cider vinegar consumption burns adipose tissue directly and speeds up overall digestion.',
    popularSource: 'Short form video channels, diet guides',
    typicalVerdict: 'Mixed',
    biasRating: 'Medium'
  },
  {
    id: 'nut-3',
    category: 'Nutrition',
    claim: 'High-fructose corn syrup is chemically processed differently by the liver than organic cane sugar.',
    description: 'Claim that HFCS is inherently more damaging and processed in a hazardous unique way compared to sucrose (table sugar).',
    popularSource: 'Organic food forums, alternative health documentaries',
    typicalVerdict: 'Mixed',
    biasRating: 'Medium'
  },
  {
    id: 'nut-4',
    category: 'Nutrition',
    claim: 'Drinking alkaline water neutralizes bodily acidity and prevents cancerous cell growths.',
    description: 'The biochemical belief that drinking water with a high pH (>8.0) alters blood acidity, creating an environment where cancer cells cannot survive.',
    popularSource: 'Alkaline diet books, premium bottled water marketing, alternative therapies',
    typicalVerdict: 'Debunked',
    biasRating: 'High'
  },
  {
    id: 'nut-5',
    category: 'Nutrition',
    claim: 'Consuming dairy products causes widespread systemic internal inflammation in healthy adults.',
    description: 'Social media warnings that milk, cheese, and yogurt elevate baseline inflammatory biomarkers and trigger multi-system organ damage in all humans.',
    popularSource: 'Plant-based advocacy sites, clean-eating social video channels',
    typicalVerdict: 'Debunked',
    biasRating: 'Medium'
  },

  // Exercise
  {
    id: 'exe-1',
    category: 'Exercise',
    claim: 'No pain, no gain: intense muscle soreness is a mandatory indicator of high-quality training.',
    description: 'The belief that without experiencing severe Delayed Onset Muscle Soreness (DOMS), the workout was ineffective or failed to prompt muscle growth.',
    popularSource: 'Gym culture, bodybuilding forums',
    typicalVerdict: 'Debunked',
    biasRating: 'Medium'
  },
  {
    id: 'exe-2',
    category: 'Exercise',
    claim: 'Stretching before a run significantly reduces the overall risk of athletic injuries.',
    description: 'The traditional belief that static stretching cools down or protects muscles from tearing during cardiovascular exercises.',
    popularSource: 'Physical education manuals, recreational sports clubs',
    typicalVerdict: 'Misleading',
    biasRating: 'Low'
  },
  {
    id: 'exe-3',
    category: 'Exercise',
    claim: 'Walking 10,000 steps a day is the scientific minimum required for long-term health and longevity.',
    description: 'The assumption that 10,000 steps is an evidence-backed physiological tipping point below which health outcomes decay.',
    popularSource: 'Pedometer marketing campaigns, consumer smartwatches',
    typicalVerdict: 'Mixed',
    biasRating: 'Low'
  },
  {
    id: 'exe-4',
    category: 'Exercise',
    claim: 'Targeted abdominal exercises can selectively burn local fat in the belly area (spot reduction).',
    description: 'Claim that doing high-repetition core exercises like sit-ups or crunches selectively metabolizes fat in localized adjacent tissue.',
    popularSource: 'Late-night fitness infomercials, trendy workout apps',
    typicalVerdict: 'Debunked',
    biasRating: 'Medium'
  },
  {
    id: 'exe-5',
    category: 'Exercise',
    claim: 'You must consume protein within exactly 30 minutes of lifting weights to avoid losing muscle gains.',
    description: 'The "anabolic window" claim stating that delayed protein ingestion severely limits muscular hypertrophy and adaptation.',
    popularSource: 'Fitness supplements marketing, bodybuilder handbooks',
    typicalVerdict: 'Misleading',
    biasRating: 'Low'
  },

  // Vaccines
  {
    id: 'vac-1',
    category: 'Vaccines',
    claim: 'The MMR vaccine is directly linked to the development of autism in children.',
    description: 'An infamous debunked claim originating from pre-print data manipulation regarding immunization schedules.',
    popularSource: 'Alternative health boards, anti-vaccine advocates',
    typicalVerdict: 'Debunked',
    biasRating: 'High'
  },
  {
    id: 'vac-2',
    category: 'Vaccines',
    claim: 'Influenza (flu) vaccinations can trigger the actual active flu illness in healthy patients.',
    description: 'The frequent patient concern that getting a flu shot causes a respiratory flu episode because of the vaccine contents.',
    popularSource: 'Patient word-of-mouth, social media comments',
    typicalVerdict: 'Debunked',
    biasRating: 'Medium'
  },
  {
    id: 'vac-3',
    category: 'Vaccines',
    claim: 'Contracting COVID-19 naturally yields more reliable, stronger, and safer immunity than being vaccinated.',
    description: 'The assertion that natural infection is clinically preferable to immunization for building future pathogen defense.',
    popularSource: 'Holistic healing groups, wellness platforms',
    typicalVerdict: 'Misleading',
    biasRating: 'High'
  },
  {
    id: 'vac-4',
    category: 'Vaccines',
    claim: 'The COVID-19 mRNA vaccines alter human DNA or integrate directly into the host genome.',
    description: 'The assertion that administered messenger RNA is transcribed backward into human eukaryotic genetic structures.',
    popularSource: 'Scicheck and Health Feedback debunk lists, alternative health blogs',
    typicalVerdict: 'Debunked',
    biasRating: 'High'
  },
  {
    id: 'vac-5',
    category: 'Vaccines',
    claim: 'The PCR tests used to identify respiratory virions are highly inaccurate and feature a 97% false positive rate.',
    description: 'Claim that genetic testing protocols are fundamentally flawed and misinterpret simple background contamination as active infection.',
    popularSource: 'Alternative wellness podcasts, social media graphics',
    typicalVerdict: 'Debunked',
    biasRating: 'High'
  },

  // Mental Health
  {
    id: 'men-1',
    category: 'Mental Health',
    claim: 'Major clinical depression is caused solely by a simple chemical imbalance of serotonin in the brain.',
    description: 'The historical advertising message that depression is a single-factor neurotransmitter deficiency cured outright by raising serotonin.',
    popularSource: 'Early pharmaceutical advertisements, self-help channels',
    typicalVerdict: 'Misleading',
    biasRating: 'Medium'
  },
  {
    id: 'men-2',
    category: 'Mental Health',
    claim: 'Ashwagandha supplementation significantly reduces physiological cortisol levels and stress.',
    description: 'The herbal adaptogen claim stating it lowers chronic stress biomarkers and mental anxiety levels.',
    popularSource: 'Nootropics networks, ayurvedic practitioners',
    typicalVerdict: 'Verified',
    biasRating: 'Low'
  },
  {
    id: 'men-3',
    category: 'Mental Health',
    claim: 'Adults require exactly 8 hours of sleep per night, and any minor deficit inflicts permanent brain cell damage.',
    description: 'Rigid sleep directives that treat 8 hours as an absolute biological threshold with zero healthy individual variance.',
    popularSource: 'Sensationalist health newsletters, lifestyle podcasts',
    typicalVerdict: 'Mixed',
    biasRating: 'Medium'
  },
  {
    id: 'men-4',
    category: 'Mental Health',
    claim: 'Using digital screen devices right before bed has zero impact on melatonin levels or REM sleep cycles.',
    description: 'The belief that modern screen emissions are physiologically harmless to the circadian biological clock and pineal gland activity.',
    popularSource: 'Commercial electronics advertisements, sleep trackers forums',
    typicalVerdict: 'Debunked',
    biasRating: 'Medium'
  },
  {
    id: 'men-5',
    category: 'Mental Health',
    claim: 'St. John\'s Wort is a safe herbal supplement that can replace major clinical antidepressant medications without medical monitoring.',
    description: 'Consuming hypericum perforatum instead of pharmaceutical SSRIs without managing potential multi-system medication interactions.',
    popularSource: 'Holistic health markets, alternative remedy guides',
    typicalVerdict: 'Misleading',
    biasRating: 'High'
  },

  // Weight Loss
  {
    id: 'wei-1',
    category: 'Weight Loss',
    claim: 'Intermittent fasting is scientifically superior to general continuous calorie restriction for fat loss.',
    description: 'The popular claim that fasting intervals activate unique metabolic adaptations that burn far more body fat at equal deficits.',
    popularSource: 'Biohacking forums, diet trend books',
    typicalVerdict: 'Mixed',
    biasRating: 'Medium'
  },
  {
    id: 'wei-2',
    category: 'Weight Loss',
    claim: 'Drinking cold water burns significant daily metabolic calories as the body expends heat.',
    description: 'The trick that drinking ice-cold drinks raises resting energy expenditure enough to stimulate continuous weight loss.',
    popularSource: 'Weight-loss lifehack listings, lifestyle forums',
    typicalVerdict: 'Misleading',
    biasRating: 'Low'
  },
  {
    id: 'wei-3',
    category: 'Weight Loss',
    claim: 'Fasted cardio (doing cardio on an empty stomach) promotes superior long-term lipid oxidation.',
    description: 'The theory that training before eating forces the body to shed fat reserves rather than burning circulating glycogen.',
    popularSource: 'Fitness and lifestyle coaches, athletic forums',
    typicalVerdict: 'Mixed',
    biasRating: 'Medium'
  },
  {
    id: 'wei-4',
    category: 'Weight Loss',
    claim: 'Eating late at night (after 8 PM) inherently causes faster and greater fat storage regardless of total daily calorie intake.',
    description: 'The physiological claim that food consumed late is processed differently by metabolic enzymes, shifting it directly into fat storage.',
    popularSource: 'Diet cookbooks, lifestyle advice articles, personal training blogs',
    typicalVerdict: 'Debunked',
    biasRating: 'Medium'
  },
  {
    id: 'wei-5',
    category: 'Weight Loss',
    claim: 'Sweating in plastic wraps or excessively heated sauna suits permanently dissolves local fat cells.',
    description: 'The commercial physical theory that increased perspiration in localized body wraps or heavy garments melts weight out of cellular tissue.',
    popularSource: 'Commercial spa therapies, late-night shapewear advertisements',
    typicalVerdict: 'Debunked',
    biasRating: 'High'
  },

  // Supplements
  {
    id: 'sup-1',
    category: 'Supplements',
    claim: 'Megadosing Vitamin C protects against or instantly cures the common cold.',
    description: 'The persistent health lore that eating multi-gram doses of vitamin C neutralizes rhinovirus infection on contact.',
    popularSource: 'Wellness packaging labels, cold-remedy marketing',
    typicalVerdict: 'Misleading',
    biasRating: 'Medium'
  },
  {
    id: 'sup-2',
    category: 'Supplements',
    claim: 'Oral collagen supplements directly rebuild joint cartilage and eliminate skin wrinkles.',
    description: 'Taking ingestible collagen powder directly transfers to dermal skin elasticity and structural knee linings.',
    popularSource: 'Cosmetic influencer videos, health-spa advertisements',
    typicalVerdict: 'Mixed',
    biasRating: 'High'
  },
  {
    id: 'sup-3',
    category: 'Supplements',
    claim: 'Melatonin supplements are entirely non-habit forming and have no effect on natural hormonal feedback loops.',
    description: 'The sleep aid claim indicating zero long-term dependency risk or down-regulation of endogenous pineal melatonin secretion.',
    popularSource: 'OTC sleep aid marketing, wellness newsletters',
    typicalVerdict: 'Mixed',
    biasRating: 'Low'
  },
  {
    id: 'sup-4',
    category: 'Supplements',
    claim: 'Taking high-dose biotin supplements can bias critical medical blood tests like thyroid or cardiac troponin panels.',
    description: 'The clinical endocrinology alert that substantial biotin intake (Vitamin B7) skews streptavidin lab testing assays.',
    popularSource: 'FDA warnings, clinical endocrinology journals, PubMed updates',
    typicalVerdict: 'Verified',
    biasRating: 'Low'
  },
  {
    id: 'sup-5',
    category: 'Supplements',
    claim: 'Elderberry syrup cures or prevents influenza and viral respiratory infections immediately.',
    description: 'Wellness claims that liquid Sambucus extracts build a biological shield that kills seasonal or invasive viruses on contact.',
    popularSource: 'Natural remedies forums, natural food store displays',
    typicalVerdict: 'Unsupported',
    biasRating: 'Medium'
  },

  // General Health
  {
    id: 'gen-1',
    category: 'General Health',
    claim: 'Cracking your finger knuckles on a regular basis prompts osteoarthritis in later years.',
    description: 'The age-old behavioral prohibition warning children that popping knuckles damages joint tissue integrity.',
    popularSource: 'Folk wisdom, parental warnings',
    typicalVerdict: 'Debunked',
    biasRating: 'Low'
  },
  {
    id: 'gen-2',
    category: 'General Health',
    claim: 'Every human must consume at least eight full glasses of plain water daily to avoid dehydration.',
    description: 'The standard hydration metric stating eight 8oz glasses is the default biological baseline for all humans, excluding other items.',
    popularSource: 'General lifestyle advice, bottled water media',
    typicalVerdict: 'Misleading',
    biasRating: 'Low'
  },
  {
    id: 'gen-3',
    category: 'General Health',
    claim: 'Short cold plunges trigger durable lifelong metabolic speedups and permanent immune boosts.',
    description: 'The biohacking immersion therapy claim saying brief exposure to freezing water builds permanent immunological reserves.',
    popularSource: 'Longevity podcasts, high-profile athletic platforms',
    typicalVerdict: 'Mixed',
    biasRating: 'High'
  },
  {
    id: 'gen-4',
    category: 'General Health',
    claim: 'Thermography is an accurate, radiation-free standalone replacement for mammograms in breast cancer screening.',
    description: 'The clinical claim that heat-mapping infrared cameras are equivalent or superior to standard radiographic breast scans.',
    popularSource: 'Alternative oncology brochures, alternative medicine blogs',
    typicalVerdict: 'Debunked',
    biasRating: 'High'
  },
  {
    id: 'gen-5',
    category: 'General Health',
    claim: 'Using deodorants containing aluminum directly triggers breast oncogenesis and Alzheimer\'s disease.',
    description: 'The toxicological concern that dermal heavy metal salts accumulate in lymph nodes to cause breast tissue mutation or brain plaque.',
    popularSource: 'Organic body care advertisements, forward-chain health letters',
    typicalVerdict: 'Debunked',
    biasRating: 'Medium'
  }
];
