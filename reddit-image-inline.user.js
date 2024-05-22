// ==UserScript==
// @name         Inline Reddit images
// @namespace    https://www.reddit.com
// @version      2024-05-21
// @description  Embed images posted as comments
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
        elem.remove();}
})();
