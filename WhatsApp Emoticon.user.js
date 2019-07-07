// ==UserScript==
// @name         WhatsApp Emoticon
// @description  Tools yang digunakan untuk mengubah emoticon menjadi emoji berdasarkan dengan emoKey.
// @copyright    2018, rzlnhd (https://openuserjs.org/users/rzlnhd)
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @icon         https://i.imgur.com/K6tyGmQ.png
// @homepageURL  https://openuserjs.org/scripts/rzlnhd/WhatsApp_Emoticon
// @supportURL   https://openuserjs.org/scripts/rzlnhd/WhatsApp_Emoticon/issues
// @version      1.2.4
// @date         2019-07-07
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
var emoti = [" :)"," :D"," <:3"," <3"," (/)"," :%"," :z"," :p"," :\')"," :\'D"," :L"," :g"," :^"," :v"," :@"," :o"," ^^"],
	emoji = ["🙂","😁","😍","❤","🙏","👏","✅","😋","😂","🤣","💪","👻","👆","👇","😡","😱","😊"],version = "v1.2.4",
    i_alt = ["❤","☺"],
    p_def=1;
/* First Function */
var timer = setInterval(general,1000);
function general(){
	if(document.getElementsByClassName("_1uESL")[0] != null){
		document.addEventListener("click", initListener);
		document.addEventListener("click", getPdef);
		console.log("WhatsApp Emoticon "+version+" - Free Emoticon!");
		console.log("Tambahkan spasi sebelum menuliskan emoKey.");
		clearInterval(timer);
	}
}
/*=====================================
   Initial Function : Set Listener
=====================================*/
function initListener(){
	var obj=document.getElementsByClassName("_3u328")[0];
	if(obj!=null){obj.addEventListener("input", eEmoji)};
}
function getPdef(){
	var obj=document.getElementsByClassName("_3u328")[0];
	p_def = getCaretPosition(obj);
}
/*=====================================
   Main Function : Change Emoticon to Emoji.
=====================================*/
function eEmoji(e){
	var i,text = this.innerText,html = this.innerHTML,pos,j,
	    emo=this.getElementsByTagName("img");
	for(i=0;i<emoti.length;i++){
		if(text.includes(emoti[i])){
			text=text.replace(emoti[i],emoji[i]);
			j=i;
		}
	}
	pos=getCaretPosition(this);
	if((pos!=0 && pos!=p_def) || (pos==0 && text.length==0)){p_def=pos;} else if(pos==0 && text.length!=0){pos=p_def;}
	if(emo.length!=0){
		j=-2;
		for(i=0;i<i_alt.length;i++){
			if(emo[0].getAttributeNode("alt").value===i_alt[i]){
				j=-1;
			}
		}
		this.innerText=html.replace(emo[0].outerHTML,emo[0].getAttributeNode("alt").value);
		setCaretPosition(this,pos,j);
	} else if(this.innerText!=text){
		this.innerText=text;
		setCaretPosition(this,pos,j);
	}
}
/*=====================================
   Utilities Function : Get and Set Cursor Position
=====================================*/
/* Get Cursor Position */
function getCaretPosition(el) {
	var caretPos = 0, sel, range;
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
	if(i==2||i==4||i==8||i==9){p-=2;}
	else if(i==-1){p+=1;p_def=p;}
	else if(i==-2){p+=2;p_def=p;}
	else{p-=1;}
	if(document.createRange){
		range = document.createRange();
		sel = window.getSelection();
		range.setStart(el.childNodes[0], p);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
	}
}
