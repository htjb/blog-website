import { loadMd } from "./utils.js";


let textContents = document.getElementById("text-content")
console.log(textContents)
let welcomeDiv = document.createElement("div");
welcomeDiv.setAttribute("id", "welcome-div")
textContents.appendChild(welcomeDiv)

loadMd('welcome-div', 'includes/welcome.md')    

let outputDiv = document.createElement("details");
outputDiv.setAttribute("id", "latest-post");
loadMd("latest-post", "posts/21cmforegrounds.md")
textContents.appendChild(outputDiv);

const h1 = outputDiv.querySelector("h1");
if (h1) {
    const summary = document.createElement("summary");
    summary.appendChild(h1);    // move the existing h1 inside the summary
    outputDiv.insertBefore(summary, outputDiv.firstChild);
}