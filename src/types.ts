export type VerdictType = 'Verified' | 'Mixed' | 'Misleading' | 'Unsupported' | 'Debunked';

export interface CuratedClaim {
  id: string;
  category: 'Nutrition' | 'Exercise' | 'Vaccines' | 'Mental Health' | 'Weight Loss' | 'Supplements' | 'General Health';
  claim: string;
  description: string;
  popularSource: string;
  typicalVerdict: VerdictType;
  biasRating: 'High' | 'Medium' | 'Low';
}

export interface VerificationReport {
  claim: string;
  category: string;
  verdict: VerdictType;                               // 1. Verdict
  evidenceSummary: string;                            // 2. Evidence Summary
  whyMisleading: string;                              // 3. Why This Claim May Be Misleading
  whatEvidenceSays: string;                           // 4. What Reliable Evidence Says
  safeRecommendation: string;                         // 5. Safe Recommendation
  confidenceLevel: number;                            // 6. Confidence Level (0 to 100)
  
  // Advanced Features
  riskLevel: 'Low Risk' | 'Potentially Misleading' | 'High Risk Misinformation'; // Feature 1: Risk Level
  confidenceRating: 'High' | 'Moderate';                                       // Feature 2: Confidence Meter Rating
  confidenceExplanation: string;                                                // Feature 2: Explanation of confidence
  redFlags: string[];                                                           // Feature 3: Red Flags list
  healthLiteracyScore: number;                                                  // Feature 4: Health Literacy Score (1-10)
  healthLiteracyTips: string[];                                                 // Feature 4: Health Literacy checklist/tips
  whyPopular?: string;                                                          // Educational section explaining why this claim became popular
  
  // Custom Evidence Grading Features
  evidenceLevel?: 'Level 1: Strong (systematic reviews / guidelines)' | 'Level 2: Moderate (multiple studies)' | 'Level 3: Limited (few studies)' | 'Level 4: Insufficient evidence';
  confidenceLevelDiscrete?: 'High' | 'Medium' | 'Low';
  scientificConsensus?: 'Strong' | 'Mixed' | 'Unknown';
}

