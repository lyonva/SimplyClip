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
let _previousData="";
let _maxListSize = 100;
let time_interval_set = undefined;

function readClipboardText(clipboardText) {
    console.log(clipboardText)
    if(clipboardText.length>0 && clipboardText!==_previousData){
        addClipboardList(clipboardText);
        _previousData = clipboardText
    }
}

const addClipboardList = async (clipText)=>{
    chrome.storage.sync.get("list",function(clipboard){
        let {list} = clipboard;
        console.log("List is:-", list);
        if(typeof list === "undefined")
            list = [];
        if(list.length === _maxListSize){
            list.pop();
        }
		if(list.indexOf(clipText)==-1)
			list.unshift(clipText)
        chrome.storage.sync.set({'list':list},status=>console.log("Debug : Clipboard Text pushed to list"));
    })
}

/*
window.addEventListener('mouseout',function(){
    if(time_interval_set===undefined)
        time_interval_set = setInterval(readClipboardText,2000)
})
window.addEventListener('mouseover',function(){
    clearInterval(time_interval_set);
    time_interval_set=undefined;
})
*/

/* From https://stackoverflow.com/questions/22702446/how-to-get-clipboard-data-in-chrome-extension
 and https://github.com/jeske/BBCodePaste/blob/master/bbcodepaste.js
 Creates a mock page to paste clipboard content and get it
*/
function getContentFromClipboard() {
    
    bg = chrome.extension.getBackgroundPage();        // get the background page
    bg.document.body.innerHTML= "";                   // clear the background page

    // add a DIV, contentEditable=true, to accept the paste action
    helper = bg.document.createElement("textarea");
    helper.style.position = "absolute";
    helper.style.border = "none";
    document.body.appendChild(helper);

    // focus the helper div's content
    helper.select();

    // trigger the paste action
    bg.document.execCommand("Paste");

    // read the clipboard contents from the helperdiv
    var result = helper.value;
    return result;
}

function setImageFromLink( url ) {
    fetch( url )
    .then(response => response.blob())
    .then(imageBlob => {
        // Then create a local URL for that image and print it 
        var reader = new FileReader();
        reader.readAsDataURL(imageBlob); 
        reader.onloadend = function() {
            var base64data = reader.result;                
            readClipboardText(base64data);
        }
    });

} 

chrome.runtime.onInstalled.addListener(function() {
    console.log("Clip installed")
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event == "copy") {
        readClipboardText( getContentFromClipboard() );
    }
});

// From https://arndom.hashnode.dev/how-to-add-a-context-menu-to-your-chrome-extension-in-react
chrome.contextMenus.create({
    "id": "copyImageClippy",
    "title": "Copy image to SimplyClip", /* what appears in the menu */
    "contexts": ['image']  /* to make this appear only when user selects something on page */
});

// Create context menu to copy links 
chrome.contextMenus.create({
    "id": "copyLink",   // id for menu
    "title": "Copy link to SimplyClip", // title for menu 
    "contexts":["link"],
  });

// push link or image to list on click
chrome.contextMenus.onClicked.addListener( (clickData) => {
    if(clickData.menuItemId == "copyImageClippy"){
        readClipboardText( clickData.srcUrl );
    }
    else if(clickData.menuItemId == "copyLink") {
        readClipboardText(clickData.linkUrl);
    // console.log(clickData.linkUrl)
    }
})



/*
document.addEventListener('visibilitychange',function(){
    if(document.hidden){
        clearInterval(time_interval_set);
        time_interval_set=undefined;
    }else{
        if(time_interval_set==undefined)
        time_interval_set = setInterval(readClipboardText,2000);
    }
})
*/
