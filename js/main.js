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
    title = '<h1>' + metaInfo['date'] + ' - ' +  title.slice(4, title.length)
    title = '<div class="card-header">' + title + '\n' + 
        //metaInfo['tags'].split(',').map(tag => '<a href="" class="' + tag + '">' + tag.trim() + 
        //'</a>').join(',') +
        '</div>'
    postHTML = title + '<div class="card-body">\n' + postHTMLList.join('\n') + '\n</div>'
    document.getElementById(elementId).innerHTML = postHTML
    renderMathInElement(document.getElementById(elementId), {
        delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$',  right: '$',  display: false}
    ]
    }); // KaTeX
    // find all the code blocks inside pre blocks inside the post and highlight them
    document.querySelectorAll(`#${elementId} pre code`).forEach((block) => {
        hljs.highlightElement(block);
    });
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

fetch('posts/post-list.txt')
    .then(response => response.text())
    .then(data => {
        let postList = data.split('\n').filter(line => line.length > 0);
        console.log(postList);
        for (let i = postList.length - 1; i >= 0; i--){
            let postId = 'post' + (i + 1);
            parsePost(postId, postList[i]);
        }
        document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('open'));
        });
    });