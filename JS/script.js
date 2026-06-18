

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initFadeUpAnimations();
  initGlossarySearch();
});


function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = documentHeight > 0
      ? (window.scrollY / documentHeight) * 100
      : 0;
    progressBar.style.width = `${scrolledPercentage}%`;
  }, { passive: true });
}


function initFadeUpAnimations() {
  const fadeElements = document.querySelectorAll('.fade-up');
  if (!fadeElements.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeElements.forEach((element) => revealObserver.observe(element));
}


function initGlossarySearch() {
  const searchInput = document.getElementById('glossaryInput');
  const glossaryRows = document.querySelectorAll('#glossaryBody tr');
  const resultsCounter = document.getElementById('glossary-count');

  if (!searchInput || !resultsCounter || !glossaryRows.length) return;

  function filterGlossaryRows() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    glossaryRows.forEach((row) => {
      const rowText = row.textContent.toLowerCase();
      const matchesSearch = !searchTerm || rowText.includes(searchTerm);
      row.style.display = matchesSearch ? '' : 'none';
      if (matchesSearch) visibleCount++;
    });

    resultsCounter.textContent = searchTerm
      ? `${visibleCount} resultado${visibleCount !== 1 ? 's' : ''} encontrado${visibleCount !== 1 ? 's' : ''} / ${visibleCount} result${visibleCount !== 1 ? 's' : ''} found`
      : `${glossaryRows.length} términos en total / ${glossaryRows.length} terms total`;
  }

  searchInput.addEventListener('input', filterGlossaryRows);
  filterGlossaryRows();
}
