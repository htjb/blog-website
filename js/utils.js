export async function loadMd(filePath) {
  let r = fetch(filePath).then(r => r.text())
  return r
}

export async function cleanPosts(id) {
  //document.getElementById(id).innerHTML = "";
  document.querySelectorAll('.card').forEach(el => el.remove());
}

export async function parsePost(postList, tag=null){
    let textContents = document.getElementById("text-content")
    postList.reverse()
    for (let postName of postList){
      let outputDiv = document.createElement("div");
      outputDiv.setAttribute("class", "card");
      outputDiv.addEventListener('click', () => {
        outputDiv.classList.toggle('open');
      });
      let post = await loadMd(postName)
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
        let elementId = 'post-' + 
          title.split('<h1>')[1].split('</h1>')[0]
          .toLowerCase().replace(/[^a-z0-9]+/g, '-')
        outputDiv.setAttribute("id", elementId);

        title = '<h1>' + title.slice(4, title.length)
        title = '<div class="card-header">' + title + '\n</div>' + 
          `<button id="shareBtn-${elementId}">Share this post</button>`
        console.log(metaInfo['date'])
        postHTML = title + '<div class="card-body">\n'
            + `<p>${metaInfo['date']}</p>`
            + postHTMLList.join('\n') + 
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

        // make the share button functional
        const shareBtn = document.getElementById('shareBtn-' + elementId);

        shareBtn.addEventListener('click', async e => {
          e.stopPropagation(); // prevent the card from toggling
          if (navigator.share) {
            await navigator.share({
              title: document.title,
              text: 'Check out this post!',
              url: window.location.href + '#' + elementId,
            });
          };
        });
      }
  }
}

export async function loadWelcome(){
  // tag for text content
  let textContents = document.getElementById("text-content")
  // load in the welcome message
  if (!document.getElementById("welcome-div")){
    let welcomeDiv = document.createElement("div");
    welcomeDiv.setAttribute("id", "welcome-div")
    textContents.appendChild(welcomeDiv)
  }

  let welcome = await loadMd('includes/welcome.md')    
  let welcomeHTML = marked.parse(welcome, {breaks: true})
  document.getElementById('welcome-div').innerHTML = welcomeHTML
}