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
        setClipboardText(clipboardText);
        _previousData = clipboardText
    }
}


const setClipboardText = async (clipText)=>{
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

function getContentFromClipboard() {
    bg = chrome.extension.getBackgroundPage();        // get the background page
    bg.document.body.innerHTML= "";                   // clear the background page

    // add a DIV, contentEditable=true, to accept the paste action
    var helperdiv = bg.document.createElement("div");
    document.body.appendChild(helperdiv);
    helperdiv.contentEditable = true;

    // focus the helper div's content
    var range = document.createRange();
    range.selectNode(helperdiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    helperdiv.focus();    

    // trigger the paste action
    bg.document.execCommand("Paste");

    // read the clipboard contents from the helperdiv
    var result = helperdiv.innerHTML;
    return result;
}


chrome.runtime.onInstalled.addListener(function() {
    console.log("Clip installed")
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event == "copy") {
        readClipboardText( getContentFromClipboard() );
    }
});

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