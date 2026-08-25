/* ================================================================
   SHARED STATS UTILITIES — extracted verbatim from the original
   single-page build. Used by several Topic 4 (Statistical Modeling)
   demos (Compare, Bayesian).
   ================================================================ */
const RANKS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const SUITS = ['♠','♥','♦','♣'];
const RED_SUITS = ['♥','♦'];
const QUEEN_INDEX = RANKS.indexOf('Q');
const BASELINE = 50;
const VISUAL_SD = 10; // illustrative spread for the p-value bell curve

function calcStats(rankIndex){
  const lowerRanks  = rankIndex;
  const higherRanks = RANKS.length - 1 - rankIndex;
  const lowerCards  = lowerRanks * 4;
  const higherCards = higherRanks * 4;
  const total       = lowerCards + higherCards;
  const winProb     = total > 0 ? lowerCards / total : 0;
  return { rank: RANKS[rankIndex], rankIndex, lowerRanks, higherRanks, lowerCards, higherCards, total, winProb };
}
const ALL_STATS = RANKS.map((_, i) => calcStats(i));

function renderBarChart(containerId, selectedIndex){
  const container = document.getElementById(containerId);
  container.innerHTML = ALL_STATS.map(s => {
    const pct = (s.winProb * 100).toFixed(1);
    const selected = s.rankIndex === selectedIndex ? 'selected' : '';
    return `
      <div class="bar-row ${selected}">
        <div class="bar-label">${s.rank}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        <div class="bar-pct">${pct}%</div>
      </div>`;
  }).join('');
}

function erf(x){
  const sign = x < 0 ? -1 : 1; x = Math.abs(x);
  const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911;
  const t = 1 / (1 + p*x);
  const y = 1 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1) * t * Math.exp(-x*x);
  return sign * y;
}
function normalCDF(x, mean, sd){ return 0.5 * (1 + erf((x - mean) / (sd * Math.sqrt(2)))); }
function normalPDF(x, mean, sd){ return (1 / (sd * Math.sqrt(2*Math.PI))) * Math.exp(-0.5 * Math.pow((x-mean)/sd, 2)); }
