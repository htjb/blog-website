import { loadMd } from "./utils.js";

async function parsePost(elementId, postName){
    let outputDiv = document.createElement("div");
    outputDiv.setAttribute("id", elementId);
    outputDiv.setAttribute("class", "card");
    textContents.appendChild(outputDiv);
    let post = await loadMd(elementId, postName)
    let metaInfoText = post.split('\n').slice(0, 4)
    let metaInfo = {}
    for (let meta of metaInfoText){
        if (meta.split(':').length == 2){
            metaInfo[meta.split(':')[0]] = meta.split(':')[1]
        }
    }

    let postHTML = marked.parse(
        post.split('\n').slice(5, post.length).join('\n'), 
        {breaks: true})

    let postHTMLList = postHTML.split('\n')
    let title = postHTMLList.shift()
    title = '<h1>' + metaInfo['date'] + ': ' +  title.slice(4, title.length)
    title = '<div class="card-header">' + title + '\n' + 
        //metaInfo['tags'].split(',').map(tag => '<a href="" class="' + tag + '">' + tag.trim() + 
        //'</a>').join(',') +
        '</div>'
    postHTML = title + '<div class="card-body">\n' + postHTMLList.join('\n') + '\n</div>'
    document.getElementById(elementId).innerHTML = postHTML
    renderMathInElement(document.getElementById(elementId)); // KaTeX
}

let textContents = document.getElementById("text-content")
console.log(textContents)
let welcomeDiv = document.createElement("div");
welcomeDiv.setAttribute("id", "welcome-div")
textContents.appendChild(welcomeDiv)

let welcome = await loadMd('welcome-div', 'includes/welcome.md')    
let welcomeHTML = marked.parse(welcome, {breaks: true})
document.getElementById('welcome-div').innerHTML = welcomeHTML
renderMathInElement(document.getElementById("welcome-div")); // KaTeX

parsePost('post2', 'posts/20250921_buildingAnLLMPart1.md')
parsePost('post1', 'posts/20250920_21cmforegrounds.md')

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('open'));
});