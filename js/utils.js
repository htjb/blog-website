export function loadHTML(elementId, filePath) {
  fetch(filePath)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(elementId).innerHTML = html;
    });
}

export async function loadMd(elementId, filePath) {
  let r = fetch(filePath).then(r => r.text())
  return r
}

export async function cleanHtml(id) {
  document.getElementById(id).innerHTML = "";
}
