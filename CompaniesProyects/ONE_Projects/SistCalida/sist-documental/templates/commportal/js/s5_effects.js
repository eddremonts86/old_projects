var is_ie/*@cc_on = {
  // quirksmode : (document.compatMode=="BackCompat"),
  version : parseFloat(navigator.appVersion.match(/MSIE (.+?);/)[1])
}@*/;

var is_ie;

var x = 0
function transition_effect() {
if (x == 0)
{
transition_big()
}
else if (x == 1)
{
transition_small()
}
}

var big = -342
var small = 0
function transition_big() {
if (big < -17)
{
window.setTimeout('increase()',10);
}
else {
x = 1;
big = -342;
}
}



function transition_small() {
if (small > -342)
{
window.setTimeout('decrease()',1);
}
else {
x = 0;
small = 0;
}
}


function increase() {
document.getElementById("popup_div").style.top = big +'px';
transition_big();
big = big + 25;
}



function decrease() {
document.getElementById("popup_div").style.top = small +'px';
transition_small();
small = small - 35;
}

function show_popup() {
if (is_ie && (is_ie.version < 7))
{ 
document.getElementById("popup_outer").style.height = document.documentElement.clientHeight +'px';
document.getElementById("popup_outer").style.width = document.documentElement.clientWidth +'px';
}
else {
document.getElementById("popup_outer").style.height = 100 +'%';
document.getElementById("popup_outer").style.width = 100 +'%';
}
increase();
}

function show_popup2() {
document.getElementById("s5_button1").style.display = 'block';
document.getElementById("popup_outer2").style.display = 'block';
if (is_ie && (is_ie.version < 7))
{ 
document.getElementById("popup_outer2").style.height = document.documentElement.clientHeight +'px';
document.getElementById("popup_outer2").style.width = document.documentElement.clientWidth +'px';
}
else {
document.getElementById("popup_outer2").style.height = 100 +'%';
document.getElementById("popup_outer2").style.width = 100 +'%';
}
}

function show_popup3() {
document.getElementById("s5_button2").style.display = 'block';
document.getElementById("popup_outer3").style.display = 'block';
if (is_ie && (is_ie.version < 7))
{ 
document.getElementById("popup_outer3").style.height = document.documentElement.clientHeight +'px';
document.getElementById("popup_outer3").style.width = document.documentElement.clientWidth +'px';
}
else {
document.getElementById("popup_outer3").style.height = 100 +'%';
document.getElementById("popup_outer3").style.width = 100 +'%';
}
}


function hide_popup() {
decrease();
document.getElementById("popup_outer").style.height = 0 +'%';

}

function hide_popup2() {
document.getElementById("popup_outer2").style.display = 'none';
}

function hide_popup3() {
document.getElementById("popup_outer3").style.display = 'none';
}



function ie_popup_fix(){
scroll(0,0)
}



function opacity(id, opacStart, opacEnd, millisec) {
	//speed for each frame
	var speed = Math.round(millisec / 100);
	var timer = 0;
	//determine the direction for the blending, if start and end are the same nothing happens
	if(opacStart > opacEnd) {
		for(i = opacStart; i >= opacEnd; i--) {
			setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
			timer++;
		}
	} else if(opacStart < opacEnd) {
		for(i = opacStart; i <= opacEnd; i++)
			{
			setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
			timer++;
		}
	}
}

//change the opacity for different browsers
function changeOpac(opacity, id) {
	var object = document.getElementById(id).style; 
	object.opacity = (opacity / 100);
	object.MozOpacity = (opacity / 100);
	object.KhtmlOpacity = (opacity / 100);
	object.filter = "alpha(opacity=" + opacity + ")";
}

function shiftOpacity(id) {
	//if an element is invisible, make it visible, else make it ivisible
	if(document.getElementById(id).style.top == '-342') {
		opacity(id, 0, 100, 1000);
	} else {
		opacity(id, 100, 0, 1000);
	}
}

function shiftOpacity2(id) {
	//if an element is invisible, make it visible, else make it ivisible
	if(document.getElementById(id).style.height == '0px' || document.getElementById(id).style.height == '0%') {
		document.getElementById(id).style.display = 'block'
		opacity(id, 0, 50, 1000);
		
	} else {
		opacity(id, 50, 0, 1000);
                window.setTimeout('hide_popup()',1100);
		
	}
}



function shiftOpacity1(id) {
//if an element is invisible, make it visible, else make it ivisible
	if(document.getElementById(id).style.display == 'none') {
		opacity(id, 0, 50, 1000);
	} 
	


}



function shiftOpacity3(id) {
//if an element is invisible, make it visible, else make it ivisible
	if(document.getElementById(id).style.display == 'none') {
		opacity(id, 0, 50, 1000);
	} 
	
	if(document.getElementById('popup_outer2').style.display == 'block') {
	
		document.getElementById('s5_button1').style.display = 'none';
		opacity(id, 50, 0, 1000);
        window.setTimeout('hide_popup2()',1100);
	}

}

function s5boxtwo(id) {
//if an element is invisible, make it visible, else make it ivisible
	if(document.getElementById(id).style.display == 'none') {
		opacity(id, 0, 50, 1000);
	} 
	
	if(document.getElementById('popup_outer3').style.display == 'block') {
	
		document.getElementById('s5_button2').style.display = 'none';
		opacity(id, 50, 0, 1000);
        window.setTimeout('hide_popup3()',1100);
	}

}

function blendimage(divid, imageid, imagefile, millisec) {
	var speed = Math.round(millisec / 100);
	var timer = 0;
	
	//set the current image as background
	document.getElementById(divid).style.backgroundImage = "url(" + document.getElementById(imageid).src + ")";
	
	//make image transparent
	changeOpac(0, imageid);
	
	//make new image
	document.getElementById(imageid).src = imagefile;

	//fade in image
	for(i = 0; i <= 100; i++) {
		setTimeout("changeOpac(" + i + ",'" + imageid + "')",(timer * speed));
		timer++;
	}
}

function currentOpac(id, opacEnd, millisec) {
	//standard opacity is 100
	var currentOpac = 100;
	
	//if the element has an opacity set, get it
	if(document.getElementById(id).style.opacity < 100) {
		currentOpac = document.getElementById(id).style.opacity * 100;
	}

	//call for the function that changes the opacity
	opacity(id, currentOpac, opacEnd, millisec)
}




function s5_load_pos() {

var pos6 = 0;
var pos7 = 0;
var pos8 = 0;


 if (document.getElementById("s5_modleft")) {
 pos6 = document.getElementById("s5_modleft").offsetHeight;
 }
 if (document.getElementById("s5_modmiddle")) {
 pos7 = document.getElementById("s5_modmiddle").offsetHeight;
 }
 if (document.getElementById("s5_modright")) {
 pos8 = document.getElementById("s5_modright").offsetHeight;
 }

 
 
 
 if (pos6 >= pos7 && pos6 >= pos8) {
if (document.getElementById("s5_modleft")) {
document.getElementById("s5_modleft").style.height = pos6 + "px";
}
if (document.getElementById("s5_modmiddle")) {
document.getElementById("s5_modmiddle").style.height = ((pos6) - 3) + "px";
}
if (document.getElementById("s5_modright")) {
document.getElementById("s5_modright").style.height = pos6 + "px";
}
}

if (pos7 >= pos6 && pos7 >= pos8) {
if (document.getElementById("s5_modleft")) {
document.getElementById("s5_modleft").style.height = pos7 + "px";
}
if (document.getElementById("s5_modmiddle")) {
document.getElementById("s5_modmiddle").style.height = ((pos7) - 3) + "px";
}
if (document.getElementById("s5_modright")) {
document.getElementById("s5_modright").style.height = pos7 + "px";
}
}

if (pos8 >= pos7 && pos8 >= pos6) {
if (document.getElementById("s5_modleft")) {
document.getElementById("s5_modleft").style.height = pos8 + "px";
}
if (document.getElementById("s5_modmiddle")) {
document.getElementById("s5_modmiddle").style.height = ((pos8) - 3) + "px";
}
if (document.getElementById("s5_modright")) {
document.getElementById("s5_modright").style.height = pos8 + "px";
}
}
}