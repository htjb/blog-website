import { parsePost, loadWelcome, cleanHtml } from "./utils.js";

loadWelcome()

let textContents = document.getElementById("text-content")

// initial load of tags and posts
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
    });

// event listener for tag buttons to filter posts
// document.querySelectorAll('.tag-button').forEach(button => {
//     button.addEventListener('click', () => {
//         console.log('Filtering for tag: ' + button.innerHTML)
//     cleanHtml("text-content")
//     loadWelcome()
//     fetch('posts/tag-list.txt')
//         .then(response => response.text())
//         .then(data => {
//             let tagList = data.split('\n').filter(line => line.length > 0);
//             console.log(tagList);
//             let tagHolder = document.createElement('div');
//             textContents.appendChild(tagHolder);
//             for (let tag of tagList){
//                 let tagButton = document.createElement('button')
//                 tagButton.innerHTML = tag;
//                 tagButton.setAttribute('class', 'tag-button')
//                 tagHolder.appendChild(tagButton)
//             } return fetch('posts/post-list.txt') })
//         .then(response => response.text())
//         .then(data => {
//             let postList = data.split('\n').filter(line => line.length > 0);
//             for (let i = postList.length - 1; i >= 0; i--){
//                 let postId = 'post' + (i + 1);
//                 parsePost(postId, postList[i], button.innerHTML);
//             }
//         });
//     });
// });