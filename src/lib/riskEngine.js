export function calculateRiskScore(factors) {
  // Pure function for determinism.
  // Currently, it sums up a weighted risk score based on percentages.
  // This is a mockup to show where a real deterministic engine would plug in.
  let totalRisk = 0;
  let weight = 0;
  
  for (const factor of factors) {
    totalRisk += factor.pct * factor.weight;
    weight += factor.weight;
  }
  
  const score = Math.round(totalRisk / weight);
  // Ensure it caps at 100
  return Math.min(score, 100);
}
