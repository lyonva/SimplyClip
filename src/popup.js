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
let LIST_NAME = 'list';

/**
 * Finds all the items in the clipboard Chrome storage and adds them to the list
 * that will be displayed on the UI
 *
 * **Input**
 *  - String of key for chrome storage
 *
 * **Output**
 *  - None
 */
function getClipboardText() {
    chrome.storage.sync.get(["list"], clipboard => {
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
                    addClipboardListItem(item, "list")
                })
            }
                    //searching the text from search bar in clipboard
            else if (typeof list !== undefined && _flag == 1) {
                list.forEach(item => {
                    if (item.toLowerCase().includes(search_str)) {
                        console.log(item);
                        addClipboardListItem(item, "list");
                    }
                });
            }
        }
    });
}

/**
 * Displays thumbnail for web links in clipboard
 *
 * **Input**
 *  - Copied link
 *
 * **Output**
 *  - Appropriate image thumbnail associated with the link
 */
//
function getThumbnail(textContent) {

    // Displays thumbnail if URL is a YouTube video
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
        // Displays thumbnail for all other URL links in the clipboard
        let ind = textContent.indexOf('http');
        if (ind === 0) {
            let url = new URL(textContent);

            if (textContent.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                return {
                    sourceUrl : textContent,
                    imageUrl: textContent,
                    isVideo: false
                }
            } else {
                let ans = "https://favicons.githubusercontent.com/" + url.hostname;
                return {
                    sourceUrl: textContent,
                    imageUrl: ans,
                    isVideo: false
                }
            }
        }
    }
    return {
        sourceUrl: "",
        imageUrl: ""
    }
        ;
}

/**
 * Adds copied items to UI
 *
 * **Input**
 *  - text, The copied text
 *
 * **Output**
 *  - New element is added to UI containing new copied text
 */
function addClipboardListItem(text) {
    let { sourceUrl, imageUrl, isVideo } = getThumbnail(text);

    // Creates HTML elements for each item in the clipboard list
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
            imagePopup.style.width = '60px'
            imagePopup.style.height = '60px';
            imagePopup.style.marginLeft = '5px';
            imagePopup.style.marginTop = '2px';
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
        chrome.storage.sync.get(["list"], clipboard => {
            let list = clipboard.list;
            let index = list.indexOf(prevText);
            list[index] = newText;
            chrome.storage.sync.set({ "list": list }, () => { console.log("Text updated"); });
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

    // Event listener that allows for copied text to be edited
    editImage.addEventListener('click', (event) => {
        console.log("Edit button clicked");
        prevText = listPara.textContent;
        console.log(prevText);
        listPara.setAttribute("contenteditable", "true");
        listPara.focus();
    })

    // Event listener that allows for item to be deleted from clipboard UI list
    deleteImage.addEventListener('click', (event) => {
        console.log("Delete clicked");
        chrome.storage.sync.get(["list"], clipboard => {
            let list = clipboard.list;
            console.log(list);
            let index = list.indexOf(text);
            console.log(index);
            list.splice(index, 1);
            console.log(list);
            _clipboardList.innerHTML = "";
            chrome.storage.sync.set({ "list": list }, function () {
                console.log("Removed element");
            });
            getClipboardText();
        })
    })

    // Event listener that allows text to be copied when it is clicked on UI
    listDiv.addEventListener('click', (event) => {
        let { textContent } = event.target;
        convertContentForClipboard(textContent);
        
        // Show the popup for 3 seconds
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        
        // Push selected item to the top
        console.log(`Text saved to clipboard`);
        chrome.storage.sync.get(["list"], clipboard => {
            let list = clipboard.list;
            let index = list.indexOf(textContent);
            if (index !== -1)
                list.splice(index, 1);

            list.unshift(textContent);
            _clipboardList.innerHTML = "";
            chrome.storage.sync.set({ "list": list }, () => getClipboardText());
        });
        
    });
}

/**
 * For image links, converts them to raw image data before copying to clipboard
 * New data types should also be added here
 *
 * **Input**
 *  - content, The image link to be converted
 *
 * **Output**
 *  - Converted image is added to the clipboard
 */
function convertContentForClipboard(content) {
    if ( content.indexOf('http') == 0 && content.match(/\.(jpeg|jpg|gif|png)$/) != null ) {
        chrome.runtime.sendMessage({event: "pasteImage", content : content});
        fetch( content )
        .then(response => response.blob())
        .then(imageBlob => {
            console.log(imageBlob);
            var data = [new ClipboardItem({[imageBlob.type] : imageBlob})];
            navigator.clipboard.write( data ).then(function () {
                // Success
              }, function (err) {
                // Not supported, paste url
                navigator.clipboard.writeText( content );
              });
        });
    } else {
        navigator.clipboard.writeText( content );
    }
}


/**
 * Reading the search string 
 * This function reads the text entered in the search bar
 * 
 * **Input**
 *  - This function is executed when the user inputs any data in the search bar
 * 
 * **Output**
 *  - sets the search_str as the data entered in the search bar
 *  - The flag is set to 1 if any data is entered in the search bar
 */

 let sb= document.getElementById('searchbar');
 sb.addEventListener('keyup', (event)=>{
     let searchvalue = document.getElementById('searchbar').value.toLowerCase();
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



/**
 * Clears all the elements in clipboard 
 * This function clears the clipboard list displayed in the extention and the chrome storage
 * 
 * **Input**
 *  - This function is executed when the user clicks on Clear all button
 * 
 * **Output**
 *  - the chrome storage is cleared
 *  - All the copied text is removed from the user interface.
 */

 let clear_all_btn = document.getElementById('clear_all_btn')
 
 clear_all_btn.addEventListener('click', (event) => {
     while (_clipboardList.firstChild) {
         _clipboardList.removeChild(_clipboardList.lastChild);
     }
     chrome.storage.sync.set({ "list": [] }, function () {
         console.log("Cleared clipboard");
     });
     document.getElementById('empty-div').classList.remove('hide-div');
 });

/**
 * Adds event listeners to the toggle extension, toggle theme, and save file buttons
 *
 * **Input**
 *  - None
 *
 * **Output**
 *  - 3 event listeners
 */
function createButtonListeners() {
    // Adds event listener to toggle button
    document.getElementById("toggle-button").addEventListener("click", toggleExtension);

    // Adds event listener to dark mode toggle button
    // Connor
    document.getElementById("button").addEventListener("click", toggleTheme);

    // Adds event listener to Save File button
    // Connor
    document.getElementById("savebutton").addEventListener("click", (e) => { saveClipboardList(LIST_NAME) });
}

/**
 * Turns the extension on or off while remembering its previous state
 *
 * **Input**
 *  - None
 *
 * **Output**
 *  - Opposite of the current active state
 */
function toggleExtension() {
    chrome.storage.sync.get("apptoggle", function (result){
        // Invert value
        result = Math.abs(result.apptoggle - 1);
        // Save
        chrome.storage.sync.set({ apptoggle: result }, function () {
            if (result == 0) {
                console.log("Extension is off");
            }
            else if (result == 1) {
                console.log("Extension is on");
            } else {
                console.log("Unknown state: ", result)
            }
            setIcon();
        });
    })
}

/**
 * Toggles the theme to the opposite of the current (light/dark theme)
 *
 * **Input**
 *  - None
 *
 * **Output**
 *  - Changes the user theme preference to the opposite of the current theme
 *
 */
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

/**
 * Gets the theme preference the user has set
 *
 * **Input**
 *  - None
 *
 * **Output**
 *  - Sets the theme based off the last known user setting
 */
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

/**
 * Saves clipboard list as a csv file
 *
 * **Input**
 *  - None
 *
 * **Output**
 *  - Downloads a csv file with all clipboard list contents
 */
function saveClipboardList() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
    var dateTime = date + ' ' + time;
    chrome.storage.sync.get(["list"], clipboard => {
        let list = clipboard.list;
        let result = "";
        if (list !== undefined) {
            for (i = 0; i < list.length; i++){
                result += "\"" + list[i] + "\",\n";
            }
            download("Clipboard " + dateTime + ".csv", result);
        }
    });
}

/**
 * Automates download of clipboard list as a csv file
 * Credit goes to DevonTaig - https://stackoverflow.com/users/1069916/devontaig
 *
 * **Input**
 *  - The name of the resulting csv file
 *  - The text that will be added in the csv file
 *
 * **Output**
 *  - A csv file with all the clipboard list contents
 */
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' +

    encodeURIComponent(text));
    pom.setAttribute('download', filename);

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
}

function setIcon() {
    
    chrome.storage.sync.get(["apptoggle"], toggle => {
        var icon = document.getElementById('toggle-button-icon');
        
        if (toggle.apptoggle == 0) {
            icon.className = "icon_off";
            console.log("xd");
        }
        else if (toggle.apptoggle == 1) {
            icon.className = "icon_on";
        }
        else {
            icon.className = "icon_off";
        }
    })

}

// Runs startup functions
getClipboardText();
getTheme();
createButtonListeners();
setIcon();