/*
MIT License

Copyright (c) 2021 lalit10

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
Background script
This is always running while the extension is enabled
Code here is only executed when triggered by user actions
Or when other code asks to
*/

// Important variables and constants
let _previousData=""; // Last read clipboard data, to avoid having duplicate entries
let _maxListSize = 100; // Maximum size of the list
        // Note that, per Chrome limitations, the list cannot be larger than 8 KB


/* 
Custom application context menus
From https://arndom.hashnode.dev/how-to-add-a-context-menu-to-your-chrome-extension-in-react
Added so we get actions for storing links and images in the clipboard
*/
// Create context menu to copy images
chrome.contextMenus.create({
    "id": "copyImageClippy", // Unique id for menu
    "title": "Copy image to SimplyClip", // What appears in the menu
    "contexts": ['image']  // to make this appear only when user selects an image on page
});

// Create context menu to copy links 
chrome.contextMenus.create({
    "id": "copyLink",   // Unique id for menu
    "title": "Copy link to SimplyClip", // What appears in the menu
    "contexts":["link"], // to make this appear only when user selects an hyperlink on page
});


/* 
Function:
    readClipboardText
Description:
    Checks if clipboardtext can be added
    If so, ads it
    This is the main entrypoint for storing data in clipboard
    To add: 1) App must be toggled on
            2) Copied text must be non-empty
            3) Must be different from last read entry
Input:
    Content copied by user, text only
Output:
    Does not return
    Text is added to the clipboard list if conditions are met
 */
function readClipboardText(clipboardText) {
    chrome.storage.sync.get(["apptoggle"],function(result){
        if (result.apptoggle == 1) {
            console.log(clipboardText)
            if(clipboardText.length>0 && clipboardText!==_previousData){
                addClipboardList(clipboardText);
                _previousData = clipboardText
            }
        } 
        // Uncomment for debugging
        // else { console.log("Nope, extension is off.") }
    })
}

/* 
Function:
    addClipboardList
Description:
    Adds content to cliboard list
    Should no be used directly, instead use readClipboardText

Input:
    Content copied by user, text only
Output:
    Does not return
    Text is added to the clipboard list if conditions are met
 */
const addClipboardList = async (clipText)=>{
    chrome.storage.sync.get("list", function(clipboard) {
        // Create a copy
        let {list} = clipboard;
        
        // Uncomment for debugging
        // console.log("List is:-", list);

        // Sanity check, if undefined make it into a list object
        if(typeof list === "undefined")
            list = [];
        
        // We remove before adding, so list is always <= _maxListSize
        if(list.length === _maxListSize)
            list.pop();
        
        if(list.indexOf(clipText)==-1)
            list.unshift(clipText)
        
        chrome.storage.sync.set({'list':list}
        // Uncomment for debugging
        // , status=>console.log("Debug : Clipboard Text pushed to list")
        );
    })
}


/* 
Function:
    getContentFromClipboard
Description:
    Gets content the user just copied from the clipboard
    Creates a mock page to paste clipboard content and get it
    Created from https://stackoverflow.com/questions/22702446/how-to-get-clipboard-data-in-chrome-extension
    and https://github.com/jeske/BBCodePaste/blob/master/bbcodepaste.js
Input:
    None
    Requires browser clipboard to have something in it
Output:
    Text content that the user just copied
 */
function getContentFromClipboard() {
    // Get the background page, the html file associated with this script
    // Note that it should be blank
    // So clear the it just in case
    bg = chrome.extension.getBackgroundPage();
    bg.document.body.innerHTML= "";

    // Add a text area with contentEditable=true, to accept the paste action
    // And add to the document
    helper = bg.document.createElement("textarea");
    helper.style.position = "absolute";
    helper.style.border = "none";
    document.body.appendChild(helper);

    // Focus the browser into the text area
    helper.select();

    // Trigger the paste action
    bg.document.execCommand("Paste");

    // Read the clipboard contents from the helperdiv and return
    var result = helper.value;
    return result;
}

/* 
CURRENTLY UNUSED
Function:
    setImageFromLink
Description:
    Take and image url and save it on the clipboard
    This is done by converting it to base 64 data
Input:
    URL, must be pointing to an image resource
Output:
    None
    Image data is converted to base64 and saved to clipboard
 */
function setImageFromLink( url ) {
    // Make a fetch request to grab image data
    fetch( url )
    .then(response => response.blob())
    .then(imageBlob => {
        // Then create a local URL for that image and print it 
        var reader = new FileReader();
        reader.readAsDataURL(imageBlob); 
        // When data is fetched, convert it to base 64
        // Then save it to clipboard
        reader.onloadend = function() {
            var base64data = reader.result;                
            readClipboardText(base64data);
        }
    });
} 

/* 
Function:
    Anonymous function
    Run when extension is installed or reloaded
Description:
    Create important variables
    That are saved on Chrome's sync storage
    List of variables:
        1) apptoggle: determines if the app captures from clipboard actions
        2) list: History of items copied from the clipboard
Input:
    None
Output:
    None
    The variables are created on sync storage
 */
chrome.runtime.onInstalled.addListener(function() {
    // For debugging, log the call of the routine
    // console.log("Clip installed");

    // Enable the extension on every install or reinstall
    chrome.storage.sync.set({ apptoggle: 1 });

    // Create list variable
    // Only on first install or if it is undefined
    chrome.storage.sync.get("list", function(list) {
        if(typeof list === "undefined")
            chrome.storage.sync.set({ list: [] });
    })

    // For debugging, remove list on every reinstall
    // chrome.storage.sync.set({ list: [] });
})

/* 
Function:
    Anonymous function
    Run a "copy" message is sent
    This is done when user copies or cuts text from the clipboard
Description:
    When user triggers a copy
    Capture the content they just copied
    And save it into the clipboard
Input:
    None
Output:
    None
    If conditions are met, the text is stored into the clipboard
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event == "copy") {
        readClipboardText( getContentFromClipboard() );
    }
});

/* 
Function:
    Anonymous function
    Runs when a context menu item is selected
Description:
    Push link or image to the clipboard list
Input:
    None
Output:
    None
    If conditions are met, the data is stored into the clipboard
 */
chrome.contextMenus.onClicked.addListener( (clickData) => {
    // For images
    if(clickData.menuItemId == "copyImageClippy"){
        readClipboardText( clickData.srcUrl );
    }
    // For links
    else if(clickData.menuItemId == "copyLink") {
        readClipboardText(clickData.linkUrl);
    }
})
