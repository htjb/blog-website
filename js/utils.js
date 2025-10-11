export async function loadMd(elementId, filePath) {
  let r = fetch(filePath).then(r => r.text())
  return r
}

export async function cleanHtml(id) {
  //document.getElementById(id).innerHTML = "";
  document.querySelectorAll('.card').forEach(el => el.remove());
}

export async function parsePost(elementId, postName, tag=null){
    let textContents = document.getElementById("text-content")
    let outputDiv = document.createElement("div");
    outputDiv.setAttribute("id", elementId);
    outputDiv.setAttribute("class", "card");
    outputDiv.addEventListener('click', () => {
      outputDiv.classList.toggle('open');
    });
    let post = await loadMd(elementId, postName)
    // first 4 lines are metadata
    let metaInfoText = post.split('\n').slice(0, 4)
    let metaInfo = {}
    for (let meta of metaInfoText){
        if (meta.split(':').length == 2){
            metaInfo[meta.split(':')[0]] = meta.split(':')[1]
        }
    }
    if (tag == null || metaInfo['tags'].includes(tag) || tag == 'All Posts'){
      textContents.appendChild(outputDiv);
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
}

export async function loadWelcome(){
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
}