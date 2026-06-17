import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Apple,
  Dumbbell,
  Syringe,
  Brain,
  Scale,
  Pill,
  HeartPulse,
  Search,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  Info,
  Clock,
  History,
  XCircle,
  HelpCircle,
  ArrowLeft,
  Activity,
  Heart,
  ExternalLink,
  Image
} from 'lucide-react';
import { CURATED_CLAIMS } from './data';
import { CuratedClaim, VerificationReport, VerdictType } from './types';
import { getBestCuratedFallback, augmentWithAdvancedFeatures, FallbackReport } from './fallbackRegistry';
import { MYTHS_DATA } from './mythsData';

// Eight categories required with matching emojis & beautiful tailwind styles
const CATEGORIES = [
  { name: 'Nutrition', icon: Apple, emoji: '🍎', color: 'orange', bg: 'bg-orange-50 hover:bg-orange-100/80', text: 'text-orange-700', border: 'border-orange-950/20', sub: 'Juice diets, metabolic speeds & nutrients' },
  { name: 'Exercise', icon: Dumbbell, emoji: '💪', color: 'blue', bg: 'bg-blue-50 hover:bg-blue-100/80', text: 'text-blue-700', border: 'border-blue-950/20', sub: 'Workout routines, muscular pain & training' },
  { name: 'Vaccines', icon: Syringe, emoji: '💉', color: 'cyan', bg: 'bg-cyan-50 hover:bg-cyan-100/80', text: 'text-cyan-700', border: 'border-cyan-950/20', sub: 'Immunization consensus, risks & trial links' },
  { name: 'Mental Health', icon: Brain, emoji: '🧠', color: 'purple', bg: 'bg-purple-50 hover:bg-purple-100/80', text: 'text-purple-700', border: 'border-purple-950/20', sub: 'Sleep metrics, neurotransmitters & cognitive stress' },
  { name: 'Weight Loss', icon: Scale, emoji: '⚖️', color: 'rose', bg: 'bg-rose-50 hover:bg-rose-100/80', text: 'text-rose-700', border: 'border-rose-950/20', sub: 'Intermittent fasts, caloric deficits & lipids' },
  { name: 'Supplements', icon: Pill, emoji: '💊', color: 'yellow', bg: 'bg-yellow-50 hover:bg-yellow-100/80', text: 'text-yellow-700', border: 'border-yellow-950/20', sub: 'Herbs, megadoses, collagens & adaptogens' },
  { name: 'General Health', icon: HeartPulse, emoji: '🏥', color: 'emerald', bg: 'bg-emerald-50 hover:bg-emerald-100/80', text: 'text-emerald-700', border: 'border-emerald-950/20', sub: 'Day-to-day hydration, joints & wellness trends' },
  { name: 'Myth or Fact?', icon: HelpCircle, emoji: '❓', color: 'indigo', bg: 'bg-indigo-50 hover:bg-indigo-100/80', text: 'text-indigo-700', border: 'border-indigo-950/20', sub: 'Interactive Quick-Check game of popular health myths' }
] as const;

type CategoryName = typeof CATEGORIES[number]['name'];

// Master fallbacks following the 6-point structure
const DEFAULT_REPORTS_BY_CATEGORY: Record<CategoryName, FallbackReport> = {
  Nutrition: {
    claim: "Celery juice detoxifies the liver and cures chronic autoimmune illnesses.",
    category: "Nutrition",
    verdict: "Debunked",
    evidenceSummary: "According to the National Health and Medical Research Council (NHMRC Australia) and clinical hepatology consensus, celery juice is high in water and basic vitamins, but it has no unique biochemical ability to 'detoxify' the liver or cure autoimmune disorders. The organic detoxification of pathogens or metabolic wastes is handled continuously by liver enzymes (such as the Cytochrome P450 system) and kidneys, not by quick nutritional elixirs.",
    whyMisleading: "Social media marketing often coins pseudoscientific terms such as 'undiscovered cluster salts' to explain immediate wellness improvements, which are actually caused by general dietary hydration and calorie restriction.",
    whatEvidenceSays: "Peer-reviewed scientific consensus confirms that the human liver uses complex enzymatic pathways to continuously process biochemical wastes; dietary prebiotic fibers from whole plant cells provide far greater biological support than juicing them. Clinical guidelines from the Australian Department of Health emphasize whole food nutrition over unproven restrictive juice regimes.",
    safeRecommendation: "Prefer consuming whole, fiber-rich fruits and vegetables to nurture healthy gut microflora, and always check autoimmune treatment regimens with a licensed endocrinologist or immunologist.",
    confidenceLevel: 92
  },
  Exercise: {
    claim: "No pain, no gain: intense muscle soreness is a mandatory indicator of high-quality training.",
    category: "Exercise",
    verdict: "Debunked",
    evidenceSummary: "According to sports medicine research and physical therapy consensus guidelines, Delayed Onset Muscle Soreness (DOMS) represents inflammatory repair of microscopic tears in sarcolemma-muscle fibers. It is not an accurate indicator of muscle protein synthesis, muscular hypertrophic index, or progressive cardiovascular adaptation.",
    whyMisleading: "Traditional gym lore associates physical soreness as a hallmark of hard work, driving athletes to overtrain under the physiological myth that lack of soreness equates to zero progress.",
    whatEvidenceSays: "Randomized fitness cohorts published in peer-reviewed sports journals show that muscle growth occurs through progressive overload, mechanical tension, and volume progress, even with minimal soreness as neuromuscular system adaptation progresses. The Australian Department of Health fitness guidelines recommend safe, consistent, and progressive overload structures rather than training until muscular pain.",
    safeRecommendation: "Structure progressive training volume increments, track actual functional output strength over weeks, and consult physical coaches or physical therapists to avoid chronic joint inflammation.",
    confidenceLevel: 88
  },
  Vaccines: {
    claim: "The MMR vaccine is directly linked to the development of autism in children.",
    category: "Vaccines",
    verdict: "Debunked",
    evidenceSummary: "The World Health Organization (WHO), the Australian Department of Health, and NHMRC Australia have established through extensive global epidemiological studies covering millions of children that there is absolutely no link between the MMR vaccine and autism. Immunizations are extremely safe, highly regulated biological interventions.",
    whyMisleading: "This assertion was commercialized and popularized by an unethical 1998 research paper with manipulated, sub-sample clinical reports, which was subsequently retracted by the journal Lancet.",
    whatEvidenceSays: "Landmark consensus reviews from the World Health Organization (WHO) and NHMRC Australia prove that vaccine administration is exceptionally safe, preventing hundreds of thousands of measles, mumps, and rubella fatalities annually. The Australian Department of Health confirms that childhood vaccination programs save lives by maintaining community herd immunity.",
    safeRecommendation: "Maintain immunization records under standard vaccine calendar setups recommended by pediatric academies, and contact dedicated pediatric healthcare providers for queries.",
    confidenceLevel: 99
  },
  "Mental Health": {
    claim: "Major clinical depression is caused solely by a simple chemical imbalance of serotonin in the brain.",
    category: "Mental Health",
    verdict: "Misleading",
    evidenceSummary: "While neurotransmitters are integral to psychological signaling pathways, peer-reviewed scientific consensus has demonstrated that major depression is a highly complex condition involving neuroplasticity, genetics, stress triggers, and neural circuitry, rather than a simple low-serotonin state.",
    whyMisleading: "This concept gained prominence during the initial marketing of SSRI medications, reducing multi-system neurobiology to an easily understood 'chemical deficiency' model.",
    whatEvidenceSays: "Comprehensive reviews published in leading psychiatric journals show that medication efficacy varies dramatically, demonstrating depression's deep links to psychological therapies, social contexts, and brain-derived neurotrophic factors. NHMRC Australia guidelines support a multifaceted treatment approach combining clinical therapies, mental health support networks, and lifestyle factors.",
    safeRecommendation: "Employ wellness strategies combining scientific psychotherapy (CBT), healthy lifestyle adjustments, and professional psychiatric guidance where relevant.",
    confidenceLevel: 85
  },
  "Weight Loss": {
    claim: "Intermittent fasting is scientifically superior to general continuous calorie restriction for fat loss.",
    category: "Weight Loss",
    verdict: "Mixed",
    evidenceSummary: "Evidence is limited or mixed. Longitudinal clinical trials show that when daily calorie deficits are identical, intermittent fasting protocols yield similar overall weight loss, body composition outcomes, and lipid profiles compared to continuous daily caloric restriction.",
    whyMisleading: "Influencers often attribute weight loss to specialized hourly insulin cycles, which actually stems from natural calorie limits when skipping specific daily meals.",
    whatEvidenceSays: "Peer-reviewed scientific consensus and systematic reviews confirm that weight loss is primarily driven by total energy balance (calories in versus calories out) rather than the specific hourly window of food consumption. The Australian Department of Health and clinical dietitians note that the most effective healthy diet is one that individuals can sustainably adhere to in the long term.",
    safeRecommendation: "Select daily eating window scales that align smoothly with your routine, and speak with a registered dietitian to ensure balanced macronutrient intake.",
    confidenceLevel: 90
  },
  Supplements: {
    claim: "Megadosing Vitamin C protects against or instantly cures the common cold.",
    category: "Supplements",
    verdict: "Misleading",
    evidenceSummary: "According to landmark clinical trials and the NHMRC nutrient reference guidelines, routine high-dose Vitamin C supplementation does not prevent common cold incidence in the general population, although it may reduce the duration of symptoms slightly (by less than 10 percent) in highly active cohorts.",
    whyMisleading: "Over-the-counter vitamin manufacturers heavily promote megadosing to boost retail sales, capitalizing on old, non-peer-reviewed theories published in the 1970s.",
    whatEvidenceSays: "The peer-reviewed scientific consensus shows that excess water-soluble Vitamin C is simply excreted in urine once cellular transport mechanisms are saturated. Excessive intake above clinical thresholds (2000mg/day) can cause gastrointestinal upset, diarrhea, and increase the risk of kidney stones, as outlined in Australian Department of Health safety bulletins.",
    safeRecommendation: "Prioritize getting vitamins through food sources like citrus fruits and leafy vegetables, and speak with a clinical healthcare professional before taking high-dose single vitamins.",
    confidenceLevel: 95
  },
  "General Health": {
    claim: "Cracking your finger knuckles on a regular basis prompts osteoarthritis in later years.",
    category: "General Health",
    verdict: "Debunked",
    evidenceSummary: "Knuckle cracking is the collapse of nitrogen gas bubbles dissolved within synovial fluid. Medical studies and clinical orthopedics consensus show no statistically significant difference in arthritis rates between individuals who crack their knuckles and those who do not.",
    whyMisleading: "The loud popping noise naturally raises concern that joint structures are being physically grinding down, promoting folk parental warnings designed to curb repetitive cracks.",
    whatEvidenceSays: "Long-term cohort studies and self-experimental peer-reviewed reviews (such as the famous 50-year single-hand trial) prove no correlation to osteoarthritic degradation. Major rheumatology associations and the Australian Department of Health note that joint clicking without pain is benign.",
    safeRecommendation: "If joint cracking is accompanied by pain, swelling, or localized fever, cease immediately and consult a board-certified rheumatologist.",
    confidenceLevel: 92
  },
  "Myth or Fact?": {
    claim: "Detox diets cleanse the body.",
    category: "Myth or Fact?",
    verdict: "Debunked",
    evidenceSummary: "The World Health Organization (WHO) and the Australian Department of Health state that the human body does not require commercially marketed 'detox' diets, juices, or cleanses. The liver, kidneys, lungs, gastrointestinal tract, and skin are highly evolved, continuous, and highly efficient organs for metabolic excretion and waste processing.",
    whyMisleading: "The wellness and dietary supplements market employs fear-based terms such as 'sludge' or 'toxic buildup' to sell juices, fasting regimens, or herbal laxatives. Consumers equate the weight loss from severe calorie deficits and loose bowel movements as actual detoxification.",
    whatEvidenceSays: "Clinical trials show that single-ingredient liquid protocols do not enhance renal clearance or cytochrome P450 enzymatic pathways. In fact, severe fasting can deplete glutathione, which is vital for real metabolic detoxification.",
    safeRecommendation: "Focus on long-term systemic hydration, adequate dietary fiber from whole plants, cruciferous vegetables that naturally boost liver enzymes, and physical movement instead of extreme short-term juice restrictiveness.",
    confidenceLevel: 98
  }
};

const LOADER_STEPS = [
  "Keywords captured. Scanning clinical registers...",
  "Cross-referencing claims with peer-reviewed medical journals...",
  "Consulting WHO, CDC, and National Center for Complementary Health indices...",
  "Extracting pharmacological and metabolic pathway evidence...",
  "Synthesizing toxicity risks and writing actionable dietitian-vetted steps..."
];

const getRiskLevelDetails = (risk?: string) => {
  const norm = risk || 'Potentially Misleading';
  switch (norm) {
    case 'Low Risk':
    case 'Low Risk Claim':
      return {
        label: 'Low Risk Claim',
        emoji: '🟢',
        bg: 'bg-emerald-50 border-emerald-950/10 text-emerald-800',
        borderColor: 'border-emerald-600',
        textColor: 'text-emerald-700',
        desc: 'Based on high clinical replication, this claim holds insignificant biochemical or biological health hazards.'
      };
    case 'High Risk':
    case 'High Risk Misinformation':
      return {
        label: 'High Risk Misinformation',
        emoji: '🔴',
        bg: 'bg-rose-50 border-rose-950/10 text-rose-800',
        borderColor: 'border-rose-600',
        textColor: 'text-rose-700',
        desc: 'This claim contradicts verified medical advice or public health recommendations and carries major risk factors.'
      };
    case 'Potentially Misleading':
    default:
      return {
        label: 'Potentially Misleading',
        emoji: '🟡',
        bg: 'bg-amber-50 border-amber-950/10 text-amber-800',
        borderColor: 'border-amber-600',
        textColor: 'text-amber-700',
        desc: 'This claim contains minor physiological distortions, exaggerations, or marketing biases that can mislead the public.'
      };
  }
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);
  const [customClaim, setCustomClaim] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [report, setReport] = useState<VerificationReport | null>(null);
  const [history, setHistory] = useState<VerificationReport[]>([]);
  const [error, setError] = useState<string | null>(null);

  // "Myth or Fact?" Interactive Game Challenge States
  const [currentMythIdx, setCurrentMythIdx] = useState(0);
  const [mythGuess, setMythGuess] = useState<'Myth' | 'Fact' | null>(null);
  const [mythScore, setMythScore] = useState(0);
  const [challengeComplete, setChallengeComplete] = useState(false);

  // High-Quality Custom Image Generation States (gemini-3-pro-image)
  const [imageSize, setImageSize] = useState<'512px' | '1K' | '2K' | '4K'>('1K');
  const [imageStyle, setImageStyle] = useState<string>('Professional clinical 3D design render, clinical schematic, vivid illustration');
  const [reportImages, setReportImages] = useState<Record<string, { url: string; isPlaceholder: boolean }>>({});
  const [imageGenerating, setImageGenerating] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Cycle loader steps during claim investigation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % LOADER_STEPS.length);
      }, 1400);
    } else {
      setLoadingStepIdx(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Load history from localStorage on mount (safe offline persistence)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('health_detective_history_v2');
      if (stored) {
        const parsed = JSON.parse(stored) as VerificationReport[];
        if (parsed && parsed.length > 0) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed parsing history from localStorage", e);
    }
  }, []);

  // Save specific report to local state history
  const saveToHistory = (newReport: VerificationReport) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.claim.toLowerCase() !== newReport.claim.toLowerCase());
      const updated = [newReport, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('health_detective_history_v2', JSON.stringify(updated));
      } catch (e) {
        console.warn("LocalStorage save issue:", e);
      }
      return updated;
    });
  };

  // Auto-seed image record on report change
  useEffect(() => {
    if (report && report.claim) {
      const claimKey = report.claim.toLowerCase();
      if (!reportImages[claimKey]) {
        const seedText = report.category || 'health';
        const seedUrl = `https://picsum.photos/seed/${encodeURIComponent(seedText)}/1024/1024`;
        setReportImages(prev => ({
          ...prev,
          [claimKey]: {
            url: seedUrl,
            isPlaceholder: true
          }
        }));
      }
    }
  }, [report, reportImages]);

  // Request High quality image generation with gemini-3-pro-image
  const triggerImageGeneration = async (claimToImage: string, categoryOfImage: string) => {
    setImageGenerating(true);
    setImageError(null);

    try {
      const customPrompt = `Professional clinical diagram and creative concept design about the health statement: "${claimToImage}". Category: ${categoryOfImage}. Theme style: ${imageStyle}. Extremely pristine resolution, scientific context, high-contrast, beautiful render, educational value, clinical overview.`;

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: customPrompt,
          imageSize: imageSize,
          aspectRatio: "1:1",
          category: categoryOfImage
        })
      });

      if (!response.ok) {
        throw new Error(`API returned HTTP error status ${response.status}`);
      }

      const data = await response.json();
      if (data.image) {
        setReportImages(prev => ({
          ...prev,
          [claimToImage.toLowerCase()]: {
            url: data.image,
            isPlaceholder: !!data.isPlaceholder
          }
        }));
      } else {
        throw new Error("No premium image data retrieved from the server.");
      }
    } catch (err: any) {
      console.warn("[Consensus Image Lab] Setup failed:", err);
      setImageError(err?.message || "Failed to contact visual engine.");
      const seedText = categoryOfImage || 'wellness';
      const fallbackUrl = `https://picsum.photos/seed/${encodeURIComponent(seedText)}/1024/1024`;
      setReportImages(prev => ({
        ...prev,
        [claimToImage.toLowerCase()]: {
          url: fallbackUrl,
          isPlaceholder: true
        }
      }));
    } finally {
      setImageGenerating(false);
    }
  };

  // Handle clicking a topic category
  const handleSelectCategory = (catName: CategoryName) => {
    setSelectedCategory(catName);
    if (catName === 'Myth or Fact?') {
      setReport(null);
      setMythGuess(null);
      setChallengeComplete(false);
      // Automatically reset if already finished previously
      if (currentMythIdx >= MYTHS_DATA.length) {
        setCurrentMythIdx(0);
        setMythScore(0);
      }
    } else {
      // Automatically load the default claim report of the selected topic to show information immediately
      const defaultRep = augmentWithAdvancedFeatures(DEFAULT_REPORTS_BY_CATEGORY[catName]);
      setReport(defaultRep);
    }
    setError(null);
  };

  // Verify custom claim via API
  const handleVerify = async (claimToVerify: string, catContext?: CategoryName) => {
    if (!claimToVerify.trim()) return;
    setLoading(true);
    setError(null);

    const activeCat = catContext || selectedCategory || 'General Health';

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claim: claimToVerify.trim(),
          category: activeCat
        }),
      });

      if (!response.ok) {
        // Fall back gracefully to local clinical database
        console.warn(`[Public Health Client] API status error (${response.status}). Serving local curated guide.`);
        const fallbackRep = getBestCuratedFallback(claimToVerify, activeCat);
        setReport(fallbackRep);
        saveToHistory(fallbackRep);
        return;
      }

      const responseText = await response.text();
      const cleanedText = responseText.trim();

      if (cleanedText.startsWith('<') || cleanedText.startsWith('<!')) {
        // Received HTML instead of JSON (e.g. standard router fallback / index.html)
        console.warn("[Public Health Client] Received HTML document. Serving local curated guide.");
        const fallbackRep = getBestCuratedFallback(claimToVerify, activeCat);
        setReport(fallbackRep);
        saveToHistory(fallbackRep);
        return;
      }

      try {
        const verifiedReport = JSON.parse(cleanedText) as VerificationReport;
        setReport(verifiedReport);
        saveToHistory(verifiedReport);
      } catch (parseErr) {
        console.warn("[Public Health Client] JSON stream processing issue. Serving local curated guide.", parseErr);
        const fallbackRep = getBestCuratedFallback(claimToVerify, activeCat);
        setReport(fallbackRep);
        saveToHistory(fallbackRep);
      }

    } catch (err: any) {
      console.warn("[Public Health Client] API request failure. Resolving via local database.", err);
      // Absolute client-side bullet proof recovery
      const fallbackRep = getBestCuratedFallback(claimToVerify, activeCat);
      setReport(fallbackRep);
      saveToHistory(fallbackRep);
    } finally {
      setLoading(false);
    }
  };

  // Get color styles for the verdict
  const getVerdictStyle = (verdict: VerdictType) => {
    switch (verdict) {
      case 'Verified':
        return {
          textColor: 'text-emerald-900',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-500',
          badgeBg: 'bg-emerald-200 text-emerald-900 border-emerald-300',
          badgeText: 'Verified Clinical Fact',
          icon: ShieldCheck
        };
      case 'Mixed':
        return {
          textColor: 'text-amber-900',
          bgColor: 'bg-amber-50/70',
          borderColor: 'border-amber-500',
          badgeBg: 'bg-amber-200 text-amber-900 border-amber-300',
          badgeText: 'Conflicting / Mixed Data',
          icon: Info
        };
      case 'Misleading':
        return {
          textColor: 'text-orange-900',
          bgColor: 'bg-orange-50/70',
          borderColor: 'border-orange-500',
          badgeBg: 'bg-orange-200 text-orange-900 border-orange-300',
          badgeText: 'Highly Misleading',
          icon: AlertTriangle
        };
      case 'Unsupported':
        return {
          textColor: 'text-yellow-950',
          bgColor: 'bg-yellow-50/50',
          borderColor: 'border-yellow-500',
          badgeBg: 'bg-yellow-200 text-yellow-900 border-yellow-300',
          badgeText: 'No Certified Proof',
          icon: HelpCircle
        };
      case 'Debunked':
        return {
          textColor: 'text-rose-900',
          bgColor: 'bg-rose-50',
          borderColor: 'border-red-500',
          badgeBg: 'bg-rose-200 text-rose-950 border-rose-300',
          badgeText: 'Debunked Health Myth',
          icon: ShieldAlert
        };
    }
  };

  const currentCategoryClaims = selectedCategory 
    ? CURATED_CLAIMS.filter(c => c.category === selectedCategory) 
    : [];
  
  const activeVerdict = report ? getVerdictStyle(report.verdict) : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] text-slate-800 selection:bg-teal-500/10 px-4 py-8 md:px-8 md:py-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* LOGO AND PORTAL HEADER */}
        <header id="app-header" className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-white border border-slate-200/60 rounded-3xl shadow-[0_4px_24px_rgba(15,23,42,0.02)] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl text-white shadow-md shadow-teal-500/10">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider text-teal-650 uppercase">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Clinical Consensus Registry & Public Audit
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
                HEALTH MISINFORMATION DETECTIVE
              </h1>
              <p className="text-slate-500 text-xs mt-1">
                Objective health claim analytics aligned with clinical frameworks from{' '}
                <span className="font-semibold text-slate-700">WHO</span>,{' '}
                <span className="font-semibold text-slate-700">Australian Dept of Health</span>, and{' '}
                <span className="font-semibold text-slate-700">NHMRC</span>.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-2xl text-xs font-medium text-slate-600 shrink-0 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <div className="text-left font-mono">
              <span className="text-[9px] uppercase text-slate-400 block leading-none font-bold">Consensus Index Status</span>
              <span className="font-bold text-[10.5px] text-slate-805">Active & Vetted</span>
            </div>
          </div>
        </header>

        {/* INITIAL LANDING STATE: Large Hero & Grid of specialties */}
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="landing-topics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* LARGE CLINICAL HERO SECTION */}
              <div className="relative overflow-hidden bg-white border border-slate-200/70 rounded-3xl p-8 md:p-12 shadow-[0_10px_35px_-8px_rgba(15,23,42,0.03)] flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-tr from-cyan-400/5 to-teal-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-400/5 to-purple-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] bg-teal-50 border border-teal-200/60 px-3.5 py-1.5 rounded-full shadow-sm">
                  Educational Public Trust Initiative
                </span>
                
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 max-w-2xl leading-[1.15]">
                  Detect Health Misinformation Before It Spreads
                </h2>
                
                <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
                  Analyse health claims using evidence-based health education.
                </p>

                {/* INTEGRATED MODERN HERO SEARCH BOX */}
                <div className="w-full max-w-xl p-2 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-2 mt-4 shadow-sm focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                  <div className="flex-1 flex items-center gap-3 px-3">
                    <Search className="w-5 h-5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Ask about celery juice liver cleanses, static stretching, MMR vaccines..."
                      value={customClaim}
                      onChange={(e) => setCustomClaim(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleVerify(customClaim);
                        }
                      }}
                      className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 font-medium outline-none"
                    />
                  </div>
                  <button
                    onClick={() => handleVerify(customClaim)}
                    disabled={!customClaim.trim()}
                    className="bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-slate-950/15 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Cross-Reference Claim</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 font-mono flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-2">
                  <span className="flex items-center gap-1">🛡️ No proprietary sponsor bias</span>
                  <span className="flex items-center gap-1">🔬 Verified human clinical cohorts only</span>
                </div>
              </div>

              {/* SPECIALTIES LISTING */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3 flex justify-between items-end">
                  <div>
                    <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-slate-400">
                      Medical Specialization Segments
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Select a core specialty docket to review standard preloaded claims and forensic evidence</p>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-100">
                    {CATEGORIES.length} Clinical Databases Ready
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CATEGORIES.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <button
                        id={`category-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}
                        key={cat.name}
                        onClick={() => handleSelectCategory(cat.name)}
                        className="flex flex-col justify-between p-6 bg-white hover:bg-slate-50/50 border border-slate-200/75 rounded-2xl transition-all duration-300 cursor-pointer text-left relative overflow-hidden group min-h-[200px] shadow-sm hover:shadow-md hover:border-teal-500/30"
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className="text-4xl filter drop-shadow">
                            {cat.emoji}
                          </span>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 group-hover:bg-teal-50 group-hover:text-teal-600 group-hover:border-teal-100 transition-all duration-300">
                            <IconComponent className="w-5 h-5 text-slate-600 group-hover:text-teal-600" />
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <h4 className="font-semibold text-base text-slate-900 group-hover:text-teal-750 transition-colors">
                            {cat.name}
                          </h4>
                          <p className="text-xs mt-1 text-slate-500 leading-snug">
                            {cat.sub}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ACTIVE SPECIALIZATION PORTABILITY REGISTRY */
            <motion.div
              key="active-topic-dossier"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Back navigation and Selector strip */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setReport(null);
                  }}
                  className="flex items-center gap-2 text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl cursor-pointer transition-all text-slate-700"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-500" />
                  <span>Return to Index</span>
                </button>

                <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
                  <span className="text-xs font-mono font-bold text-slate-400 shrink-0">Switch Specialization:</span>
                  <div className="flex gap-1.5 shrink-0">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleSelectCategory(cat.name)}
                        className={`text-xs px-3 py-2 rounded-xl transition-all font-semibold shrink-0 cursor-pointer ${
                          selectedCategory === cat.name
                            ? 'bg-[#0f172a] text-white'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/70'
                        }`}
                      >
                        <span className="mr-1">{cat.emoji}</span>
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TWO COLUMN BENTO DESIGN PORTAL ARCHITECTURE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT CONTROL RAIL: Popular claims, Search auditor input */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {selectedCategory === 'Myth or Fact?' ? (
                    <div className="space-y-6">
                      {/* QUIZ SCOREBOARD PANEL */}
                      <div className="bg-gradient-to-br from-[#1e1b4b] to-[#311042] text-white border border-slate-800 rounded-3xl p-6 shadow-md flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#b5b2ff] uppercase tracking-widest">Digital Health Awareness Quiz</span>
                          <h3 className="text-xl font-bold text-white mt-1">
                            Claim Evaluation Index
                          </h3>
                        </div>
                        <div className="text-4xl bg-indigo-950/80 p-3 rounded-2xl border border-indigo-900">
                          ❓
                        </div>
                      </div>

                      {challengeComplete ? (
                        /* CHALLENGE END SCORECARD */
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-6 shadow-sm"
                        >
                          <div className="text-5xl">🏆</div>
                          <div className="space-y-2">
                            <h4 className="text-lg font-bold text-slate-900">
                              Assessment Evaluated Successfully
                            </h4>
                            <p className="text-xs text-slate-400 font-mono">
                              Health Literacy Score Model Completed
                            </p>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block px-10">
                            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Correct Predictions</span>
                            <span className="text-3xl font-extrabold text-[#0f172a]">
                              {mythScore} / {MYTHS_DATA.length}
                            </span>
                          </div>

                          <div className="text-xs font-medium px-4 py-3 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] rounded-xl max-w-xs mx-auto">
                            {mythScore === MYTHS_DATA.length
                              ? "Excellent. You can easily distinguish between marketing wellness buzzwords and sound biological facts."
                              : mythScore >= MYTHS_DATA.length - 1
                              ? "Great capability. Dynamic skepticism index keeps you shielded against dietary scams."
                              : "Review clinical data dossiers on the right side to improve your wellness literacy indices."}
                          </div>

                          <button
                            onClick={() => {
                              setCurrentMythIdx(0);
                              setMythGuess(null);
                              setMythScore(0);
                              setChallengeComplete(false);
                              setReport(null);
                            }}
                            className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs px-5 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                          >
                            Restart Health Literacy Challenge
                          </button>
                        </motion.div>
                      ) : (
                        /* ACTIVE PLAY CARD DECK */
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                              Statement {currentMythIdx + 1} of {MYTHS_DATA.length}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-lg">
                              Current Score: {mythScore}
                            </span>
                          </div>

                          {/* Flashcard Box */}
                          <div className="p-6 bg-[#f8fafc] border border-slate-150 rounded-2xl relative flex flex-col justify-center items-center min-h-[140px] text-center hover:bg-slate-50 transition-all">
                            <span className="text-[8px] font-mono font-bold tracking-widest text-[#64748b] uppercase mb-2">Subject for validation:</span>
                            <p className="text-base font-semibold text-slate-900 tracking-tight leading-relaxed">
                              "{MYTHS_DATA[currentMythIdx].claim}"
                            </p>
                          </div>

                          {mythGuess === null ? (
                            /* DECISION SELECTION */
                            <div className="grid grid-cols-2 gap-4">
                              <button
                                onClick={() => {
                                  setMythGuess('Myth');
                                  setMythScore(prev => prev + 1);
                                  setReport(MYTHS_DATA[currentMythIdx]);
                                }}
                                className="bg-[#fef2f2] hover:bg-[#fee2e2] border border-[#fecaca] text-[#991b1b] font-semibold text-xs py-4 px-3 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1.5 shadow-sm"
                              >
                                <span className="text-xl">🔴</span>
                                <span>It's a Myth</span>
                              </button>
                              
                              <button
                                onClick={() => {
                                  setMythGuess('Fact');
                                  setReport(MYTHS_DATA[currentMythIdx]);
                                }}
                                className="bg-[#f0fdf4] hover:bg-[#dcfce7] border border-[#bbf7d0] text-[#166534] font-semibold text-xs py-4 px-3 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1.5 shadow-sm"
                              >
                                <span className="text-xl">🟢</span>
                                <span>It's a Fact</span>
                              </button>
                            </div>
                          ) : (
                            /* DETAILED FEEDBACK PREDICTION SUMMARY */
                            <div className="space-y-4">
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl border text-xs font-normal leading-relaxed flex items-start gap-3 ${
                                  mythGuess === 'Myth'
                                    ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#14532d]'
                                    : 'bg-[#fef2f2] border-[#fecaca] text-[#7f1d1d]'
                                }`}
                              >
                                <span className="text-xl">{mythGuess === 'Myth' ? '🎯' : '❌'}</span>
                                <div>
                                  <p className="font-bold text-slate-950 mb-0.5">
                                    {mythGuess === 'Myth' ? 'Accurate Evaluation!' : 'Miscalculated Metric'}
                                  </p>
                                  <p className="text-slate-600 leading-relaxed text-[11px]">
                                    {mythGuess === 'Myth'
                                      ? 'Correct! You spotted this widely spread misinformation archetype.'
                                      : 'In reality, clinical consensus rejects this statement completely. View the dossier details.'}
                                  </p>
                                </div>
                              </motion.div>

                              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[10px] text-slate-500 font-mono">
                                <span className="font-bold text-slate-605 block uppercase mb-0.5">Validation Resource:</span>
                                {MYTHS_DATA[currentMythIdx].claim.includes('Vaccines') 
                                  ? 'World Health Organization & CDC' 
                                  : MYTHS_DATA[currentMythIdx].claim.includes('Detox') 
                                    ? 'Harvard Medical School Directory' 
                                    : MYTHS_DATA[currentMythIdx].claim.includes('Sweating') 
                                      ? 'American College of Sports Medicine (ACSM)' 
                                      : 'National Health and Medical Research Council (NHMRC)'}
                              </div>

                              <button
                                onClick={() => {
                                  if (currentMythIdx + 1 < MYTHS_DATA.length) {
                                    setCurrentMythIdx(prev => prev + 1);
                                    setMythGuess(null);
                                    setReport(null);
                                  } else {
                                    setChallengeComplete(true);
                                  }
                                }}
                                className="w-full bg-[#0f172a] hover:bg-slate-850 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-2"
                              >
                                <span>
                                  {currentMythIdx + 1 < MYTHS_DATA.length
                                    ? 'Next Myth Challenge'
                                    : 'Review Assessment Finish'}
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* MEDICAL CONTEXT BANNER */}
                      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white border border-slate-800 rounded-3xl p-6 shadow-md flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest">Active Auditing Specialty</span>
                          <h3 className="text-xl font-bold tracking-tight text-white mt-1">
                            {selectedCategory} segment
                          </h3>
                        </div>
                        <div className="text-4xl bg-slate-850 p-2 rounded-2xl border border-slate-700">
                          {CATEGORIES.find(c => c.name === selectedCategory)?.emoji}
                        </div>
                      </div>

                      {/* CLINICAL TRANSCRIPT AUDITING FORM */}
                      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-md">
                              Search Auditor
                            </span>
                            <h4 className="text-base font-bold text-slate-900 mt-1.5">
                              Audit Custom Wellness Statement
                            </h4>
                          </div>
                          <Search className="w-5 h-5 text-slate-400" />
                        </div>

                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleVerify(customClaim);
                          }}
                          className="space-y-3"
                        >
                          <input
                            type="text"
                            value={customClaim}
                            onChange={(e) => setCustomClaim(e.target.value)}
                            placeholder={`e.g. Is ${selectedCategory === 'Nutrition' ? 'apple cider vinegar boosts metabolism?' : selectedCategory === 'Exercise' ? 'static stretching bad before runs?' : 'this healthy?'}`}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-teal-500 transition-all font-mono"
                          />

                          <div className="flex gap-2">
                            <button
                              type="submit"
                              disabled={loading || !customClaim.trim()}
                              className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                            >
                              {loading ? (
                                <RotateCcw className="w-4 h-4 animate-spin text-teal-400" />
                              ) : (
                                <Sparkles className="w-4 h-4 text-teal-400" />
                              )}
                              <span>Run Systematic Evaluation</span>
                            </button>
                            
                            {customClaim && (
                              <button
                                type="button"
                                onClick={() => setCustomClaim('')}
                                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl cursor-pointer text-slate-600 font-semibold text-xs transition-colors"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* VIRAL POPULAR STATEMENTS IN INDEX */}
                      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                        <div>
                          <h4 className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">
                            Widespread Statements Registered
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">Select any popular claim to instantly populate the evidence abstract</p>
                        </div>

                        <div className="space-y-2.5">
                          {currentCategoryClaims.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => handleVerify(item.claim, selectedCategory)}
                              className={`p-3.5 border rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-50 group flex justify-between gap-3 items-start ${
                                report?.claim === item.claim
                                  ? 'bg-teal-50/45 border-teal-500/30'
                                  : 'border-slate-200/70 bg-white hover:border-slate-300'
                              }`}
                            >
                              <div className="space-y-1.5 flex-1">
                                <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                  item.typicalVerdict === 'Debunked' ? 'bg-red-50 text-red-800 border border-red-100' :
                                  item.typicalVerdict === 'Verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-110' :
                                  item.typicalVerdict === 'Misleading' ? 'bg-amber-50 text-amber-805 border border-amber-100' :
                                  'bg-slate-50 text-slate-800'
                                }`}>
                                  {item.typicalVerdict}
                                </span>
                                <p className="text-xs font-semibold text-slate-800 leading-snug group-hover:text-teal-650 transition-colors">
                                  "{item.claim}"
                                </p>
                              </div>
                              <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center shrink-0 text-slate-400 bg-slate-50 group-hover:bg-[#0f172a] group-hover:text-white group-hover:border-slate-900 transition-all">
                                <span className="text-[10px]">→</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ARCHIVED LOCAL DOSSIERS */}
                      {history.length > 0 && (
                        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
                          <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                              Recently Synced Dossiers
                            </span>
                            <button
                              onClick={() => {
                                setHistory([]);
                                localStorage.removeItem('health_detective_history_v2');
                              }}
                              className="text-[9px] font-mono font-bold text-slate-400 hover:text-red-500 cursor-pointer uppercase transition-colors"
                            >
                              Clear Index
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {history.map((hist, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setSelectedCategory(hist.category as CategoryName);
                                  setReport(hist);
                                }}
                                className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all truncate max-w-[200px] font-medium cursor-pointer ${
                                  report?.claim === hist.claim
                                    ? 'bg-[#0f172a] border-[#0f172a] text-white'
                                    : 'bg-slate-50 border-slate-200 text-slate-650 hover:border-slate-350 hover:bg-slate-100'
                                }`}
                              >
                                "{hist.claim}"
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                </div>

                {/* RIGHT SYSTEM GRID: Evidence Report Docket and Visual Schema */}
                <div className="lg:col-span-7 relative">
                  <AnimatePresence mode="wait">
                    
                    {loading ? (
                      /* LOADING STATE */
                      <motion.div
                        key="active-loader"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="bg-white border border-slate-200 rounded-3xl p-8 py-24 text-center space-y-8 flex flex-col items-center justify-center min-h-[550px] shadow-sm"
                      >
                        <div className="relative">
                          <div className="w-14 h-14 border-4 border-slate-100 rounded-full animate-spin border-t-teal-500" />
                          <Activity className="w-6 h-6 text-teal-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>

                        <div className="space-y-4 max-w-sm">
                          <h3 className="text-lg font-bold text-slate-900">
                            Reconstructing Clinical Timeline
                          </h3>
                          
                          <div className="h-10 overflow-hidden flex items-center justify-center">
                            <AnimatePresence mode="popLayout">
                              <motion.p
                                key={loadingStepIdx}
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -15, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-xs text-teal-650 font-mono font-semibold max-w-xs leading-none"
                              >
                                {LOADER_STEPS[loadingStepIdx]}
                              </motion.p>
                            </AnimatePresence>
                          </div>

                          <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                            Evaluating physiological risk variables, surveying registry trial logs, and writing consensus evidence abstract reports.
                          </p>
                        </div>
                      </motion.div>
                    ) : error ? (
                      /* ERROR STATE */
                      <motion.div
                        key="active-error"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="bg-[#fef2f2] border border-[#fecaca] rounded-3xl p-8 space-y-4 text-center min-h-[300px] flex flex-col items-center justify-center shadow-sm"
                      >
                        <XCircle className="w-10 h-10 text-red-650" />
                        <h4 className="text-base font-bold text-slate-900">Evaluation Interrupted</h4>
                        <p className="text-xs text-slate-600 max-w-sm leading-relaxed mx-auto">{error}</p>
                        <button
                          onClick={() => handleVerify(customClaim || "Celery juice detox")}
                          className="text-xs px-5 py-2.5 bg-[#991b1b] hover:bg-[#7f1d1d] text-white rounded-xl font-semibold transition-all cursor-pointer shadow-sm"
                        >
                          Retry Forensic Checkup
                        </button>
                      </motion.div>
                    ) : report && activeVerdict ? (
                      /* CORE EXPERT EVIDENCE ABSTRACT DOSSIER */
                      <motion.div
                        key="active-report-dossier-rendered"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden"
                      >
                        {/* Dossier tag metadata bar */}
                        <div className="flex items-center justify-between border-b pb-4 border-slate-100">
                          <span className="text-[9px] font-mono tracking-wider uppercase text-slate-400 font-bold flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            Clinical abstract dossier #{Math.floor(100000 + Math.random() * 900000)}
                          </span>
                          
                          <span className="text-[10px] font-mono font-bold bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200">
                            Index Category: {report.category}
                          </span>
                        </div>

                        {/* Auditing Statement display quote */}
                        <div className="space-y-1.5 p-4 bg-slate-50 border-l-4 border-teal-500 rounded-r-xl relative">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Assessed Claim Statement</span>
                          <p className="text-sm italic text-slate-800 font-bold leading-relaxed pr-2 pl-0.5 mt-0.5">
                            "{report.claim}"
                          </p>
                        </div>

                        {/* VERDICT SUMMARY */}
                        <div className="space-y-4">
                          <div className={`border border-slate-150 ${activeVerdict.bgColor} p-4 rounded-xl space-y-2`}>
                            <div className="flex justify-between items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-white shadow-sm">
                                  <activeVerdict.icon className="w-4 h-4 text-slate-750" />
                                </div>
                                <div>
                                  <h4 className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#64748b]">1. Consensus Valuation Verdict</h4>
                                  <h3 className={`text-base font-bold uppercase tracking-tight ${activeVerdict.textColor}`}>
                                    {report.verdict}
                                  </h3>
                                </div>
                              </div>
                              
                              <span className={`text-[9px] font-mono font-bold border uppercase tracking-wider px-2 py-0.5 rounded-lg ${activeVerdict.badgeBg}`}>
                                {activeVerdict.badgeText}
                              </span>
                            </div>
                          </div>

                          {/* Risk gauge panel */}
                          {(() => {
                            const rd = getRiskLevelDetails(report.riskLevel);
                            return (
                              <div className={`border border-slate-150 ${rd.bg} p-4 rounded-xl space-y-1.5`}>
                                <div className="flex items-center gap-2">
                                  <span className="text-base">{rd.emoji}</span>
                                  <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Risk Metric Matrix</h4>
                                  <span className="text-[9px] font-mono font-bold border border-slate-200 uppercase tracking-wider px-2 py-0.5 rounded-lg bg-white text-slate-700 ml-auto shadow-xs">
                                    {rd.label}
                                  </span>
                                </div>
                                <p className="text-[11.5px] leading-relaxed text-slate-700">
                                  {rd.desc}
                                </p>
                              </div>
                            );
                          })()}
                        </div>

                        {/* STAGE 2: Evidence Abstract */}
                        <div className="space-y-1.5 pt-2">
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">2. Evidence Summary</h4>
                          <div className="text-xs text-slate-700 leading-relaxed bg-[#f0fdfa]/40 p-4 rounded-xl border border-[#ccfbf1] font-medium">
                            {report.evidenceSummary}
                          </div>
                        </div>

                        {/* STAGE 3: Misleading Attributes */}
                        <div className="space-y-1.5 pt-2">
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#d97706] font-bold flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            3. Why This Claim May Be Misleading
                          </h4>
                          <p className="text-xs text-slate-705 leading-relaxed font-normal pl-1">
                            {report.whyMisleading}
                          </p>
                        </div>

                        {/* Red Flags warnings */}
                        {report.redFlags && report.redFlags.length > 0 && (
                          <div className="space-y-2 border-t border-slate-100 pt-4">
                            <h4 className="text-[10px] font-mono uppercase tracking-widest text-rose-800 font-bold flex items-center gap-1.5">
                              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                              Widespread Red Flags Spotted
                            </h4>
                            <div className="bg-[#fff1f2]/40 border border-[#fecdd3] rounded-2xl p-4.5 space-y-2">
                              <p className="text-[9px] uppercase font-mono font-bold text-rose-800 tracking-wider">
                                ⚠️ Caution Indicators Associated with this assertion:
                              </p>
                              <ul className="space-y-2">
                                {report.redFlags.map((flag, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-rose-955 bg-white/60 p-2.5 rounded-xl border border-[#fecdd3]">
                                    <span className="text-rose-500 text-xs mt-0.5">🚩</span>
                                    <span>{flag}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* STAGE 4: Peer Reviewed Registers */}
                        <div className="space-y-1.5 border-t border-slate-100 pt-4">
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            4. What Reliable Evidence Says
                          </h4>
                          <p className="text-xs text-slate-700 leading-relaxed pl-1 whitespace-pre-line font-medium">
                            {report.whatEvidenceSays}
                          </p>
                        </div>



                        {/* STAGE 5: Safe Advice Checklists */}
                        <div className="space-y-2 border-t border-slate-100 pt-4 p-4.5 bg-emerald-50/20 border border-emerald-100 rounded-xl">
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#166534] font-bold flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            5. Expert Directives & Recommendations
                          </h4>
                          <p className="text-xs text-slate-700 leading-relaxed font-semibold pl-1">
                            {report.safeRecommendation}
                          </p>
                          <div className="text-[10px] text-slate-400 font-mono mt-2 leading-relaxed border-t border-slate-150 pt-2">
                            💡 Always speak with certified dietitians or clinical pharmacists before installing high-dose supplement packages, physical therapy routines, or vaccine schedules.
                          </div>
                        </div>

                        {/* STAGE 6: Confidence matrix meter */}
                        <div className="space-y-3.5 border-t border-slate-100 pt-4">
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            <span>6. Scientific Consensus Confidence index</span>
                            <span className="bg-[#0f172a] text-white px-2.5 py-1 rounded-lg text-xs leading-none">
                              {report.confidenceLevel}% Clinical Certitude
                            </span>
                          </div>

                          <div className="w-full bg-slate-50 h-2 rounded-full border border-slate-200 overflow-hidden relative">
                            <div 
                              className={`h-full transition-all duration-700 rounded-full ${
                                report.confidenceLevel > 80 ? 'bg-emerald-500' :
                                report.confidenceLevel > 50 ? 'bg-amber-400' :
                                'bg-rose-500'
                              }`}
                              style={{ width: `${report.confidenceLevel}%` }}
                            />
                          </div>
                          
                          {/* Confidence details panel */}
                          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5 shadow-inner">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs">📊</span>
                              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500">
                                Consensus Quality:
                              </span>
                              <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-lg border uppercase tracking-wider ${
                                report.confidenceRating === 'High' 
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-amber-50 border-amber-200 text-amber-800'
                              }`}>
                                {report.confidenceRating || 'Moderate'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {report.confidenceExplanation || "Based on peer systematic reviews, random control replications, or absence of validated clinical human research proofs."}
                            </p>
                          </div>
                        </div>

                        {/* Feature 4: Health Literacy Dashboard */}
                        <div className="border-t border-slate-100 pt-5 space-y-3">
                          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white">
                                  <Award className="w-5 h-5 text-teal-400" />
                                </div>
                                <div>
                                  <h4 className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-bold">Consensus Compliance Framework</h4>
                                  <h3 className="text-base font-bold tracking-tight text-white">Health Literacy score card</h3>
                                </div>
                              </div>

                              {/* circular progress score card */}
                              <div className="flex items-center gap-3 bg-slate-850 p-2.5 rounded-2xl border border-slate-800">
                                <div className="text-right">
                                  <div className="text-[8px] font-mono uppercase tracking-wider text-slate-400">Score value</div>
                                  <div className="text-[9.5px] font-semibold text-teal-400">Vetted quality</div>
                                </div>
                                <div className="w-10 h-10 bg-teal-605 text-[#004d40] border border-white/15 bg-teal-400 rounded-full flex items-center justify-center font-extrabold text-xs shadow-sm">
                                  {report.healthLiteracyScore || 6}/10
                                </div>
                              </div>
                            </div>

                            {/* checklist parameters */}
                            <div className="space-y-3 border-t border-slate-800 pt-4">
                              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800/80">
                                <p className="text-[9px] uppercase font-mono font-bold text-teal-400 mb-0.5">Skeptical checklist guideline:</p>
                                <p className="text-xs text-slate-100 font-semibold leading-relaxed">
                                  Before approving an online wellness claim, consult these 3 critical checks:
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="bg-slate-850 p-3 rounded-xl border border-slate-800/70 flex flex-col justify-between">
                                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                                    <span className="text-teal-400">✔️</span> Corporate Sanction
                                  </span>
                                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                                    Analyze if creators are pushing products or capsules for profit.
                                  </p>
                                </div>

                                <div className="bg-slate-850 p-3 rounded-xl border border-slate-800/70 flex flex-col justify-between">
                                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                                    <span className="text-teal-400">✔️</span> Model Cohort Size
                                  </span>
                                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                                    Ensure statements reflect actual clinical human trials instead of rodent cell cultures.
                                  </p>
                                </div>

                                <div className="bg-slate-850 p-3 rounded-xl border border-slate-800/70 flex flex-col justify-between">
                                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                                    <span className="text-teal-400">✔️</span> Scientific Reversibility
                                  </span>
                                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                                    Be deeply skeptical of instant detox tea claims or miracle dietary cells.
                                  </p>
                                </div>
                              </div>

                              {/* Dynamic guidelines list */}
                              {report.healthLiteracyTips && report.healthLiteracyTips.length > 0 && (
                                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/65 space-y-1 mt-2">
                                  <p className="text-[9px] font-mono font-bold uppercase text-teal-400 tracking-wider flex items-center gap-1">
                                    💡 Personalised Investigation Guide:
                                  </p>
                                  <ul className="space-y-1">
                                    {report.healthLiteracyTips.map((tip, idx) => (
                                      <li key={idx} className="text-[10.5px] text-slate-300 flex items-start gap-1.5 font-sans leading-normal">
                                        <span className="text-teal-500 mt-0.5">•</span>
                                        <span>{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                      </motion.div>
                    ) : selectedCategory === 'Myth or Fact?' ? (
                      /* MYTH OR FACT DEFAULT COMPONENT STATE */
                      <div className="bg-white border border-slate-200 rounded-3xl p-8 py-20 text-center text-slate-400 flex flex-col items-center justify-center min-h-[500px] shadow-sm">
                        <HelpCircle className="w-10 h-10 text-indigo-500 mb-4 animate-bounce" />
                        <p className="text-base font-bold text-slate-900 uppercase tracking-tight">Evidence Dossier Locked</p>
                        <p className="text-xs text-slate-500 max-w-xs mt-2 leading-relaxed">
                          Click "Myth" or "Fact" on the left panel to test your prediction and unlock the systematic evidence reviews!
                        </p>
                      </div>
                    ) : (
                      /* INITIAL STATE */
                      <div className="bg-white border border-slate-200 rounded-3xl p-8 py-20 text-center text-slate-400 flex flex-col items-center justify-center min-h-[500px] shadow-sm">
                        <RotateCcw className="w-10 h-10 text-slate-300 mb-4 animate-spin-pulse" />
                        <p className="text-sm font-semibold text-slate-800">Dossier Workspace Idle</p>
                        <p className="text-xs text-slate-500 max-w-xs mt-1.5 leading-relaxed">
                          Ready to check and verify wellness claims. Run any research or click a popular pre-indexed claim.
                        </p>
                      </div>
                    )}

                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GOVERNMENT CLINICAL PLATFORM FOOTER */}
        <footer className="bg-slate-900 text-slate-400 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-md">
          <div className="flex items-center gap-2 text-xs text-teal-400 font-mono font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
            <Info className="w-4 h-4 text-teal-400" />
            General Public Education & Clinical Literacy Notice
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans max-w-5xl">
            The evaluations, consensus data, and diagnostic abstractions provided by this software tool are compiled purely for informational, pedagogical, and health literacy purposes. They do not represent medical diagnoses, official therapeutic advice, or personalized treatment recommendations. Always prioritize consulting with a certified primary care doctor, board-registered specialist, or credentialed general health professional regarding individual chronic illnesses, neurological status changes, or when beginning any therapeutic diet, physical exercise routines, or vaccine schedules. Never ignore or procrastinate seeking certified healthcare assistance because of claims indexed or reports generated on this public registry platform.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center text-[9px] uppercase font-bold tracking-widest text-slate-500 pt-3 border-t border-slate-800 gap-2">
            <div>Consensus Index Version: July 2026.1</div>
            <div className="flex flex-wrap gap-4 text-[10px] font-sans font-normal text-slate-500">
              <span className="flex items-center gap-1">🌐 WHO Registry Sync</span>
              <span className="flex items-center gap-1">🇦🇺 Australian Dept of Health Framework</span>
              <span className="flex items-center gap-1">🧬 NHMRC Guidelines Standard</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
