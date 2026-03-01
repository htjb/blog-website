export async function loadMd(filePath) {
  let r = fetch(filePath).then(r => r.text())
  return r
}

export async function cleanPosts(id) {
  document.getElementById(id).innerHTML = "";
}

export async function parsePost(postList){
    let textContents = document.getElementById("text-content")
    postList.reverse()
    for (let postName of postList){
      let outputDiv = document.createElement("div");
      outputDiv.setAttribute("class", "post-item");

      // Generate slug from filename
      const filename = postName.split('/').pop().replace('.md', '')
      const slug = filename.replace(/^\d+_/, '')
      const postId = `post-${slug}`
      let post = await loadMd(postName)
      // first 4 lines are metadata
      let metaInfoText = post.split('\n').slice(0, 4)
      let metaInfo = {}
      for (let meta of metaInfoText){
          if (meta.split(':').length == 2){
              metaInfo[meta.split(':')[0]] = meta.split(':')[1]
          }
      }

      textContents.appendChild(outputDiv);
      outputDiv.dataset.tags = metaInfo['tags'] || '';

      let postHTML = marked.parse(
          post.split('\n').slice(5, post.length).join('\n'),
          {breaks: true})

      let postHTMLList = postHTML.split('\n')
      let title = postHTMLList.shift()

      outputDiv.setAttribute("id", postId);
      outputDiv.innerHTML = `<span class="post-title"><a href="post.html#${slug}">${title.slice(4, title.length - 5)}</a></span><span class="post-date">${metaInfo['date']}</span>`;
  }
}

export function filterPosts(tag) {
  const items = [...document.querySelectorAll('.post-item')].map(item => ({
    el: item,
    match: !tag || tag === 'All Posts' || item.dataset.tags.includes(tag)
  }));

  // Reorder instantly without triggering opacity transitions
  items.forEach(({ el, match }) => {
    el.style.transition = 'none';
    el.style.order = match ? '0' : '1';
    el.style.pointerEvents = match ? '' : 'none';
  });

  // Then fade opacity in the next frame once layout is settled
  requestAnimationFrame(() => {
    items.forEach(({ el, match }) => {
      el.style.transition = '';
      el.style.opacity = match ? '1' : '0.2';
    });
  });
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