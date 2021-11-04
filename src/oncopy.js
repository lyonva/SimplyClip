/*
From: https://stackoverflow.com/questions/2870369/google-chrome-extensions-how-to-detect-copy-action-ctrl-c-and-edit-copy
*/

// 

/**
 * Fires a message to the background page whenever the user triggers a copy action.
 * Does not capture copied content.
 *
 * **Input**
 *  - The event that caused the trigger (unused)
 *
 * **Output**
 *  - None
 *  - A "copy" message is sent to the background page
 */
function onCopy(e) {
    chrome.runtime.sendMessage({event: "copy"});
}

// Register event listener for copy events on document
document.addEventListener('copy', onCopy, true);
document.addEventListener('cut', onCopy, true);
