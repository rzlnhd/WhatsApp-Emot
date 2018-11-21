// ==UserScript==
// @name         WhatsApp Emoticon
// @description  Tools yang digunakan untuk mengubah emoticon menjadi emoji berdasarkan dengan emoKey.
// @copyright    2018, rzlnhd (https://openuserjs.org/users/rzlnhd)
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @icon         https://i.imgur.com/K6tyGmQ.png
// @homepageURL  https://openuserjs.org/scripts/rzlnhd/WhatsApp_Emoticon
// @supportURL   https://openuserjs.org/scripts/rzlnhd/WhatsApp_Emoticon/issues
// @version      1.2
// @date         2018-11-21
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
var emoti = [" :)"," :D"," <:3"," <3"," (/)"," :%"," :z"," :p"," :\')"," :\'D"," :L"," :g"," :^"," :v"," :@"," :o"],
	emoji = ["🙂","😁","😍","❤","🙏","👏","✅","😋","😂","🤣","💪","👻","👆","👇","😡","😱"],version = "v1.2";
/* First Function */
var timer = setInterval(general,1000);
function general(){
    if(document.getElementsByClassName("swl8g")[0] != null){
		document.addEventListener("click", initListener);
		console.log("WhatsApp Emoticon "+version+" - Free Emoticon!");
		console.log("Tambahkan spasi sebelum menuliskan emoKey.");
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
	var i,text = this.innerText,pos,j,
        emo=this.getElementsByTagName("img")[0];
	for(i=0;i<emoti.length;i++){
		if(text.includes(emoti[i])){
			text=text.replace(emoti[i],emoji[i]);
            j=i;
		}
    }
	if(this.innerText!=text){
		pos=getCaretPosition(this)
		this.innerText=text;
		setCaretPosition(this,pos,j);
	} else if(emo!=null){
        this.innerText+=emo.getAttributeNode("alt").value;
        eBack(this);
    }
}
/*=====================================
   Utilities Function : Get and Set Cursor Position
=====================================*/
/* Get Cursor Position */
function getCaretPosition(el) {
  var caretPos = 0,
    sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == el) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == el) {
      var tempEl = document.createElement("span");
      el.insertBefore(tempEl, el.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}
/* Set Cursor Position */
function setCaretPosition(el, p, i){
	var range,sel;
	if(i==2||i==4||i==8||i==9){p-=2;} else{p-=1;}
	if(document.createRange){
        range = document.createRange();
        sel = window.getSelection();
		range.setStart(el.childNodes[0], p);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
	}
}
/* Set Cursor At The End */
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
