// ==UserScript==
// @name         Wahapedia Enhanced Search
// @namespace    http://tampermonkey.net/
// @version      2025-01-23
// @description  Enhances Wahapedia with Kagi image search and Warhammer.com search
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

    // Function to create a Warhammer.com search button
    function createButton(modelName) {
        const warhammerButton = document.createElement('a');
        warhammerButton.href = `https://www.warhammer.com/de-DE/plp?search=${encodeURIComponent(modelName)}`;
        warhammerButton.className = 'dsButton';
        warhammerButton.target = '_blank';

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'tooltip picSearch';

        warhammerButton.appendChild(buttonDiv);
        warhammerButton.style.marginLeft = '5px';
        warhammerButton.style.display = 'inline-block';

        return warhammerButton;
    }

    // Function to add Warhammer.com search buttons
    function addWarhammerSearchButtons() {
        // Get the model name from the dsH2Header div
        const headerContainer = document.querySelector('.dsH2Header');
        if (!headerContainer) return;

        const modelName = headerContainer.firstElementChild.textContent.trim();
        if (!modelName) return;

        // Add button to narrow container
        const narrowContainer = document.querySelector('.dsIconsNarrow');
        if (narrowContainer) {
            narrowContainer.appendChild(createButton(modelName));
        }

        // Add button to wide container
        const wideContainer = document.querySelector('.dsIconsWide');
        if (wideContainer) {
            wideContainer.appendChild(createButton(modelName));
        }
    }

    // Initial run of both functions
    replaceImageSearchUrls();
    addWarhammerSearchButtons();

    // Set up observer for dynamically loaded content
    const observer = new MutationObserver(() => {
        replaceImageSearchUrls();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
