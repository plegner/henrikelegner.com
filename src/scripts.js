const tabs = {};
let active;

let current = document.querySelector('.tab.active')?.id;
function load(href) {
  if (href === current) return;
  current = href;
  location.hash = href;
  document.querySelector('.tabs .active')?.classList.remove('active');
  tabs[href]?.classList.add('active');
  document.querySelector('.tab.active')?.classList.remove('active');
  document.querySelector('.tab#' + href)?.classList.add('active');
}

for (const tab of document.querySelector('.tabs')?.children) {
  const href = tab.href.split('#')[1];
  tabs[href] = tab;
  tab.addEventListener('click', e => {
    load(href);
    setTimeout(() => window.scrollTo(0, 0));
  });
}

const getHash = () => location.hash.slice(1) || current;
load(getHash());
window.addEventListener('popstate', () => load(getHash()));
if (window.history) window.history.scrollRestoration = 'manual';
