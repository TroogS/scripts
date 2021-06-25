// ==UserScript==
// @name         ESP Fixes
// @namespace    https://esp.eas-cpq.de/
// @version      1.1
// @description  Collection of fixes for the EAS Service Portal
// @updateURL    https://raw.githubusercontent.com/luxick/scripts/master/esp-fixes.user.js
// @downloadURL  https://raw.githubusercontent.com/luxick/scripts/master/esp-fixes.user.js
// @author       Marcel Fries
// @match        https://esp.eas-cpq.de/*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

// Force popups into new tabs instead
function OnlyTabs(url, width, heigth) {
    window.open(url, "_blank");
}

// Set title of the tab to number and description of the task
function fixTitle(){
    var header = document.getElementById("TaskLabelHeader");
    if (header){
        document.title = header.innerText
    }
}

// No more ViewState Errors. Horrible, Horrible Hack
function clearViewState(){
    document.getElementById("__EVENTVALIDATION").value = null;
}

(function () {
    'use strict';

    // Never open Popup windows
    NewWindowWithoutControls = OnlyTabs

    //Improve the tab title display
    fixTitle();

    // Clear the ViewState every 500ms
    setInterval(clearViewState,500);
}());