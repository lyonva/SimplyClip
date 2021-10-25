/*
From: https://stackoverflow.com/questions/2870369/google-chrome-extensions-how-to-detect-copy-action-ctrl-c-and-edit-copy
*/

function onCopy(e) { 
    chrome.runtime.sendMessage({event: "copy"});
}

//register event listener for copy events on document
document.addEventListener('copy',onCopy,true); 
document.addEventListener('cut',onCopy,true); 