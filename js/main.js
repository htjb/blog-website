import { loadMd } from "./utils.js";

async function parsePost(elementId, postName){
    let outputDiv = document.createElement("div");
    outputDiv.setAttribute("id", elementId);
    outputDiv.setAttribute("class", "card");
    textContents.appendChild(outputDiv);
    let post = await loadMd(elementId, postName)
    // first 4 lines are metadata
    let metaInfoText = post.split('\n').slice(0, 4)
    let metaInfo = {}
    for (let meta of metaInfoText){
        if (meta.split(':').length == 2){
            metaInfo[meta.split(':')[0]] = meta.split(':')[1]
        }
    }

    // everything after the first 5 lines is the post content
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
    postHTML = title + '<div class="card-body">\n' + postHTMLList.join('\n') + 
        //'<p align="center"> Tags:' +
        //metaInfo['tags'].split(',').map(tag => ' ' + tag.trim() + ' ').join('')
        //+ '</p>'
        '\n</div>'
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

// tag for text content
let textContents = document.getElementById("text-content")
// load in the welcome message
let welcomeDiv = document.createElement("div");
welcomeDiv.setAttribute("id", "welcome-div")
textContents.appendChild(welcomeDiv)
let welcome = await loadMd('welcome-div', 'includes/welcome.md')    
let welcomeHTML = marked.parse(welcome, {breaks: true})
document.getElementById('welcome-div').innerHTML = welcomeHTML
renderMathInElement(document.getElementById("welcome-div")); // KaTeX

fetch('posts/tag-list.txt')
    .then(response => response.text())
    .then(data => {
        let tagList = data.split('\n').filter(line => line.length > 0);
        console.log(tagList);
        let tagHolder = document.createElement('div');
        textContents.appendChild(tagHolder);
        for (let tag of tagList){
            let tagButton = document.createElement('button')
            tagButton.innerHTML = tag;
            tagButton.setAttribute('class', 'tag-button')
            tagHolder.appendChild(tagButton)
        }
        // now load posts *after* tags
    return fetch('posts/post-list.txt');
    })
    .then(response => response.text())
    .then(data => {
        let postList = data.split('\n').filter(line => line.length > 0);
        for (let i = postList.length - 1; i >= 0; i--){
            let postId = 'post' + (i + 1);
            parsePost(postId, postList[i]);
        }
        document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('open'));

        /*const links = document.querySelectorAll('a[href]');
  
        links.forEach(link => {
            const url = new URL(link.href, window.location.href);
            // Check if the link is external
            if (url.origin !== window.location.origin) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            }
        });*/

        });
    });

/*document.addEventListener('click', (e) => {
  if (e.target.matches('.tag-button')) {
    console.log('e.innerText', e.target.innerText);
  }
  let cards = document.querySelectorAll('.card');
  // want to show all cards if no tag selected otherwise filter
  if (e.target.matches('.tag-button')){
    let selectedTag = e.target.innerText;
    cards.forEach(card => {
        if (card.innerHTML.includes(selectedTag)){
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
  } else {
    cards.forEach(card => {
        card.style.display = 'block';
    });
  }
});*/
