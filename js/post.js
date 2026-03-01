import { loadMd } from "./utils.js";

const textContents = document.getElementById("text-content");

// Parse frontmatter from markdown content
function parseFrontmatter(content) {
  const lines = content.split('\n');
  const frontmatter = {};
  let inFrontmatter = false;
  let frontmatterLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
      } else {
        break;
      }
      continue;
    }
    if (inFrontmatter) {
      const [key, ...valueParts] = lines[i].split(':');
      if (key && valueParts.length > 0) {
        frontmatter[key.trim()] = valueParts.join(':').trim();
      }
    } else {
      break;
    }
  }
  
  return { frontmatter, contentAfter: lines.slice(frontmatterLines.length + 2).join('\n') };
}

async function loadPost() {
  const hash = window.location.hash;
  const slug = hash ? hash.substring(1) : null;
  
  // Load post-list.txt to find the post file
  const data = await fetch('posts/post-list.txt').then(r => r.text());
  const postList = data.split('\n').filter(Boolean);
  
  let postFile = null;
  
  for (const file of postList) {
    // Extract slug from filename (remove date prefix)
    const match = file.match(/(\d{8}_)(.*)\.md/);
    if (match) {
      const fileSlug = match[2].replace('.md', '');
      if (slug && fileSlug === slug) {
        postFile = file;
        break;
      }
    } else {
      // Fallback for files without date prefix
      const fileSlug = file.replace('.md', '');
      if (slug && fileSlug === slug) {
        postFile = file;
        break;
      }
    }
  }
  
  if (!postFile) {
    textContents.innerHTML = '<p>Post not found</p>';
    return;
  }
  
  const content = await loadMd(postFile);
  const { frontmatter } = parseFrontmatter(content);
  
  // Get content after frontmatter (skip first 5 lines)
  const postBody = content.split('\n').slice(5).join('\n');
  let postHTML = marked.parse(postBody, { breaks: true });
  
  
  // Extract title for header
  const titleMatch = postHTML.match(/<h1>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1] : frontmatter.title || 'Untitled';
  
  // Build the post page
  const elementId = 'post-' + (slug || 'post');
  
  // Remove the <h1> tag from the post body since we already have it in the header
  postHTML = postHTML.replace(/^<h1>.*?<\/h1>/, '');
  
  const postHTMLFinal = `
    <article class="post-page" id="${elementId}">
      <div class="post-header">
        <h1>${title}</h1>
        <p class="post-date">${frontmatter.date || 'Date not available'}</p>
        ${frontmatter.tags ? `<div class="post-tags">${frontmatter.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join(' ')}</div>` : ''}
      </div>
      <div class="back-link">
        <a href="index.html">&larr; Back to all posts</a>
      </div>
      <div class="post-body">
        ${postHTML}
      </div>
      <div class="back-link">
        <a href="index.html">&larr; Back to all posts</a>
      </div>
    </article>
  `;
  
  textContents.innerHTML = postHTMLFinal;
  
  // Render KaTeX math
  renderMathInElement(document.getElementById(elementId), {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$',  right: '$',  display: false}
    ]
  });
  
  // Highlight code blocks
  document.querySelectorAll(`#${elementId} pre code`).forEach((block) => {
    hljs.highlightElement(block);
  });
  }

// Initial load
loadPost();
