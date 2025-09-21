export function loadHTML(elementId, filePath) {
  fetch(filePath)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(elementId).innerHTML = html;
    });
}

export function loadMd(elementId, filePath) {
  fetch(filePath)
  .then(r => r.text())
  .then(md => {
    document.getElementById(elementId).innerHTML = marked.parse(md, {breaks: true});
    renderMathInElement(document.getElementById(elementId)); // KaTeX
  });
}