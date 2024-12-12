// ==UserScript==
// @name         Inline Reddit images and Comment Redirect
// @namespace    https://www.reddit.com
// @version      2024-12-12
// @description  Embed images posted as comments and redirect post links to comments
// @author       luxick
// @updateURL    https://raw.githubusercontent.com/luxick/scripts/master/reddit-image-inline.user.js
// @downloadURL  https://raw.githubusercontent.com/luxick/scripts/master/reddit-image-inline.user.js
// @match        https://old.reddit.com/r/*
// @match        https://www.reddit.com/r/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Handle image inlining
    let xpath = "//a[text()='<image>']";
    var element;
    var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    let links = [];
    while(element = result.iterateNext()){
        if (element.href) {
            links.push(element);
        }
    }

    for (var elem of links) {
        console.log("inlining image " + elem.href);
        let image = new Image();
        image.src = elem.href;
        image.style = "max-width: 300px";
        elem.parentElement.appendChild(image);
        elem.remove();
    }

    // Only proceed with link rewriting if we're not already in a comments section
    if (!window.location.pathname.includes('/comments/')) {
        // Handle post link redirection
        const postLinks = document.querySelectorAll('a.title');
        postLinks.forEach(link => {
            // Find the comments link for this post
            const thing = link.closest('.thing');
            if (thing) {
                const commentsLink = thing.querySelector('a.comments');
                if (commentsLink) {
                    link.href = commentsLink.href;
                }
            }
        });
    }
})();
