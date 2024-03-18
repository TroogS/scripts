// ==UserScript==
// @name         ESP Fixes
// @namespace    https://esp.eas-cpq.de/
// @version      1.8
// @description  Collection of fixes for the EAS Service Portal
// @updateURL    https://raw.githubusercontent.com/luxick/scripts/master/esp-fixes.user.js
// @downloadURL  https://raw.githubusercontent.com/luxick/scripts/master/esp-fixes.user.js
// @author       Marcel Fries
// @match        https://esp.eas-cpq.de/*
// @match        https://esp-new.eas-cpq.de/*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


// Force popups into new tabs instead
function OnlyTabs(url, width, heigth) {
    window.open(url, "_blank");
}

// Set title of the tab to number and description of the task
function updateTitle(){
    let header = document.getElementById("TaskLabelHeader");
    if (header){
        document.title = header.innerText;
        return;
    }

    let generalHeader = document.getElementsByClassName("page-header")[0];
    if (generalHeader){
        document.title = "ESP " + generalHeader.innerText;
    }
   document.title = document.title.replace("Word Editor - TaskDescription - ", "Text ")
}

// No more ViewState Errors. Horrible, Horrible Hack
function clearViewState(){
    document.getElementById("__EVENTVALIDATION").value = null;
}

var css = `
.sidebar {
  flex 0 1 12%;
  max-width: 200px;
}

.sidebar .panel-heading {
  padding: 2px 10px;
}

.sidebar .nav > li > a {
  padding: 0;
}
`;

(function () {
    'use strict';

    // Add custom CSS
    //addGlobalStyle(css);

    // Never open Popup windows
    console.log();
    if (typeof NewWindowWithoutControls === "function") {
        console.log("Reregistering NewWindowWithoutControls");
        NewWindowWithoutControls = OnlyTabs;
    }

    if (typeof BlazorHelper === "object") {
        if(typeof BlazorHelper.OpenLinkInPopup === "function") {
            console.log("Reregistering OpenLinkInPopup");
            BlazorHelper.OpenLinkInPopup = OnlyTabs;
        }
    }

    //Improve the tab title display
    setTimeout(updateTitle, 500);

    // Clear the ViewState every 500ms
    //setInterval(clearViewState,500);
    $(document).ready(function(){
        $('#__EVENTVALIDATION').attr('autocomplete', 'off');
    });
}());
