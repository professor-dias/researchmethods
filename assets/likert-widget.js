/* ================================================================
   SHARED LIKERT/COMPOSITE COLOR UTILITY — extracted verbatim.
   Used by Question Construction (3.1.2) and Scale Design (3.1.4).
   ================================================================ */
const SEVERITY_LOW = [63,145,90], SEVERITY_HIGH = [170,40,40];
const NEUTRAL_LOW = [179,133,42], NEUTRAL_HIGH = [123,45,38];

function likertColor(mode, t){
  const lo = mode === 'severity' ? SEVERITY_LOW : NEUTRAL_LOW;
  const hi = mode === 'severity' ? SEVERITY_HIGH : NEUTRAL_HIGH;
  return [0,1,2].map(i => Math.round(lo[i] + (hi[i] - lo[i]) * t));
}

function initLikertWidgets(){
  document.querySelectorAll('.likert-widget').forEach(widget => {
    const slider = widget.querySelector('.likert-slider');
    const readout = widget.querySelector('.likert-readout');
    const labels = widget.dataset.labels.split('|');
    const mode = widget.dataset.mode;
    function update(){
      const val = parseInt(slider.value, 10);
      const t = (val - 1) / 4;
      const c = likertColor(mode, t);
      const solid = `rgb(${c[0]},${c[1]},${c[2]})`;
      slider.style.setProperty('--thumb-color', solid);
      readout.textContent = labels[val - 1];
      readout.style.background = `rgba(${c[0]},${c[1]},${c[2]},0.15)`;
      readout.style.color = solid;
    }
    slider.addEventListener('input', update);
    update();
  });
}
initLikertWidgets();
