var search = document.getElementById('search');
var help = document.getElementById('help');
{
	var browserPrefix;
	navigator.sayswho = (function () {
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
	style.sheet.insertRule(`#help {-${browserPrefix}-transition : margin 0.25s ease-in-out, opacity 0.3s ease-in-out, padding 0.3s ease-in-out, transform 0.25s ease-in-out;}`);
	style.sheet.insertRule(`#search-form {-${browserPrefix}-transition : margin 0.25s ease-in-out;}`);
}

var icon = document.getElementById('search-icon');
var form = document.getElementById('search-form');
var logo = document.getElementById('logo');

class Command {
	constructor(id, command, label, url, prefix = '', suffix = '', isSpecial = false, isShortcut = false) {
		this.id = id;
		this.command = command;
		this.label = label;
		this.url = url;
		this.prefix = prefix;
		this.suffix = suffix;
		this.isSpecial = isSpecial;
		this.isShortcut = isShortcut;
	}

	makeUrl(term) {
		return this.url + (this.isSpecial || this.isShortcut ? "" : this.prefix) + (this.isShortcut ? "" : term) + this.suffix;
	}

	makePlaceholder() {
		let result;
		switch (this.label) {
			case 'Torrents':
				return '# Search Torrents';

			case 'Reddit':
				return '# Open a subreddit';

			case 'Zamunda Films':
			case 'Zamunda Games':
				return '# Seach for ' + this.label;

			default:
				return '# Search with ' + this.label;
		}
	}
}

commands = [
	new Command(0, '', 'DuckDuckGo', 'https://duckduckgo.com/', '?q='),
	new Command(1, '/d', 'DuckDuckGo', 'https://duckduckgo.com/', '?q='),
	new Command(2, '/g', 'Google', 'https://google.com/', 'search?q='),
	new Command(3, '/t', 'Torrents', 'https://torrentz2.eu/', 'search?f='),
	new Command(4, '/x', '1337x', 'https://1337x.to/', 'search/', '/1/'),
	new Command(5, '/y', 'YouTube', 'https://www.youtube.com/', 'results?search_query='),
	new Command(6, '/yt', 'YouTube', 'https://www.youtube.com/', 'results?search_query='),
	new Command(7, 'r/', 'Reddit', 'https://www.reddit.com/', 'r/', '/', true),
	new Command(8, '/z', 'Zamunda', 'https://www.zamunda.net/', 'bananas?c42=1&c25=1&c35=1&c20=1&c19=1&c5=1&c24=1&c7=1&c33=1&c4=1&c21=1&c1=1&c22=1&search=', '&gotonext=1&incldead=&field=name'),
	new Command(9, '/zf', 'Zamunda Films', 'https://www.zamunda.net/', 'bananas?c42=1&c25=1&c35=1&c20=1&c19=1&c5=1&c24=1&c7=1&c33=1&search=', '&gotonext=1&incldead=&field=name'),
	new Command(10, '/zg', 'Zamunda Games', 'https://www.zamunda.net/', 'bananas?c4=1&c21=1&c1=1&c22=1&search=', '&gotonext=1&incldead=&field=name'),
	new Command(11, 'shk', 'Shkolo', 'https://app.shkolo.bg/dashboard', '', '', true, true),
	new Command(12, 'spme', 'Spotify stats', 'https://spotify.me', '', '', true, true),
	new Command(13, '/s', 'Stack Overflow', 'https://www.stackoverflow.com/', 'search?q='),
	new Command(14, 'rs', 'RipSave', 'https://ripsave.com/ ', '', '', true, true),
];

var command = commands[0];

search.addEventListener('keyup', function (e) {
	var value = search.value;
	// if (e.keyCode == 13 || e.which == 13) {
	// 	if (value.indexOf('.') > 0) {
	// 		// is this still needed?  smart
	// 		// i wish i knew; proabb; y no
	// 	}
	// } else 
	if (value[0] == '/' && value[value.length - 1] == ' ') {
		value = value.trim();
		for (var i = 0; i < commands.length; i++) {
			if (value == commands[i].command) {
				command = commands[i];
				hideHelp();
				icon.className = command.icon;
				search.value = '';
				search.setAttribute('name', command.prefix);
				search.setAttribute('placeholder', command.makePlaceholder());
				break;
			}
		}
	} else if (
		value.length < 5 &&
		(specCom = commands.filter((com) => com.isSpecial == true && com.command == value)).length > 0
	) {
		// console.log(specCom);
		command = commands[specCom[0].id];
		hideHelp();
		icon.className = command.icon;
		search.setAttribute('placeholder', command.makePlaceholder());
	} else if (value.startsWith('http://') || value.startsWith('https://')) {
		command = { makeUrl: (value) => value };
		hideHelp();
	} else if (value.toLowerCase() == "rainbow") {
		isRainbow = true;
	} else if (isRainbow && value.toLowerCase() != "rainbow") {
		isRainbow = false;
	} else if (value.toLowerCase() == "betterrainbow") {
		isBetterRainbow = true;
	} else if (isBetterRainbow && value.toLowerCase() != "betterrainbow") {
		isBetterRainbow = false;
	} else if (value.toLowerCase().startsWith("color ") && value.length == 12) {
		color = "#" + value.substring(6, 12);
	} else if (value == "rrr") {
		color = randomizeColor();
	} else if (value == "dimo2.jpg") {
		logo.src = "assets/dimo2.jpg";
	} else if (value != "dimo2.jpg" && logo.src.includes("dimo2")) {
		logo.src = "assets/logo.png";
	} else if (value == "wthon") {
		weather.style.opacity = 0.66;
	} else if (value == "wthoff") {
		weather.style.opacity = 0;
	} else if (e.keyCode == 8 && value.length == 0) {
		showHelp();
	}
});

search.addEventListener('keydown', function (e) {
	var value = search.value;
	var key = e.keyCode || e.which;
	if (key == 13) {
		window.open(command.makeUrl(value), '_self');
	}

	if (key == 0 || key == 229) {
		key = isBackspace(value) ? 8 : 0;
	}

	if (key == 8) {
		if (value == '' && command.icon != commands[0].icon) {
			command = commands[0];
			hideHelp();
			icon.className = command.icon;
			search.value = '';
			search.setAttribute('name', command.prefix);
			search.setAttribute('placeholder', command.makePlaceholder());
			// alert(command.makePlaceholder());
		}

	}

	if (value.length == 0 && String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
		help.style['max-height'] = '100px';
		// hideHelp();
	}
});

function hideHelp() {
	// console.log(help.style);
	help.style.opacity = 0;
	// help.style.transform = "scale (0.0)";
	// help.style.height = "10px";
	help.style.padding = "0";
	help.style.margin = "0 auto 0 auto";
	form.style.marginBottom = 0;
}

function showHelp() {
	help.style.opacity = 1;
	// help.style.transform = "scale (0.0)";
	// help.style.height = "100%";
	help.style.padding = "7.5px 7.5px 10px 7.5px";
	help.style.margin = "0 auto 3% auto";
	form.style.marginBottom = "2.5%";
}

var prevWord = '';
function isBackspace(val) {
	prevWord = val;
	var bool = val && val.length < prevWord.length;
	return bool;
}
