---
type: post
date: 21/10/2025
tags: javascript
---

# Making this website

I’ve had a website on GitHub Pages for a few years using Jekyll, but I’ve never really understood how it all works. Since I’ve always wanted to learn web development with JavaScript, CSS, and HTML I thought I would try and build a new website from scratch.

<center><img src="posts/images/makingThisWebsite/old-website.png" width="80%" alt="A screenshot of my old website"></center>

It's quite common in academia to have a website that acts as a sort of stylized CV and a platform to advertise your work and advertise the work of your research group. This was the style that I went for with my old website. I wanted to showcase my publications, talks and teaching experience. I still want to showcase my research with my new site, but I don't want it to look like a carbon copy of my CV. Instead, I essentially want my website to be a blog with posts about my latest work and any fun coding projects I am doing in my free time like [this post on building an llm](). You can read about the different steps in creating the website below!

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

talk about structuring posts file names and metadata to make parsing easier later...

## Website Layout

can talk about the index.html body layout... and the relevant styling...

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

## Parsing posts

little bit of python to help...

## Sharing posts

## Filtering based on tags

## Styling for mobile

## Hosting with Netlify

I've never used Netlify before, but it was super easy to set up, and you can host your website for free. You can sign up with your GitHub account

## Future edits