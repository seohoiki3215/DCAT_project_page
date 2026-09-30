// Benchmark-level scores from DCAT.pdf, Table 2. Preserve the reported precision.
const results = {
  audio: {
    labels: ['MMAU', 'AIR-Bench', 'MuCho-Music', 'Clotho-AQA', 'VocalSound'],
    vicuna: [
      ['Original',48.90,43.17,26.96,61.23,48.98,45.85],
      ['TA',53.20,49.09,50.04,81.00,44.81,55.63],
      ['TIES',51.00,48.68,38.42,74.97,50.93,52.80],
      ['ISO',53.40,49.79,52.82,78.57,44.31,55.78],
      ['TSV',52.70,50.51,50.80,81.21,47.54,56.55],
      ['WUDI',53.70,49.23,49.45,80.72,46.98,56.02],
      ['OptMerge',53.10,50.50,50.21,80.24,49.07,56.62],
      ['DCAT',56.20,52.44,54.17,82.96,51.25,59.40]
    ],
    llama: [
      ['Original',55.50,42.86,52.57,55.48,31.02,47.49],
      ['TA* · λ=1.0',52.60,39.68,49.62,57.07,27.57,45.31],
      ['TIES · λ=1.0',56.00,42.43,54.93,57.56,30.49,48.28],
      ['ISO · λ=1.0',57.60,40.63,55.94,58.67,29.35,48.44],
      ['TSV* · λ=1.0',52.60,39.68,49.62,57.07,27.57,45.31],
      ['WUDI · λ=1.0',53.60,39.56,49.96,57.28,26.90,45.46],
      ['OptMerge* · λ=1.0',52.60,39.68,49.62,57.07,27.57,45.31],
      ['TA* · λ=0.2',57.20,42.81,54.51,57.56,31.22,48.66],
      ['TIES · λ=0.2',57.60,43.37,54.59,56.66,30.58,48.56],
      ['ISO · λ=0.2',56.10,43.50,53.24,57.49,30.19,48.10],
      ['TSV* · λ=0.2',57.20,42.81,54.51,57.56,31.22,48.66],
      ['WUDI · λ=0.2',55.70,42.88,52.74,57.49,29.91,47.74],
      ['OptMerge* · λ=0.2',57.20,42.81,54.51,57.56,31.22,48.66],
      ['DCAT',59.16,44.93,58.30,61.56,31.94,51.18]
    ]
  },
  video: {
    labels: ['Video-MME','TempCompass','MVBench','MLVU'],
    vicuna: [
      ['Original',35.00,55.46,38.48,32.59,40.38],
      ['TA',37.11,55.38,43.68,44.84,45.25],
      ['TIES',28.30,54.62,32.78,33.15,37.21],
      ['ISO',38.44,55.38,43.00,45.31,45.53],
      ['TSV',39.04,57.24,44.58,45.18,46.51],
      ['WUDI',36.56,54.93,43.30,44.38,44.79],
      ['OptMerge',38.30,56.47,44.83,43.29,45.72],
      ['DCAT',41.53,59.71,47.65,46.34,48.81]
    ],
    llama: [
      ['Original',38.19,51.28,41.00,31.79,40.57],
      ['TA · λ=1.0',38.89,53.11,43.88,45.22,45.28],
      ['TIES · λ=1.0',41.48,47.22,46.88,47.12,45.68],
      ['ISO · λ=1.0',40.89,28.85,46.03,45.28,40.26],
      ['TSV · λ=1.0',41.85,56.77,47.00,48.08,48.43],
      ['WUDI · λ=1.0',40.15,10.53,45.35,47.51,35.89],
      ['OptMerge · λ=1.0',42.85,3.59,47.23,49.24,35.73],
      ['TA · λ=0.2',42.93,43.15,43.18,40.94,42.55],
      ['TIES · λ=0.2',39.89,44.92,45.43,38.58,42.21],
      ['ISO · λ=0.2',39.52,57.19,44.80,44.48,46.50],
      ['TSV · λ=0.2',41.44,53.36,45.65,40.42,45.22],
      ['WUDI · λ=0.2',42.30,58.44,44.55,43.81,47.28],
      ['OptMerge · λ=0.2',40.59,57.30,46.48,41.83,46.55],
      ['DCAT',44.44,59.88,51.18,50.15,51.41]
    ]
  }
};
let modality = 'audio';
const backbone = document.querySelector('#backbone');
function renderResults() {
  const data = results[modality];
  const rows = data[backbone.value];
  const original = rows[0];
  const dcat = rows[rows.length - 1];
  const recipient = modality === 'audio' ? 'Audio' : 'Video';
  document.querySelector('#chart-title').textContent = `Vision → ${recipient}`;
  document.querySelector('#chart-subtitle').textContent = `${backbone.selectedOptions[0].text}-based models · Higher is better`;
  document.querySelector('#benchmark-chart').innerHTML = data.labels.map((name, i) => {
    const before = original[i+1], after = dcat[i+1];
    const gain = ((after / before - 1) * 100).toFixed(2);
    return `<div class="benchmark-row"><span class="benchmark-name">${name}</span><div class="bar-pair" role="img" aria-label="${name}: Original ${before.toFixed(2)}, DCAT ${after.toFixed(2)}, relative gain ${gain} percent"><div class="bar" style="--value:${before}"><span>${before.toFixed(2)}</span></div><div class="bar dcat" style="--value:${after}"><span>${after.toFixed(2)}</span></div></div><span class="gain">+${gain}%</span></div>`;
  }).join('');
  document.querySelector('#comparison-table').innerHTML = `<caption class="sr-only">${backbone.selectedOptions[0].text} ${recipient} results from Table 2</caption><thead><tr><th scope="col">Method</th>${[...data.labels,'Average'].map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr class="${row[0]==='DCAT'?'highlight':''}"><th scope="row">${row[0]}</th>${row.slice(1).map(x=>`<td>${x.toFixed(2)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  document.querySelector('#table-note').textContent = 'Average is reproduced as reported in Table 2. ' + (backbone.value==='llama' ? 'Both reported merging coefficients are included. ' + (modality==='audio' ? '* These methods reduce to Task Arithmetic because the audio model does not tune its language backbone.' : '') : 'MMAU, AIR-Bench, Video-MME, and TempCompass use their overall scores where applicable.');
}
document.querySelectorAll('[data-modality]').forEach(button => button.addEventListener('click', () => {
  modality = button.dataset.modality;
  document.querySelectorAll('[data-modality]').forEach(b => b.setAttribute('aria-pressed', String(b===button)));
  renderResults();
}));
backbone.addEventListener('change',renderResults);
renderResults();
const dialog = document.querySelector('#figure-dialog');
document.querySelectorAll('[data-figure]').forEach(button => button.addEventListener('click',()=>{
  document.querySelector('#enlarged-figure').src = button.dataset.figure;
  document.querySelector('#enlarged-figure').alt = button.querySelector('img').alt;
  document.querySelector('#figure-caption').textContent = button.dataset.caption;
  document.querySelector('#figure-download').href = button.dataset.figure;
  dialog.showModal();
}));
document.querySelector('#close-figure').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
document.querySelector('#copy-citation').addEventListener('click',async()=>{
  const status=document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#bibtex').textContent);
    status.textContent='Citation copied.';
    setTimeout(()=>{status.textContent='';},3000);
  } catch {
    const range=document.createRange();range.selectNodeContents(document.querySelector('#bibtex'));
    const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
    status.textContent='Citation selected. Press Ctrl+C or ⌘C to copy.';
  }
});
