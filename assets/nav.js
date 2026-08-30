/* ================================================================
   SITE NAVIGATION — top bar with hover/click/focus dropdowns,
   breadcrumb, and a linear Prev/Next stepper.
   Single source of truth: the PAGES array below drives the
   dropdown contents, the breadcrumb text, and the stepper order.
   Built fresh for the multi-page reorg (2026) — replaces the old
   single-scroll sidebar (#quickNav) + in-page scrollspy.
   ================================================================ */

/* ---- Dark/light theme — applied here so every page gets it, not
   just index.html. Runs immediately (not on DOMContentLoaded) so the
   stored preference takes effect as early as possible; the toggle
   button itself is built into the topbar in buildThemeToggle(). ---- */
function currentTheme(){
  var stored;
  try { stored = localStorage.getItem('theme'); } catch(e){ stored = null; }
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('.theme-toggle-label').forEach(function(el){
    el.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  });
  document.querySelectorAll('.theme-toggle-icon').forEach(function(el){
    el.textContent = theme === 'dark' ? '☀' : '☽';
  });
  document.querySelectorAll('.theme-toggle').forEach(function(el){
    el.setAttribute('aria-pressed', String(theme === 'dark'));
  });
}
applyTheme(currentTheme());

function buildThemeToggle(container){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'theme-toggle topbar-theme-toggle';
  btn.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
  const icon = document.createElement('span');
  icon.className = 'theme-toggle-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = currentTheme() === 'dark' ? '☀' : '☽';
  const label = document.createElement('span');
  label.className = 'theme-toggle-label';
  label.textContent = currentTheme() === 'dark' ? 'Light mode' : 'Dark mode';
  btn.appendChild(icon);
  btn.appendChild(label);
  btn.addEventListener('click', function(){
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch(e){}
    applyTheme(next);
  });
  container.appendChild(btn);
}

const TOPICS = [
  { key:'topic1',  label:'Topic 1 &middot; Philosophical Reasoning' },
  { key:'topic2',  label:'Topic 2 &middot; Research Design' },
  { key:'topic3',  label:'Topic 3 &middot; Quantitative Methods' },
  { key:'topic4',  label:'Topic 4 &middot; Statistical Modeling' },
  { key:'topic5',  label:'Topic 5 &middot; Qualitative Methods' },
  { key:'topic6',  label:'Topic 6 &middot; Critical Writing Skills' },
  { key:'parking', label:'Parking Lot' },
];

/* Every numbered nav entry, in reading order. Several entries share
   a `path` (e.g. 2.2/2.4/2.5/2.6 all live on one combined page) —
   the stepper below automatically collapses those into one step. */
const PAGES = [
  // ---- Topic 1 : Philosophical Reasoning ----
  // 1.1 and 1.2 were swapped: "how do we know what we know" (ways of
  // knowing, then paradigms) now comes first, since it motivates why
  // inductive/deductive reasoning (formerly 1.1) matters at all.
  { id:'1-1', num:'1.1', title:'Philosophy of Science &amp; Paradigms', path:'1-philosophical-reasoning/1-1-philosophy-of-science-paradigms.html', topic:'topic1' },
  { id:'1-2', num:'1.2', title:'The Logic of Scientific Inference — Inductive vs. Deductive Reasoning', path:'1-philosophical-reasoning/1-2-logic-of-scientific-inference.html', topic:'topic1' },
  { id:'1-3', num:'1.3', title:'Theory Construction', path:'1-philosophical-reasoning/1-3-theory-construction.html', topic:'topic1' },
  { id:'1-4', num:'1.4', title:'Research Ethics &amp; Human Subjects Protection', path:'1-philosophical-reasoning/1-4-research-ethics-human-subjects.html', topic:'topic1' },
  { id:'1-5', num:'1.5', title:'Community Ethics — Advisory Boards &amp; the APHA Code', path:'1-philosophical-reasoning/1-5-community-ethics-advisory-boards.html', topic:'topic1' },
  { id:'1-6', num:'1.6', title:'Applied Ethics Case Discussion', path:'1-philosophical-reasoning/1-6-applied-ethics-case-discussion.html', topic:'topic1' },

  // ---- Topic 2 : Research Design ----
  // Bias & Threats to Validity (2.3) was split out of Types of
  // Research Designs (2.2) into its own page, pushing Literature
  // Review and Building Your Research Strategy each up by one.
  { id:'2-1', num:'2.1', title:'The Research Process — Big-Picture Roadmap', path:'2-research-design/2-1-research-process-roadmap.html', topic:'topic2' },
  { id:'2-2', num:'2.2', title:'Types of Research Designs', path:'2-research-design/2-2-types-of-research-designs.html', topic:'topic2' },
  { id:'2-3', num:'2.3', title:'Bias & Threats to Validity', path:'2-research-design/2-3-bias-and-threats-to-validity.html', topic:'topic2' },
  { id:'2-4', num:'2.4', title:'Conducting a Literature Review', path:'2-research-design/2-4-literature-review.html', topic:'topic2' },
  { id:'2-5', num:'2.5', title:'Building Your Research Strategy', path:'2-research-design/2-5-building-your-research-strategy.html', topic:'topic2' },

  // ---- Topic 3 : Quantitative Methods ----
  { id:'3-1', num:'3.1', title:'Data Collection', path:'3-quantitative-methods/3-1-data-collection.html', topic:'topic3' },
  { id:'3-1-1', num:'3.1.1', title:'Why Survey Design Matters', path:'3-quantitative-methods/3-1-1-why-survey-design-matters.html', topic:'topic3', indent:true },
  { id:'3-1-2', num:'3.1.2', title:'Question Construction — Closed-Ended Formats', path:'3-quantitative-methods/3-1-2-question-construction-closed-ended.html', topic:'topic3', indent:true },
  { id:'3-1-3', num:'3.1.3', title:'Open-Ended Questions', path:'3-quantitative-methods/3-1-3-open-ended-questions.html', topic:'topic3', indent:true },
  { id:'3-1-4', num:'3.1.4', title:'Scale Design, Composite Scores, Reliability &amp; Validity', path:'3-quantitative-methods/3-1-4-scale-design-reliability-validity.html', topic:'topic3', indent:true },
  { id:'3-1-5', num:'3.1.5', title:'Sampling — Probability vs. Non-Probability, Sample Size, Non-Response Bias', path:'3-quantitative-methods/3-1-5-sampling.html', topic:'topic3', indent:true },
  { id:'3-1-6', num:'3.1.6', title:'Variable Types &amp; Levels of Measurement', path:'3-quantitative-methods/3-1-6-variable-types-levels-of-measurement.html', topic:'topic3', indent:true },
  { id:'3-2', num:'3.2', title:'Statistical Tests &amp; Analysis', path:'3-quantitative-methods/3-2-statistical-tests-and-analysis.html', topic:'topic3' },
  { id:'3-2-1', num:'3.2.1', title:'Foundational Concepts — Effect Size, Confidence Intervals, P-values', path:'3-quantitative-methods/3-2-1-foundational-concepts.html', topic:'topic3', indent:true },
  { id:'3-2-2', num:'3.2.2', title:'The Statistical Framework', path:'3-quantitative-methods/3-2-2-statistical-framework.html', topic:'topic3', indent:true },
  { id:'3-2-3', num:'3.2.3', title:'The Decision Flow', path:'3-quantitative-methods/3-2-3-decision-flow.html', topic:'topic3', indent:true },
  { id:'3-2-4', num:'3.2.4', title:'Test Selector Tool', path:'3-quantitative-methods/3-2-4-test-selector-tool.html', topic:'topic3', indent:true },
  { id:'3-2-5', num:'3.2.5', title:'Tools &amp; Software', path:'3-quantitative-methods/3-2-5-tools-and-software.html', topic:'topic3', indent:true },
  { id:'3-2-6', num:'3.2.6', title:'Working With Real Data — Codebook Reading', path:'3-quantitative-methods/3-2-6-working-with-real-data-codebook.html', topic:'topic3', indent:true },
  { id:'3-2-7', num:'3.2.7', title:'Data Cleaning &amp; Preparation', path:'3-quantitative-methods/3-2-7-data-cleaning-and-preparation.html', topic:'topic3', indent:true },
  { id:'3-2-8', num:'3.2.8', title:'Exploratory Data Analysis', path:'3-quantitative-methods/3-2-8-exploratory-data-analysis.html', topic:'topic3', indent:true },
  { id:'3-2-9', num:'3.2.9', title:'Statistical Analysis — Six Families', path:'3-quantitative-methods/3-2-9-statistical-analysis-six-families.html', topic:'topic3', indent:true },
  { id:'3-3', num:'3.3', title:'Explaining &amp; Writing Quantitative Results', path:'3-quantitative-methods/3-3-explaining-writing-quantitative-results.html', topic:'topic3' },
  { id:'3-3-1', num:'3.3.1', title:'Interpreting Results', path:'3-quantitative-methods/3-3-1-interpreting-results.html', topic:'topic3', indent:true },
  { id:'3-3-2', num:'3.3.2', title:'Data Storytelling &amp; Visualization', path:'3-quantitative-methods/3-3-2-data-storytelling-and-visualization.html', topic:'topic3', indent:true },
  { id:'3-3-3', num:'3.3.3', title:'Reporting Statistics in Manuscript Style', path:'3-quantitative-methods/3-3-3-reporting-statistics-manuscript-style.html', topic:'topic3', indent:true },

  // ---- Topic 4 : Statistical Modeling ----
  // Formerly the unnumbered "Annexure 1" reference deck; promoted to
  // a real numbered topic to match the homepage sitemap (A1.N → 4.N).
  { id:'4-1', num:'4.1', title:'Describe', path:'4-statistical-modeling/4-1-describe.html', topic:'topic4' },
  { id:'4-2', num:'4.2', title:'Compare', path:'4-statistical-modeling/4-2-compare.html', topic:'topic4' },
  { id:'4-3', num:'4.3', title:'Relate', path:'4-statistical-modeling/4-3-relate.html', topic:'topic4' },
  { id:'4-4', num:'4.4', title:'Predict', path:'4-statistical-modeling/4-4-predict.html', topic:'topic4' },
  { id:'4-5', num:'4.5', title:'Explain', path:'4-statistical-modeling/4-5-explain.html', topic:'topic4' },
  { id:'4-6', num:'4.6', title:'Measure', path:'4-statistical-modeling/4-6-measure.html', topic:'topic4' },
  { id:'4-7', num:'4.7', title:'Discover', path:'4-statistical-modeling/4-7-discover.html', topic:'topic4' },
  { id:'4-8', num:'4.8', title:'Longitudinal', path:'4-statistical-modeling/4-8-longitudinal.html', topic:'topic4' },
  { id:'4-9', num:'4.9', title:'Causal Inference', path:'4-statistical-modeling/4-9-causal-inference.html', topic:'topic4' },
  { id:'4-10', num:'4.10', title:'Machine Learning', path:'4-statistical-modeling/4-10-machine-learning.html', topic:'topic4' },
  { id:'4-11', num:'4.11', title:'Bayesian', path:'4-statistical-modeling/4-11-bayesian.html', topic:'topic4' },
  { id:'4-12', num:'4.12', title:'Diagnostics', path:'4-statistical-modeling/4-12-diagnostics.html', topic:'topic4' },
  { id:'4-13', num:'4.13', title:'Missing Data', path:'4-statistical-modeling/4-13-missing-data.html', topic:'topic4' },
  { id:'4-14', num:'4.14', title:'Multiple Testing', path:'4-statistical-modeling/4-14-multiple-testing.html', topic:'topic4' },

  // ---- Topic 5 : Qualitative Methods ----
  // Sampling, Recruitment & Saturation (5.1.1) is new — added to give
  // sample-size justification and recruitment strategy a proper home
  // ahead of the specific collection methods.
  { id:'5-1', num:'5.1', title:'Data Collection', path:'5-qualitative-methods/5-1-data-collection.html', topic:'topic5' },
  { id:'5-1-1', num:'5.1.1', title:'Sampling, Recruitment &amp; Saturation', path:'5-qualitative-methods/5-1-1-sampling-recruitment-saturation.html', topic:'topic5', indent:true },
  { id:'5-1-2', num:'5.1.2', title:'Focus Groups', path:'5-qualitative-methods/5-1-2-focus-groups.html', topic:'topic5', indent:true },
  { id:'5-1-3', num:'5.1.3', title:'Interviews', path:'5-qualitative-methods/5-1-3-interviews.html', topic:'topic5', indent:true },
  { id:'5-1-4', num:'5.1.4', title:'Moderator Guides &amp; Interview Scripts', path:'5-qualitative-methods/5-1-4-moderator-guides-interview-scripts.html', topic:'topic5', indent:true },
  { id:'5-1-5', num:'5.1.5', title:'Mixed-Methods Data Collection', path:'5-qualitative-methods/5-1-5-mixed-methods-data-collection.html', topic:'topic5', indent:true },
  { id:'5-2', num:'5.2', title:'Qualitative Data Analysis', path:'5-qualitative-methods/5-2-qualitative-data-analysis.html', topic:'topic5' },
  { id:'5-2-1', num:'5.2.1', title:'Paradigm, Methodology &amp; Immersing in the Data', path:'5-qualitative-methods/5-2-1-preparing-immersing-in-data.html', topic:'topic5', indent:true },
  { id:'5-2-2', num:'5.2.2', title:'Coding — Open, Axial, Thematic', path:'5-qualitative-methods/5-2-2-coding-open-axial-thematic.html', topic:'topic5', indent:true },
  { id:'5-2-3', num:'5.2.3', title:'Codebook Development &amp; Inter-Rater Reliability', path:'5-qualitative-methods/5-2-3-codebook-development-inter-rater-reliability.html', topic:'topic5', indent:true },
  { id:'5-2-4', num:'5.2.4', title:'From Codes to Themes', path:'5-qualitative-methods/5-2-4-from-codes-to-themes.html', topic:'topic5', indent:true },
  { id:'5-2-5', num:'5.2.5', title:'Rigor &amp; Trustworthiness', path:'5-qualitative-methods/5-2-5-rigor-and-trustworthiness.html', topic:'topic5', indent:true },
  { id:'5-3', num:'5.3', title:'Explaining &amp; Writing Qualitative Results', path:'5-qualitative-methods/5-3-explaining-writing-qualitative-results.html', topic:'topic5' },
  { id:'5-3-1', num:'5.3.1', title:'Structuring Findings — Themes &amp; Exemplar Quotes', path:'5-qualitative-methods/5-3-1-structuring-findings-themes-quotes.html', topic:'topic5', indent:true },
  { id:'5-3-2', num:'5.3.2', title:'Reporting Standards (COREQ)', path:'5-qualitative-methods/5-3-2-reporting-standards-coreq.html', topic:'topic5', indent:true },

  // ---- Topic 6 : Critical Writing Skills ----
  { id:'6-1', num:'6.1', title:'Foundations of Scientific Writing', path:'6-critical-writing/6-1-foundations-of-scientific-writing.html', topic:'topic6' },
  { id:'6-2', num:'6.2', title:'Manuscript Structure — IMRaD', path:'6-critical-writing/6-2-manuscript-structure-imrad.html', topic:'topic6' },
  { id:'6-3', num:'6.3', title:'Synthesizing &amp; Citing Literature', path:'6-critical-writing/6-3-synthesizing-and-citing-literature.html', topic:'topic6' },
  { id:'6-4', num:'6.4', title:'Critical Reading &amp; Constructing an Argument', path:'6-critical-writing/6-4-critical-reading-constructing-argument.html', topic:'topic6' },
  { id:'6-5', num:'6.5', title:'Revision, Peer Review &amp; Responding to Reviewers', path:'6-critical-writing/6-5-revision-peer-review-responding-to-reviewers.html', topic:'topic6' },

  // ---- Parking Lot ----
  { id:'p-1', num:'P.1', title:'Community-Based Participatory Research', path:'parking-lot/p-1-community-based-participatory-research.html', topic:'parking' },
  { id:'p-2', num:'P.2', title:'Program Evaluation', path:'parking-lot/p-2-program-evaluation.html', topic:'parking' },
  { id:'p-3', num:'P.3', title:'Grant Writing', path:'parking-lot/p-3-grant-writing.html', topic:'parking' },
  { id:'p-4', num:'P.4', title:'Potential Projects', path:'parking-lot/p-4-potential-projects.html', topic:'parking' },
];

/* Stepper order: PAGES in reading order, collapsing consecutive
   numbered entries that share a physical file (e.g. 2.2/2.4/2.5/2.6)
   into a single step — you land on that file once, not four times. */
const STEP_ORDER = (() => {
  const seen = new Set();
  const order = [];
  PAGES.forEach(p => {
    if (seen.has(p.path)) return;
    seen.add(p.path);
    order.push(p);
  });
  return order;
})();

function root(){ return document.body.dataset.root || ''; }
function href(page){ return root() + page.path + (page.anchor ? '#' + page.anchor : ''); }

/* ---- Top nav bar + dropdowns ---- */
function buildTopbar(){
  const mount = document.getElementById('topbarMount');
  if (!mount) return;

  const bar = document.createElement('nav');
  bar.className = 'site-topbar';
  bar.setAttribute('aria-label', 'Site navigation');

  const homeLink = document.createElement('a');
  homeLink.className = 'topbar-home';
  homeLink.href = root() + 'index.html';
  homeLink.textContent = 'Research Methods in Public Health';
  bar.appendChild(homeLink);

  const list = document.createElement('div');
  list.className = 'topbar-groups';

  TOPICS.forEach(topic => {
    const entries = PAGES.filter(p => p.topic === topic.key);
    const group = document.createElement('div');
    group.className = 'topbar-group';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'topbar-btn';
    btn.innerHTML = topic.label;
    btn.setAttribute('aria-expanded', 'false');

    const dropdown = document.createElement('ul');
    dropdown.className = 'topbar-dropdown';
    entries.forEach(p => {
      const li = document.createElement('li');
      if (p.indent) li.className = 'indent';
      const a = document.createElement('a');
      a.href = href(p);
      a.innerHTML = `<span class="nav-num">${p.num}</span> ${p.title}`;
      if (isCurrentPath(p.path)) a.classList.add('current');
      li.appendChild(a);
      dropdown.appendChild(li);
    });

    group.appendChild(btn);
    group.appendChild(dropdown);
    list.appendChild(group);

    // `sticky` = pinned open by an explicit click/tap (survives the
    // mouse leaving); plain hover/focus opens without pinning, so a
    // click right after the hover-open doesn't immediately toggle
    // it back shut.
    let closeTimer = null;
    let sticky = false;
    function open(){
      clearTimeout(closeTimer);
      document.querySelectorAll('.topbar-group.open').forEach(g => { if (g !== group) closeGroup(g); });
      group.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function scheduleClose(){
      if (sticky) return;
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => closeGroup(group), 300);
    }
    function closeGroup(g){
      g.classList.remove('open');
      g.querySelector('.topbar-btn').setAttribute('aria-expanded', 'false');
      if (g === group) sticky = false;
    }

    group.addEventListener('mouseenter', open);
    group.addEventListener('mouseleave', scheduleClose);
    group.addEventListener('focusin', open);
    group.addEventListener('focusout', (e) => {
      if (!group.contains(e.relatedTarget)) scheduleClose();
    });
    btn.addEventListener('click', () => {
      if (sticky){
        closeGroup(group);
      } else {
        open();
        sticky = true;
      }
    });
  });

  bar.appendChild(list);
  buildThemeToggle(bar);
  mount.appendChild(bar);

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.topbar-group')) {
      document.querySelectorAll('.topbar-group.open').forEach(g => {
        g.classList.remove('open');
        g.querySelector('.topbar-btn').setAttribute('aria-expanded', 'false');
      });
    }
  });
}

function isCurrentPath(path){
  return location.pathname.endsWith('/' + path) || location.pathname.endsWith(path);
}

/* ---- Breadcrumb ---- */
function buildBreadcrumb(){
  const mount = document.getElementById('breadcrumbMount');
  if (!mount) return;
  const pageId = document.body.dataset.pageId;
  const page = PAGES.find(p => p.id === pageId);
  const topic = page ? TOPICS.find(t => t.key === page.topic) : null;
  const bc = document.createElement('div');
  bc.className = 'breadcrumb';
  if (page && topic){
    bc.innerHTML = `<a href="${root()}index.html">Home</a> <span class="sep">&rsaquo;</span> ${topic.label} <span class="sep">&rsaquo;</span> <strong>${page.num} ${page.title}</strong>`;
  } else {
    bc.innerHTML = `<a href="${root()}index.html">Home</a>`;
  }
  mount.appendChild(bc);
}

/* ---- Prev/Next stepper ---- */
function buildStepper(){
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!prevBtn || !nextBtn) return;
  const pageId = document.body.dataset.pageId;
  const page = PAGES.find(p => p.id === pageId);
  const idx = page ? STEP_ORDER.findIndex(p => p.path === page.path) : -1;

  if (idx <= 0) prevBtn.disabled = true;
  else prevBtn.addEventListener('click', () => { location.href = href(STEP_ORDER[idx - 1]); });

  if (idx === -1 || idx >= STEP_ORDER.length - 1) nextBtn.disabled = true;
  else nextBtn.addEventListener('click', () => { location.href = href(STEP_ORDER[idx + 1]); });
}

document.addEventListener('DOMContentLoaded', () => {
  buildTopbar();
  buildBreadcrumb();
  buildStepper();
});
