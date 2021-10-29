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
let _clipboardList = document.querySelector("#clipboard_list");

let _flag = 0;
let search_str = "";


function getClipboardText() {
    chrome.storage.sync.get(['list'], clipboard => {
        let list = clipboard.list;
        let emptyDiv = document.getElementById('empty-div');
        if (list === undefined || list.length === 0) {
            emptyDiv.classList.remove('hide-div');
        } 
        
        else {
            emptyDiv.classList.add('hide-div');
            if (typeof list !== undefined && _flag == 0){
                list.forEach(item => {
                    console.log(item);
                    addClipboardListItem(item)})}
            else if (typeof list !== undefined && _flag == 1) {list.forEach(item => {
                        if (item.toLowerCase().includes(search_str)){
                            console.log(item);
                            addClipboardListItem(item)}});}
                    
                    
                    ;}
        // }
    });
}


function getThumbnail(textContent) {
    let ind = textContent.indexOf('https://www.youtube.com/');
    if (ind === 0) {
        let videoId = "";
        let idIndex = textContent.indexOf('watch?v=');
        let endIndex = textContent.indexOf('&');
        if (endIndex !== -1)
            videoId = textContent.substring(idIndex + 8, endIndex);
        else
            videoId = textContent.substring(idIndex + 8, textContent.length);
        let url = `https://img.youtube.com/vi/${videoId}/1.jpg`;
        return {
            sourceUrl: textContent,
            imageUrl: url,
            isVideo: true,
        };
    }
    else {
        let ind = textContent.indexOf('http');
        if (ind === 0) {
            let url = new URL(textContent);
            let ans = "https://favicons.githubusercontent.com/" + url.hostname;
            return {
                sourceUrl: textContent,
                imageUrl: ans,
                isVideo: false
            }
        }
    }
    return {
        sourceUrl: "",
        imageUrl: ""
    }
        ;
}
function addClipboardListItem(text) {
    let { sourceUrl, imageUrl, isVideo } = getThumbnail(text);
    let listItem = document.createElement("li"),
        listDiv = document.createElement("div"),
        deleteDiv = document.createElement("div"),
        editDiv = document.createElement("div"),
        contentDiv = document.createElement("div"),
        editImage = document.createElement("img");
    editImage.setAttribute("data-toggle", "tooltip");
    editImage.setAttribute("data-placement", "bottom");
    editImage.setAttribute("title", "Click to edit the text entry!");
    let deleteImage = document.createElement("img");
    deleteImage.setAttribute("data-toggle", "tooltip");
    deleteImage.setAttribute("data-placement", "bottom");
    deleteImage.setAttribute("title", "Click to delete the text entry!");
    let listPara = document.createElement("p");
    let listText = document.createTextNode(text);
    listPara.setAttribute("data-toggle", "tooltip");
    listPara.setAttribute("data-placement", "bottom");
    listPara.setAttribute("title", "Click to copy the below text:\n" + text);
    let popupLink = document.createElement('a');
    let imagePopup = document.createElement('img');
    prevText = text;

    if (imageUrl.length > 0) {
        console.log("Image URL found")
        imagePopup.src = imageUrl;
        if (!isVideo) {
            imagePopup.style.width = '32px'
            imagePopup.style.height = '32px';

        }
        else {
            imagePopup.style['margin-left'] = '0px';
            imagePopup.style['margin-top'] = '0px';
            listPara.style['max-width'] = '12rem'
        }
        popupLink.href = sourceUrl;
        popupLink.target = '_blank';
        popupLink.appendChild(imagePopup);
        listDiv.appendChild(popupLink);

    }

    listPara.appendChild(listText)
    listDiv.appendChild(listPara);
    listPara.addEventListener('focusout', (event) => {
        event.target.setAttribute("contenteditable", "false");
        newText = event.target.textContent;
        console.log(newText);
        chrome.storage.sync.get(['list'], clipboard => {
            let list = clipboard.list;
            let index = list.indexOf(prevText);
            list[index] = newText;
            chrome.storage.sync.set({ 'list': list }, () => { console.log("Text updated"); });
        })
    })
    listDiv.classList.add("list-div");
    contentDiv.appendChild(listDiv);
    editImage.src = './images/edit.png';
    editImage.classList.add("delete");
    deleteImage.src = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-1432400-1211078.png'
    deleteImage.classList.add("delete")

    editDiv.appendChild(editImage);
    contentDiv.appendChild(editDiv);
    deleteDiv.appendChild(deleteImage);
    contentDiv.appendChild(deleteDiv);
    contentDiv.classList.add("content");
    listItem.appendChild(contentDiv);

    _clipboardList.appendChild(listItem);
    editImage.addEventListener('click', (event) => {
        console.log("Edit button clicked");
        prevText = listPara.textContent;
        console.log(prevText);
        listPara.setAttribute("contenteditable", "true");
        listPara.focus();
    })
    deleteImage.addEventListener('click', (event) => {
        console.log("Delete clicked");
        chrome.storage.sync.get(['list'], clipboard => {
            let list = clipboard.list;
            let index = list.indexOf(text);
            list.splice(index, 1);
            _clipboardList.innerHTML = "";
            chrome.storage.sync.set({ 'list': list }, () => getClipboardText());
        })
    })
    
    
    
    listDiv.addEventListener('click', (event) => {
        let { textContent } = event.target;
        navigator.clipboard.writeText(textContent)
            .then(() => {
                console.log(`Text saved to clipboard`);
                chrome.storage.sync.get(['list'], clipboard => {
                    let list = clipboard.list;
                    let index = list.indexOf(textContent);
                    if (index !== -1)
                        list.splice(index, 1);

                    list.unshift(textContent);
                    _clipboardList.innerHTML = "";
                    chrome.storage.sync.set({ 'list': list }, () => getClipboardText());
                });
            });
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    });
}


let sb= document.getElementById('searchbar');
sb.addEventListener('keyup', (event)=>{
    let searchvalue = document.getElementById('searchbar').value;
    searchvalue=searchvalue.toLowerCase();
    search_str = searchvalue;
    if (!search_str == ""){
        _flag = 1;
        while (_clipboardList.firstChild) {
        _clipboardList.removeChild(_clipboardList.lastChild);}
        getClipboardText();
    }
    else {
        _flag = 0
        while (_clipboardList.firstChild) {
            _clipboardList.removeChild(_clipboardList.lastChild);}
            getClipboardText();
    }

  
})



let clear_all_btn = document.getElementById('clear_all_btn')

clear_all_btn.addEventListener('click', (event) => {
    while (_clipboardList.firstChild) {
        _clipboardList.removeChild(_clipboardList.lastChild);
    }
    chrome.storage.sync.clear();
    document.getElementById('empty-div').classList.remove('hide-div');

}
)



document.getElementById("button").addEventListener("click", toggleTheme);

function toggleTheme() {
    var theme = document.getElementById('theme');
    chrome.storage.sync.get(['themetoggle'], function (result) {
        console.log(result.themetoggle);
        if (result.themetoggle == 0) {
            result.themetoggle = 1;
            theme.setAttribute('href', 'dark.css');
        }
        else {
            result.themetoggle = 0;
        }
        if (result.themetoggle == 0) {
            theme.setAttribute('href', 'light.css');
        }
        else {
            theme.setAttribute('href', 'dark.css');
        }
        chrome.storage.sync.set({ themetoggle: result.themetoggle }, function () {
            if (result.themetoggle == 0) {
                console.log("Using light mode");
            }
            else if (result.themetoggle == 1) {
                console.log("Using dark mode");
            }
        });
    });
}

function getTheme() {
    var theme = document.getElementById('theme');
    var button = document.getElementById('button');
    chrome.storage.sync.get(['themetoggle'], function (result) {
        console.log(result.themetoggle);
        if (result.themetoggle === undefined) {
            theme.setAttribute('href', 'light.css');
            button.checked = false;
            result.themetoggle = 0;
        }
        else if (result.themetoggle == 0) {
            theme.setAttribute('href', 'light.css');
            button.checked = false;
        }
        else {
            theme.setAttribute('href', 'dark.css');
            button.checked = true;
        }
        chrome.storage.sync.set({ themetoggle: result.themetoggle }, function () {
            console.log("Loaded plugin theme");
        });
    });
}

getClipboardText();
getTheme();
