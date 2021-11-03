
![icon](https://github.com/lalit10/SimplyClip/blob/main/images/paper-clip_32.png)

![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m789313708-ea25af592e8a7a84c009055e)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub issues](https://img.shields.io/github/issues/lalit10/SimplyClip)
![Test Cases](https://img.shields.io/badge/tests-passing-green)
![GitHub contributors](https://img.shields.io/github/contributors/lalit10/SimplyClip)
![GitHub pull requests](https://img.shields.io/github/issues-pr/lalit10/SimplyClip)
[![Build Status](https://app.travis-ci.com/lalit10/SimplyClip.svg?branch=main)](https://app.travis-ci.com/lalit10/SimplyClip)
[![Coverage Status](https://coveralls.io/repos/github/lalit10/SimplyClip/badge.svg?branch=main)](https://coveralls.io/github/lalit10/SimplyClip?branch=main)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.5542732.svg)](https://doi.org/10.5281/zenodo.5542732)

# SimplyClipX

<placeholder builds>
<placeholder doi>
<placeholder tests>
 

> Don’t work longer hours, instead make the hours worth more – focus your efforts to get more done in the same period. - Henry Ford


SimplyClipX is an extension for chromium based browsers which enables users to have a simple and convenient place to manage their clipboard.
    
Have multiple things to copy and keep track of? SimplyClipX is here to help you out.

- Copy any text, image or link from a web page.
- Keyboard shortcuts to paste the top 10 items in your clipboard (To be implemented in future).
- Search through the list of everything that you've copied.
- Unlimited focus!
 
<placeholder UI-gif>
    

<!-- https://user-images.githubusercontent.com/11155124/135507262-f26999c1-83b6-4225-9073-6b654ff6d7c0.mp4 -->
 

## Getting started

Add the Simply Clip Extension on to your Chrome browser.
<placeholder theme-switch-gif>
Simply Clip would let you have all your snippets at one place.

## Welcome to the Dark Side

Tired of the old and vanilla white background? Just toggle the switch and enjoy the power of the Dark side!
<placeholder theme-switch-gif>

     
- Ability to manage what slection you want to keep or get rid of
- Chrome Extension popup to manage all your snippets in one streamlined window
- No more switching tabs, say no to all distractions!!

## Setting up the Extension

1.  Get the repsitory using any of the below two methords :
    - ![Download](https://github.com/lalit10/SimplyClip/blob/main/Docs/images/download-2.png) the ***[repository](https://github.com/lalit10/SimplyClip)*** using Code > Download Zip on our project github page.
    - Clone the reporitory using  ***[GIT](https://git-scm.com)*** 
    ```
    git clone https://github.com/lalit10/SimplyClip
    ```
1. Manually install Entension using below steps.
    - Enable the developer mode from Chrome > Settings > extension.
    - Click on ***load Unpacked*** button and select the root folder of this repository.
    - Enable the chrome extension. 
![Extension](https://github.com/lalit10/SimplyClip/blob/main/Docs/images/Extensions.png)

## Languages

- JavaScript
- HTML
- CSS

## Software Requirements

- Node.js
- NPM

## IDE 

- IDE : [VSCode](https://code.visualstudio.com/)

- Code Style Formatter Extension: [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

- Code Syntax Checker Extension : [Eslint](https://https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Vscode plugin.

VS Code uses js-beautify internally, but it lacks the ability to modify the style you wish to use. This extension enables running js-beautify in VS Code, AND honouring any .jsbeautifyrc file in the open file's path tree to load your code styling. Run with F1 Beautify (to beautify a selection) or F1 Beautify file.

## Style Checker and Analyzer 

- Javascript Standard Style is style guide, linter, and formatter for Javascript and styling means ranking the importance of code clarity.
- `npx standard --fix ` is used to fix the the style 

## Code Formatter 

### Prettier 
- Prettier is an opinionated code formatter which will format your code in structured way.
- `npx prettier --write .` to check the errors in code formating
- `npx prettier --check .` to check the errors in code formatting but only checks that files are already formatted, rather than overwriting them.
prettier --write and prettier --check are the most common ways to run Prettier

## Syntax Checker 

### Lint
- Linting is the automated checking of your source code for programmatic and syntax errors.
- `npm run lint` to check the linter to check errors in code formatting in the code.


## Use Case 
* ***Students***: Students and Research grads can take out snippets from text for easy reference later. We as grad students recently found ourselves in a position where we had to reference a lot of text snippets while recognizing reuses in research papers, SimplyClip does wonders for speeding up similar workflows.

* ***Professionals/ Casual Users:***: It’s one issue to fill a repetitive and boring form. It’s an entirely another when we fill multiple of such forms with questions with repeating answers. SimplyClip fits really well in such a case where simple text clips can be saved and reused saving time and effort.

## Why
While working on finding reuse we spent significant amount of time searching and saving text snippets for further evaluation.Such a repetitive workflow sparked an idea of a clipboard workspace to manage all the recent snippets we have collected while researching.This in turn lead to the development of SimplyClip, in which not only clipboard text is saved, but can also be edited and deleted.Future development pipeline includes cross browser compatibility, exporting and cloud functionalities.

## Functions Descriptions
#### 1. Copying to the extension clipboard :
Any text copied from the browser page automatically gets copied to the extension's clipboard (given the URL has access to the system clipboard).
#### 2. Copying to the system clipboard :
User can select the text chunk to copy from the extension clipboard by simply clicking on the text entry. The entry automatically gets copied into the system clipboard.
#### 3. Editing the extension clipboard :
User is even allowed to edit the text entry copied to the extension clipboard. The user can edit the entry by clicking on the pencil icon and edit the text entry. Once edited, the entry gets saved automatically on clicking anywhere outside the focus of the text entry.

## Troubleshooting
1) If the text doesn't get copied, please make sure that the page has the permission to access and modify the system clipboard.
2) When loading the extension for the first time, reload the pages in order to allow the URLs to prompt for permissions to access the system clipboard.
3) If none of the above steps work, consider reloading the extension and all the browser pages.
4) If the issue still persists, please consider writing us at simplyclipcedev@gmail.com and we will get back to you as soon as possible.
5) You're also free to report a bug in our repository and clearly stating the issue that you're facing. Please make sure to follow the guidelines mentioned in CONTRIBUTING.md

## Roadmap
 
 ![SimplyClip Project Pipeline](https://user-images.githubusercontent.com/11155124/135507724-86cb9b93-e0c5-4188-8688-7f12ff4c6d96.png)


## Contributors
---
<table>
  <tr>
    <td align="center"><a href="https://github.com/Pratyush1184"><img src="https://avatars.githubusercontent.com/u/20305094?v=4" width="75px;" alt=""/><br /><sub><b>Pratyush Vaidya</b></sub></a></td>
    <td align="center"><a href="https://github.com/apande95"><img src="https://avatars.githubusercontent.com/u/11155124?v=4" width="75px;" alt=""/><br /><sub><b>Anirudh Pande</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/lalit10"><img src="https://avatars.githubusercontent.com/u/25183992?v=4" width="75px;" alt=""/><br /><sub><b>Lalit Bangad</b></sub></a><br /></td>
  </tr>
</table>

***Enjoy using SimplyClip. Make sure to follow the page for any new updates!*** 
