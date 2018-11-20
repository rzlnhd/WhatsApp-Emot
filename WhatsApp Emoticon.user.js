// ==UserScript==
// @name         WhatsApp Emoticon
// @description  Tools yang digunakan untuk mengubah emoticon menjadi emoji.
// @copyright    2018, rzlnhd (https://openuserjs.org/users/rzlnhd)
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @icon         https://i.imgur.com/K6tyGmQ.png
// @homepageURL  https://openuserjs.org/scripts/rzlnhd/WhatsApp_Emoticon
// @supportURL   https://openuserjs.org/scripts/rzlnhd/WhatsApp_Emoticon/issues
// @version      1.0
// @date         2018-11-20
// @author       Rizal Nurhidayat
// @match        https://web.whatsapp.com/
// @grant        none
// @updateURL    https://openuserjs.org/meta/rzlnhd/WhatsApp_Emoticon.meta.js
// @downloadURL  https://openuserjs.org/install/rzlnhd/WhatsApp_Emoticon.user.js
// ==/UserScript==

// ==OpenUserJS==
// @author       rzlnhd
// ==/OpenUserJS==

/* Global Variables */
var emoti = [" :)"," :D"," :<3"," <3"," (/)"," :%"," :z"," :p"," :\')"," :'D"," :L"," :g"," :p"," :^"," :v"," :@"," :o"],
	emoji = ["🙂","😁","😍","❤","🙏","👏","✅","😋","😂","🤣","💪","👻","👆","👇","😡","😱"],version = "v1.0";
/* First Function */
var timer = setInterval(general,1000);
function general(){
    if(document.getElementsByClassName("swl8g")[0] != null){
		document.addEventListener("click", initListener);
		console.log("WhatsApp Emoticon "+version+" - Free Emoticon!");
		clearInterval(timer);
	}
}
/*=====================================
   Initial Function : Set Listener
=====================================*/
function initListener(){
	var obj=document.getElementsByClassName("_2S1VP")[0];
	if(obj!=null){obj.addEventListener("input", eEmoji)};
}
/*=====================================
   Main Function : Change Emoticon to Emoji.
=====================================*/
function eEmoji(e){
	var i,text = this.innerText;
	for(i=0;i<emoti.length;i++){
		if(text.includes(emoti[i])){
			text=text.replace(emoti[i],emoji[i]);
		}
	}	
	if(this.innerText!=text){
		this.innerText=text;
		eBack(this);
	}
}
/*=====================================
   Utilities Function : Set Cursor Position
=====================================*/
function eBack(obj){
	var range,selection;
	if(document.createRange){
        range = document.createRange();
        range.selectNodeContents(obj);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
