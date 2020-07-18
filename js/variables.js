//cookies
function setCookie(name,value,secondsOrDays, isDays) {
    var expires = "";
    if (secondsOrDays) {
        var date = new Date();
        date.setTime(date.getTime() + (isDays ? secondsOrDays*24*60*60*1000 : secondsOrDays*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

//bg
document.body.style.background = "none";
var background = document.getElementById("background");
var ctx = background.getContext("2d");
//making the canvas full screen
background.height = window.innerHeight;
background.width = window.innerWidth;
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.fillRect(0, 0, background.width, background.height);

//main
var autocompletion;
var search = document.getElementById('search');
var help = document.getElementById('help');
{
	var browserPrefix;
	navigator.sayswho = (() => {
		var N = navigator.appName, ua = navigator.userAgent, tem;
		var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
		M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
		M = M[0];
		if (M == "Chrome") { browserPrefix = "webkit"; }
		if (M == "Firefox") { browserPrefix = "moz"; }
		if (M == "Safari") { browserPrefix = "webkit"; }
		if (M == "MSIE") { browserPrefix = "ms"; }
	})();

	var style = document.createElement('style');
	document.head.appendChild(style);
	style.sheet.insertRule(`#help {-${browserPrefix}-transition : margin 0.25s ease-in-out, opacity 0.3s ease-in-out, padding 0.3s ease-in-out, transform 0.25s ease-in-out, max-height 0.4s ease-in-out;}`);
	style.sheet.insertRule(`#search-form {-${browserPrefix}-transition : margin 0.25s ease-in-out;}`);
}

var icon = document.getElementById('search-icon');
var form = document.getElementById('search-form');
var logo = document.getElementById('logo');
var root = document.documentElement;
var isDimo2 = false;
var accents = ["red", "green", "blue", "yellow", "white"];
var setAccents = (newColor) => {
	switch (newColor) {

		case "red":
			color = "#660000";
			root.style.setProperty('--search-form-accent', 		'rgba(182, 7, 21, 0.486)	');
			root.style.setProperty('--main-white-color', 		'rgb(169, 169, 169)			');
			root.style.setProperty('--search-block-label',		'rgba(127,127,127,0.15)		');
			root.style.setProperty('--search-wrapper-ul-bg', 	'rgba(94, 6, 43, 0.5)		');
			root.style.setProperty('--quick-wrapper-underline', 'rgb(255, 0, 85)			');
			root.style.setProperty('--search-wrapper-ul-cl', 	'rgb(124, 124, 124)			');
			setCookie("accent", "red", 10*60, false);
			break;

		case "green":
			color = "#006600";
			root.style.setProperty('--search-form-accent', 		'rgba(24, 168, 11, 0.486)	');
			root.style.setProperty('--main-white-color', 		'rgb(169, 169, 169)			');
			root.style.setProperty('--search-block-label', 		'rgba(127,127,127,0.15)		');
			root.style.setProperty('--search-wrapper-ul-bg', 	'rgba(4, 95, 8, 0.5)		');
			root.style.setProperty('--quick-wrapper-underline', 'rgb(56, 230, 14)			');
			root.style.setProperty('--search-wrapper-ul-cl', 	'rgb(124, 124, 124)			');
			setCookie("accent", "green", 10*60, false);
			break;

		case "blue":
			color = "#000066";
			root.style.setProperty('--search-form-accent', 		'rgba(6, 28, 226, 0.486)	');
			root.style.setProperty('--main-white-color', 		'rgb(169, 169, 169)			');
			root.style.setProperty('--search-block-label', 		'rgba(127,127,127,0.15)		');
			root.style.setProperty('--search-wrapper-ul-bg', 	'rgba(5, 11, 95, 0.5)		');
			root.style.setProperty('--quick-wrapper-underline', 'rgb(0, 17, 255)			');
			root.style.setProperty('--search-wrapper-ul-cl', 	'rgb(124, 124, 124)			');
			setCookie("accent", "blue", 10*60, false);
			break;

		case "yellow":
			color = "#666600";
			root.style.setProperty('--search-form-accent', 		'rgba(238, 223, 10, 0.486)	');
			root.style.setProperty('--main-white-color', 		'rgb(169, 169, 169)			');
			root.style.setProperty('--search-block-label', 		'rgba(127,127,127,0.15)		');
			root.style.setProperty('--search-wrapper-ul-bg', 	'rgba(124, 133, 9, 0.5)		');
			root.style.setProperty('--quick-wrapper-underline', 'rgb(251, 255, 0)			');
			root.style.setProperty('--search-wrapper-ul-cl', 	'rgb(124, 124, 124)			');
			setCookie("accent", "yellow", 10*60, false);
			break;

		case "white":
			color = "#666666";
			root.style.setProperty('--search-form-accent', 		'rgba(228, 228, 228, 0.486)	');
			root.style.setProperty('--main-white-color', 		'rgb(2, 0, 0)				');
			root.style.setProperty('--search-block-label', 		'rgba(127,127,127,0.15)		');
			root.style.setProperty('--search-wrapper-ul-bg', 	'rgba(190, 190, 189, 0.5)	');
			root.style.setProperty('--quick-wrapper-underline', 'rgb(255, 255, 255)			');
			root.style.setProperty('--search-wrapper-ul-cl', 	'rgb(124, 124, 124)			');
			setCookie("accent", "white", 10*60, false);
			break;
		/*
			rgba(24, 168, 11, 0.486)
			rgb(169, 169, 169)
			rgba(127,127,127,0.15)
			bg: rgba(4, 95, 8, 0.5)
			rline: rgb(56, 230, 14)
			cl: rgb(124, 124, 124)

			root.style.setProperty('--search-form-accent', 		"rgba(182, 7, 21, 0.486)	");
			root.style.setProperty('--main-white-newColor', 		"rgb(169, 169, 169)			");
			root.style.setProperty('--search-block-label',		"rgba(127,127,127,0.15)		");
			root.style.setProperty('--search-wrapper-ul-bg', 	"rgba(94, 6, 43, 0.5)		");
			root.style.setProperty('--quick-wrapper-underline', "rgb(255, 0, 85)			");
			root.style.setProperty('--search-wrapper-ul-cl', 	"rgb(124, 124, 124)			");
		 */
	}
}


//bg
var font_size = 7.5;
var columns = background.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns * 4; x++) {
    // drops[x] = 1;
    drops[x] = Math.round(Math.random() * (background.height / font_size));
}

var color;
setAccents(getCookie("accent") || "green");
var isRainbow = false;
var isBetterRainbow = false;
var letters = "0123456789ABCDEF";
var randomizeColor = () => {
    clr = "#";
    for (var j = 0; j < 6; j++) {
        clr += letters[(Math.floor(Math.random() * 16))];
    }
    return clr;
}
var animationRunning = true;
// randomizeColor();
// newColor = `#00${randomizeColor().substring(3,5)}00`;
// color = "#006600";
//drawing the characters
var delay = 50;
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
// var japanese = "ノ国需ロヱ楽発ノエロレ階革広事ト受2断か裁回みす況載む型発ヒ族同ちフわ府下ゅぞ";
var japanese = "あいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわゐゑを";

var og = "01";

var array = og.split("");

// browser prefix

/* 
var browserPrefix = "pomiq";

navigator.sayswho = (() => {
    var N = navigator.appName, ua = navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    M = M[0];
    if (M == "Chrome") { browserPrefix = "webkit"; }
    if (M == "Firefox") { browserPrefix = "moz"; }
    if (M == "Safari") { browserPrefix = "webkit"; }
    if (M == "MSIE") { browserPrefix = "ms"; }
})();
 */