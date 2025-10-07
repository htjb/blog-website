import { parsePost, loadWelcome, cleanHtml } from "./utils.js";

loadWelcome()

let textContents = document.getElementById("text-content")

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

// document.addEventListener('click', (e) => {
//   cleanHtml(textContents)
//   loadWelcome()
//   fetch('posts/post-list.txt')
//     .then(response => response.text())
//     .then(data => {
//         let postList = data.split('\n').filter(line => line.length > 0);
//         for (let i = postList.length - 1; i >= 0; i--){
//             let postId = 'post' + (i + 1);
//             parsePost(postId, postList[i]);
//         }
//         document.querySelectorAll('.card').forEach(card => {
//         card.addEventListener('click', () => card.classList.toggle('open'));
//         });
//     });
// });
