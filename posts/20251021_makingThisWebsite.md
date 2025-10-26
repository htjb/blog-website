---
type: post
date: 21/10/2025
tags: javascript
---

# Making this website

I’ve had a website on GitHub Pages for a few years using Jekyll, but I’ve never really understood how it all works. Since I’ve always wanted to learn web development with JavaScript, CSS, and HTML I thought I would try and build a new website from scratch.

<center><img src="posts/images/makingThisWebsite/old-website.png" width="80%" alt="A screenshot of my old website"></center>

It's quite common in academia to have a website that acts as a sort of stylized CV and a platform to advertise your work and advertise the work of your research group. This was the style that I went for with my old website. I wanted to showcase my publications, talks and teaching experience. I still want to showcase my research with my new site, but I don't want it to look like a carbon copy of my CV. Instead, I essentially want my website to be a blog with posts about my latest work and any fun coding projects I am doing in my free time like [this post on building an llm](https://harrybevins.co.uk/#post-building-a-large-language-model-part-1). You can read about the different steps in creating the website below!

## Markdown, JS and HTML

GitHub pages let you write everything in Markdown and then these are parsed into HTML. Since I find Markdown infinitely easier to read and write than HTML I wanted to implement something similar on my website. If everything was going to be written in Markdown I really only needed one HTML file that content could be dynamically loaded into from various `.md` files with a bit of JavaScript. I will talk more about how this is specifically done below, but I needed to import a few different JavaScript packages to make this possible.

The first is [marked](https://github.com/markedjs/marked) which is a compiler that translates markdown to HTML. marked is a very popular package with almost 36k stars on GitHub, but it doesn't parse latex math. In order to render math I need to import the [KaTeX](https://katex.org/) package. There are alternative packages available to render math like [MathJax](https://www.mathjax.org/) and I think this is what my old GitHub pages site used, but my understanding is that KaTeX is faster. In practice either MathJax or KaTeX would work! Finally, I wanted any code snippets I include in my website to look nice. To do this I included the [highlight.js](https://highlightjs.org/) package. To include these packages I have to add the following snippet 

```html
<!-- markdown parser -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<!-- math rendering -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" defer></script>

<!-- code styling -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
```

to the `<head></head>` in my `index.html`. These packages are loaded up when the webpage loads via the [jsdelivr](https://www.jsdelivr.com/) content delivery network (CDN). A CDN is basically a network of servers with cached copies of useful resources that can be delivered up to a user from a geographically close location improving loading speeds and performance.

## File structure

I also needed to think about the file structure. A website is built from several different types of files including css, html, js and in my case markdown files. I also images for both my posts and some of the more permanent pages on my site. I can run the `tree . -a -I '.git|.DS_Store' > output.txt' to generate a file tree that shows the layout of my website.

```
website
├── .gitignore
├── assets
│   ├── 21cmsignal.png
│   ├── ads.png
│   ├── arxiv.png
│   ├── github_logo.png
│   ├── linkedin.png
│   ├── portrait.jpeg
│   ├── reach-and-cosmocube.png
│   └── rocket.png
├── css
│   ├── mobile.css
│   └── styles.css
├── includes
│   ├── about.md
│   ├── code.md
│   ├── research.md
│   └── welcome.md
├── index.html
├── js
│   ├── main.js
│   └── utils.js
└── posts
    ├── 20250920_21cmforegrounds.md
    ├── 20250921_buildingAnLLMPart1.md
    ├── 20251007_globalworkshop.md
    ├── 20251021_makingThisWebsite.md
    ├── build-post-list.py
    ├── images
    │   ├── beam_sky_pattern.png
    │   ├── global_workshop.png
    │   ├── makingThisWebsite
    │   │   └── old-website.png
    │   └── sky_brightness_vs_frequency.png
    ├── post-list.txt
    └── tag-list.txt
```

I have a `.gitignore` to prevent accidentally uploading certain files. The `assets` folder contains images that are used in the pages in `includes` that explain my research and the codes that I have worked on. I also have my portrait in `assets` and some logos that I use to link to my arXiv, github, linkedin and ads abstracts. 

`css` includes my style files. I started off with just `styles.css` but eventually realised I needed some specific rules for styling the website on smaller screens like mobiles and tablets. These rules are kept in `mobile.css` and both are linked in `index.html` which is the only html page on the site.

`js/` is where I keep the javascript functions needed to dynamically load content into the website from the `.md` files and handle interactions with different features on the website. I started off with good intentions having a `utils.js` and `main.js` file, but I will admit they have become a bit untidy. Fortunately there are only around 200 lines of code in total, and I will (eventually) tidy it up a bit!

Finally, `posts` is where I keep my blog posts. Each post is given a file name that includes the date and a description of the contents. `build-post-list.py` is a short python script that creates a list of the posts in the file and a list of tags. Every time a post gets added to the website this script can be run to update these files. The files are later used to load in the content to the website and create buttons that allow users to filter the posts based on tags. I could probably have done this in JavaScript, but I was feeling lazy clearly. `posts/images` contains pictures for each of the posts. The posts have some metadata at the top like this

```
---
type: post
date: 21/10/2025
tags: javascript
---
```
that is used for filtering and ordering on the website.

## Website Layout

I wanted to keep the layout of the website quite minimalist with an always there navigation bar and a region for displaying content like in the diagram below. I also didn't want the webiste to be one continuous long steam of text and I wanted visitors to be able to quickly scan through my latest posts. 

<div style="display: flex; flex-direction: row; align-items: flex-start; justify-content:flex-start;">
<p style="width: 50%; margin-right: 1em;">A sketch of the layout is shown on the right. The idea was that the always there navigation bar would include a nice picture of me, my name a description of my job, a couple of logos that link to sites like github and arXiv, and a few buttons for the users to move between the home page with the blog posts and the static pages explaining my research.</p>
<img src="posts/images/makingThisWebsite/Website.png" width="50%" alt="A sketch of the webiste layout">
</div>
I wanted the blog posts to appear on preview cards that the user can click on to expand and read. I also wanted the anyone visiting the cite to be able to filter the posts based on tags and be able to share the posts.

The body of the `index.html` page is shown below. You can see the `nav-bar` which is styled as a flex box with the flex direction set to column. `nav-bar-content` and `nav-buttons` are dividers used for styling the website on smaller screens like mobiles. Setting `position: fixed` in the css for `nav-bar` makes sure that the navigation bar doesn't move when the user scrolls through the content in the larger right hand `text-contents` div.

```html
<body>
    <div class="contents">
        <div class="nav-bar">
            <img src="assets/portrait.jpeg" alt="portrait" id="portrait">
            <div class="nav-bar-content">
                <h2>Harry Bevins PhD</h2>
                <p>Astrophysics researcher at the Kavli Institute for Cosmology and Cavendish Astrophysics, University of Cambridge.</p>
                <center>
                <a href='https://arxiv.org/search/?searchtype=author&query=Bevins%2C+H+T+J'><img src="./assets/arxiv.png" width="10%" alt-text="arXiv Link" class="link-image"></a>
                <a href='https://github.com/htjb'><img src="./assets/github_logo.png" width="10%" alt-text="Github Link" class="link-image"></a>
                <a href='https://www.linkedin.com/in/harry-bevins/'><img src="./assets/linkedin.png" width="10%" alt-text="Linkedin Link" class="link-image"></a>
                <a href='https://ui.adsabs.harvard.edu/search/q=author%3A%22Bevins%2C%20H.%20T.%20J.%22&sort=date%20desc%2C%20bibcode%20desc&p_=0'><img src="./assets/ads.png" width="10%" alt-text="ADS Link" class="link-image"></a>
                </center>
                <div class="nav-buttons">
                <button class="internal-link">Home</button>
                <button class="internal-link">About</button>
                <button class="internal-link">Research</button>
                <button class="internal-link">Code</button>
                </div>
            </div>
        </div>
        <div id="text-content">
            
        </div>
    </div>
</body>
```

`text-contents` is where the posts are shown or the static pages describing who I am, my research, and the codes I have worked on. The content is managed by `js/main.js` and loaded best on interactions with different buttons on the website using event listeners.

## Parsing posts

In `main.js` there is a function called `reload()` which is triggered when the webpage first loads, when the site visitor clicks on `Home` or when the visitor filters the posts based on tags. `reload()` cleans any existing HTML in `text-contents` and if there is no tag provided to filter on creates a div with the welcome message in `includes/welcome.md` in, loads a series of buttons one for each tag in the `posts/tag-list.txt` and loads all the posts in `posts/post-list.txt`. 

`parsePosts` in `js/utils.js` creates a card for each post in `post-list.txt` and renders them on the website in date order. When the post is clicked a class is added to the card called `open` which changes the `max-height` property of the card so that it displays the full post. The function scrapes the metadata from the posts file and filters based on tag. The div is given an element ID that includes a reference to the posts title. A share button is created and the posts content is appended to the card after being parsed with marked, KaTeX and highlightjs. The full function is shown below.

```js
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
```

## Sharing posts

Since the posts are not on unique pages but rather expandable cards on the home page sharing them is a bit non-trivial. Ideally when a visitor comes to the site via a shared link we want the site to load with that post open and the screen scrolled to the beginning of the post. Links are created by clicking on the share button the site and use the browsers native sharing functionality. The links are created with a hash and the posts ID for example `https://harrybevins.co.uk/#post-global-21-cm-workshop-caltech`.

<center><img src="posts/images/makingThisWebsite/native-share.png" width="50%" alt="A picture of the native share tool on the browser"></center>

However loading the site at a post and opening that post requires an event listener on the window. The listener, shown below, check for a hash in the windows location and if it finds one it then looks for the card with that ID. If the card exists it sets its class to `card open` and scrolls it into view. However, because content is loaded dynamically into the window the card might not exist the first time `openCard` is called. We use a `MutationObserver` to look for changes in the `document.body` and run `openCard` every time there is a change until it returns `true`.

```js
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
```

## Styling for mobile

So after setting up the site to work on the desktop, I used Chromes' developer tools too see what it looked like on a smaller screen, and it wasn't great! On a mobile sized screen the navigation bar and text-content window were competing for space making the content on the right-hand side hard to read. I needed some specific rules for styling on smaller screens and I discovered you could do this with a `@media (max-width: 768px)` selector in CSS.

<div style="display: flex; flex-direction: row; align-items: flex-start; justify-content:flex-start;">
<p style="width: 70%; margin-right: 1em;">The idea was to take the nav bar and place it at the top of the webpage. I used `nav-bar-content` and `nav-buttons` divs to arrange the layout. `nav-bar`'s flex was changed to `row` so that the portrait image and content appeared next to eachother. `nav-bar-content`'s flex is in the `column` direction on the mobile and the buttons in their seperate div are flexed in the `row` direction to create the tidy layout you see on the right. </p>
<img src="posts/images/makingThisWebsite/Mobile_website.png" width="30%" alt="A sketch of the mobile layout.">
</div>

The final change was to make the navigation bar's position relative so that it moved off-screen as the user scrolled. This prevents it taking up lots of space when visitors to the site on mobile devices are trying to read the posts.

## Hosting with Netlify

The website is being hosted on Netlify. It's not something I have used before, but it was super easy to set up, and you can host your website for free (ish). You can sign up with your GitHub account and link a repository. Every time the deployed branch is updated the website is automatically redeployed, and I think you can also deploy multiple branches meaning I could in theory deploy my dev branch!

My domain was purchased through Google domains originally, but this sold to Squarespace. I used this domain for my old GitHub pages and never had any issues with Squarespace.

I want to keep playing with Netlify and see what it has to offer, but it seems quite cool!

## Future edits

One thing I would really like to add to the website is a way for people to subscribe and get updates every time a new post is added. Something like RSS might work here, but I need to explore options really!

I'm also keen to explore frameworks like React and see if they can help improve the design and user experience.

It would be fun to add a feature where users can change the highlight colour as well. I think this can be done with CSS variables, but I need to play with it a bit.

I'd also quite like to add a button to the website that takes users back to the top of the page. I think this would be particularly useful on mobile where the navigation bars position is fixed at the top of the site.

If you have any feature suggestions or advice please get in touch or open an issue on the website's GitHub [repo](https://github.com/htjb/blog-website). Thanks for reading to the end of this very long post! There is a lot more I could have said about building this website, but I tried to highlight some of the interesting challenges that were faced and the decisions that had to be made. I enjoyed playing around with JavaScript, CSS and HTML, and I am continuing to play with them to build other projects!