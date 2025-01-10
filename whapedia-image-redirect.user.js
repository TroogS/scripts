// ==UserScript==
// @name         Wahapedia Image Search Redirect
// @namespace    http://tampermonkey.net/
// @version      2025-01-10
// @description  Replaces Google image search with Kagi image search on Wahapedia
// @author       luxick
// @updateURL    https://github.com/luxick/scripts/raw/master/whapedia-image-redirect.user.js
// @downloadURL  https://github.com/luxick/scripts/raw/master/whapedia-image-redirect.user.js
// @match        https://wahapedia.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to replace Google image search URLs with Kagi
    function replaceImageSearchUrls() {
        // Find all links on the page
        const links = document.getElementsByTagName('a');

        for (let link of links) {
            // Check if the link is a Google image search URL
            if (link.href.startsWith('https://www.google.com/search')) {
                // Replace with Kagi image search
                link.href = link.href.replace('https://www.google.com/search', 'https://kagi.com/images');
            }
        }
    }

    // Run when page loads
    replaceImageSearchUrls();

    // Run again if content is dynamically loaded
    const observer = new MutationObserver(replaceImageSearchUrls);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
