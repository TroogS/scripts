// ==UserScript==
// @name         DuckDuckGo Tab Title
// @namespace    http://tampermonkey.net/
// @version      1
// @updateURL    https://github.com/luxick/scripts/raw/master/duckduckgo.user.js
// @downloadURL  https://github.com/luxick/scripts/raw/master/duckduckgo.user.js
// @description  Sets the title of the tab when using the POST method for searching
// @author       luxick
// @match        https://duckduckgo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=duckduckgo.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(updateTitle, 1000);
    // Your code here...
})();

function updateTitle(){
    document.title = document.getElementById("search_form_input").value + " - Search";
}
