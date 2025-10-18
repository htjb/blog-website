import { parsePost, loadWelcome, cleanPosts, loadMd } from "./utils.js";

// Prevent links inside cards from toggling the card open/close state
function linkClickHandler() {
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      e.stopPropagation();
    });
  });
}

const textContents = document.getElementById("text-content");

// Delegation listener
document.addEventListener('click', (e) => {
  const tagbtn = e.target.closest('.tag-button');
  const pagebtn = e.target.closest('.internal-link');
  if (tagbtn) {
    reload(tagbtn.textContent.trim());
  } else if (pagebtn) {
    let pageName = pagebtn.innerHTML.trim().toLowerCase();
    if (pageName === 'home') {
      document.getElementById("text-content").innerHTML = "";
      reload();
    } else {
      loadPage(pageName);
    }
  }
});

async function loadTags() {
  // create tag buttons
  const data = await fetch('posts/tag-list.txt').then(r => r.text());
  const tagList = data.split('\n').filter(Boolean);
  console.log(tagList);
  
  const tagHolder = document.createElement('div');
  tagHolder.id = 'tag-holder';

  const allButton = document.createElement('button');
  allButton.className = 'tag-button';
  allButton.textContent = 'All Posts';
  tagHolder.appendChild(allButton);
  
  for (const tag of tagList) {
    const b = document.createElement('button');
    b.className = 'tag-button';
    b.textContent = tag;
    tagHolder.appendChild(b);
  }

  textContents.appendChild(tagHolder);
}

async function loadPosts(filterTag = null) {
  // load posts from post-list.txt
  const data = await fetch('posts/post-list.txt').then(r => r.text());
  const postList = data.split('\n').filter(Boolean);
  for (let i = postList.length - 1; i >= 0; i--) {
    parsePost(postList[i], filterTag); // don't need to await unless you want sequential load
  }
}

async function reload(filterTag = null) {
  // clear existing posts and reload based on tag unless null
  // then load all posts
  cleanPosts("text-content");
  if (filterTag == null) {
    loadWelcome();
    await loadTags();
  }
  await loadPosts(filterTag);
  linkClickHandler();
}

// Handle URL hash to open specific post
// scrolls to it when loaded and opens the card
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (!hash) return;

  const openCard = () => {
    const card = document.querySelector(hash);
    if (card) {
      card.setAttribute('class', 'card open');
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    return false;
  };

  if (!openCard()) {
    const observer = new MutationObserver(() => {
      if (openCard()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});

// initial load
reload();

async function loadPage(pageName) {
  cleanPosts("text-content");
  loadMd('includes/' + pageName + '.md').then(page => {
    let pageHTML = marked.parse(page, {breaks: true});
    let textContents = document.getElementById("text-content")
    textContents.innerHTML = pageHTML;
    renderMathInElement(document.getElementById("text-content"), {
          delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$',  right: '$',  display: false}
      ]
      }); // KaTeX
  });
}