class Command {
	constructor(id, commands, label, url, prefix = '', suffix = '', isSpecial = false, isShortcut = false, hasCallback = false, callbackURLPrefix = "", callbackURLSufix = "", decodeJSON = () => { }) {
		this.id = id;
		this.commands = commands;
		this.label = label;
		this.url = url;
		this.prefix = prefix;
		this.suffix = suffix;
		this.isSpecial = isSpecial;
		this.isShortcut = isShortcut;
		this.hasCallback = hasCallback;
		// this.callbackScript = "none";
		this.callbackURLPrefix = callbackURLPrefix;
		this.callbackURLSufix = callbackURLSufix;
		this.decodeJSON = decodeJSON;
	}

	makeUrl(term) {
		return this.url + (this.isSpecial || this.isShortcut ? "" : this.prefix) + (this.isShortcut ? "" : term) + this.suffix;
	}

	makePlaceholder() {
		// let result;
		switch (this.label) {
			case 'Torrents':
				return '# Search Torrents';

			case 'Reddit':
				return '# Open a subreddit';

			case 'Zamunda Films', 'Zamunda Games':
				return '# Seach for ' + this.label;

			default:
				return '# Search with ' + this.label;
		}
	}

	getCallbackdata(value) {
		if (!this.hasCallback) {
			return null;
		}

		var xhr = new XMLHttpRequest();

		var url = "https://cors-anywhere.herokuapp.com/" + this.callbackURLPrefix + value + this.callbackURLSufix;
		// console.log(url);


		xhr.open("GET", url);
		xhr.onload = xhr.onerror = () => {
			let rawValue = xhr.responseText;
			// console.log(rawValue);
			let array = this.decodeJSON(rawValue);

			let list = "";
			array.forEach(element => {
				list += "<option>" + element + "</option>";
			});
			document.getElementById("options").innerHTML = list;

			// autocompletion = new autoComplete({
			// 	data: {
			// 		src: array,
			// 	},
			// 	highlight: true,
			// 	maxResults: 10,
			// 	onSelection: feedback => {
			// 		console.log(feedback);
			// 	}
			// });

			// autocomplete(search, this.decodeJSON(rawValue));
		};

		if (/^POST/i.test("GET")) {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		xhr.send();
	}
}

commands = [
<<<<<<< HEAD
	new Command(0, ['', '/d', '/д'], 'DuckDuckGo', 'https://duckduckgo.com/', '?q=', "", false, false, true,
=======
	new Command(0, ['', '/d'], 'DuckDuckGo', 'https://duckduckgo.com/', '?q=', "", false, false, true,
>>>>>>> refs/remotes/origin/master
		"https://duckduckgo.com/ac/?q=", "&kl=wt-wt",
		value => {
			// console.log(value);
			let array = JSON.parse(value);
			// console.log(array);
			array = array.map(element => element.phrase);
			// console.log(array);
			return array;
		}),
<<<<<<< HEAD
	new Command(1, ['/g', '/г'], 'Google', 'https://google.com/', 'search?q=', "", false, false, true,
=======
	new Command(1, ['/g'], 'Google', 'https://google.com/', 'search?q=', "", false, false, true,
>>>>>>> refs/remotes/origin/master
		"https://www.google.com/complete/search?q=",
		"&cp=10&client=psy-ab&xssi=t&gs_ri=gws-wiz&hl=en-BG&authuser=0&psi=A4KtXrKPGuidlwSAyp2YAg.1588429313922",
		value => {
			// console.log(value.substring(5));
			value = value.substring(5);//.split[")]}'"];
			let array = eval(value);
			array = array[0].map(element => element[0]);
			console.log(array);
			return array;
			// autocomplete(search, array);
		}),
	new Command(2, ['/t'], 'Torrents', 'https://torrentz2.eu/', 'search?f=', "", false, false, true,
		"https://torrentz2.eu/suggestions/",
		"",
		value => {
			let array = eval(value);
			array = array[1];
			console.log(array);
			return array;
		}),
	new Command(3, ['/x'], '1337x', 'https://1337x.to/', 'search/', '/1/'),
	new Command(4, ['/y', '/yt'], 'YouTube', 'https://www.youtube.com/', 'results?search_query=', "", false, false, true,
		"http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=",
		"",
		value => {
			let array = eval(value);
			array = array[1];
			console.log(array);
			return array;
		}),
	new Command(5, ['r/'], 'Reddit', 'https://www.reddit.com/', 'r/', '/', true, false, true,
		"https://oauth.reddit.com/api/subreddit_autocomplete_v2.json?query=",
		"&raw_json=1&gilding_detail=1",
		value => {
			console.log(value);
		}),
	new Command(6, ['/z'], 'Zamunda', 'https://www.zamunda.net/', 'bananas?c42=1&c25=1&c35=1&c20=1&c19=1&c5=1&c24=1&c7=1&c33=1&c4=1&c21=1&c1=1&c22=1&search=', '&gotonext=1&incldead=&field=name'),
	new Command(7, ['/zf'], 'Zamunda Films', 'https://www.zamunda.net/', 'bananas?c42=1&c25=1&c35=1&c20=1&c19=1&c5=1&c24=1&c7=1&c33=1&search=', '&gotonext=1&incldead=&field=name'),
	new Command(8, ['/zg'], 'Zamunda Games', 'https://www.zamunda.net/', 'bananas?c4=1&c21=1&c1=1&c22=1&search=', '&gotonext=1&incldead=&field=name'),
	new Command(9, ['shk'], 'Shkolo', 'https://app.shkolo.bg/dashboard', '', '', true, true),
	new Command(10, ['spme'], 'Spotify stats', 'https://spotify.me', '', '', true, true),
	new Command(11, ['/s'], 'Stack Overflow', 'https://www.stackoverflow.com/', 'search?q='),
	new Command(12, ['rs'], 'RipSave', 'https://ripsave.com/ ', '', '', true, true),
	new Command(13, ['xpi'], 'Firefox XPI', 'http://reo.free.bg/xpi/', '', '', true, true),
	new Command(14, ['fmi'], 'FMI Exams', 'https://www.fmi.uni-sofia.bg/bg/sample-exams-view', '', '', true, true),
<<<<<<< HEAD
	new Command(15, ['/wa'], 'Wolfram Alpha', 'https://www.wolframalpha.com/', 'input/?i=', '', false, false)
=======
>>>>>>> refs/remotes/origin/master
];

var command = commands[0];

// polyfill(document);

search.addEventListener('keyup', (e) => {
	var value = search.value;
	if (command.hasCallback && e.keyCode != 38 && e.keyCode != 40) {
		// console.log(value);
		command.getCallbackdata(value);
	}

	// if (e.keyCode == 13 || e.which == 13) {
	// 	if (value.indexOf('.') > 0) {
	// 		// is this still needed?  smart
	// 		// i wish i knew; proabb; y no
	// 	}
	// } else 
	if (value[0] == '/' && value[value.length - 1] == ' ') {
		value = value.trim();
		for (var i = 0; i < commands.length; i++) {
			for (var j = 0; j < commands[i].commands.length; j++) {
				// if (commands[i].label == "Reddit") {
					// console.log(value);
					// console.log(commands[i].commands[j]);
				// }

				if (value == commands[i].commands[j]) {
					command = commands[i];
					hideHelp();
					icon.className = command.icon;
					search.value = '';
					search.setAttribute('name', command.prefix);
					search.setAttribute('placeholder', command.makePlaceholder());
					break;
				}
			}
		}
	} else if (
		value.length < 5 &&
		(specCom = commands.filter((com) => com.isSpecial == true && com.commands.filter((com) => com==value).length>0)).length > 0
	) {
		// console.log(specCom);
		command = commands[specCom[0].id];
		hideHelp();
		icon.className = command.icon;
		search.setAttribute('placeholder', command.makePlaceholder());
	} else if (value.startsWith('http://') || value.startsWith('https://')) {
		command = { makeUrl: (value) => value };
		hideHelp();
	} else if (value.endsWith(".com") || value.endsWith(".org") || value.endsWith(".net") || value.endsWith(".bg")) {
		command = { makeUrl: (value) => "http://" + value };
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
	} else if (value.length < 20 && value.toLowerCase().startsWith("accent ") && (index = accents.indexOf(value.toLowerCase().substring(7))) !== -1) {
		setAccents(value.substring(7));
		// } else if (!isDimo2 && value == "dimo2.jpg") {
		// 	// isDimo2 = true;
		// 	// logo.src = "assets/dimo2.jpg";
		// 	console.log(value + " " + isDimo2);

		// 	changeTo("dimo2.jpg");
		// } else if (isDimo2 && value != "dimo2.jpg") {
		// 	// isDimo2 = false;
		// 	// logo.src = "assets/logo.png";
		// 	console.log(value + " " + isDimo2);

		// 	changeTo("logo");
	} else if (value == "dimo2") {
		changeTo("dimo2.jpg");
	} else if (value == "logo") {
		changeTo("logo");
	} else if (value == "wthon") {
		weather.style.opacity = 0.66;
	} else if (value == "wthoff") {
		weather.style.opacity = 0;
	} else if (value == "shrink") {
		shrink();
	} else if (value == "unshrink") {
		unshrink();
	} else if (value == "freeze") {
		// delay = 10000;
		animationRunning = false;
	} else if (value == "unfreeze") {
		// delay = 50;
		animationRunning = true;
	} else if (e.keyCode == 8 && value.length == 0) {
		if (command.isSpecial) {
			command = commands[0];
			search.setAttribute('name', command.prefix);
			search.setAttribute('placeholder', command.makePlaceholder());
			icon.className = command.icon;
		}
		showHelp();
	}
});

search.addEventListener('keydown', (e) => {
	var value = search.value;
	var key = e.keyCode || e.which;
	if (key == 13) {
		window.open(command.makeUrl(encodeURIComponent(value)), '_self');
	}

	if (key == 0 || key == 229) {
		key = isBackspace(value) ? 8 : 0;
	}

	// if (key == 8) {
	// 	if (value == '') { // && command.icon != commands[0].icon) {
	// 		command = commands[0];
	// 		hideHelp();
	// 		icon.className = command.icon;
	// 		search.value = '';
	// 		search.setAttribute('name', command.prefix);
	// 		search.setAttribute('placeholder', command.makePlaceholder());
	// 	}

	// }

	// if (value.length == 0 && String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
	// 	help.style['max-height'] = '100px';
	// }
});

var hideHelp = () => {
	// console.log(help.style);
	help.style.opacity = 0;
	// help.style.transform = "scale (0.0)";
	help.style['max-height'] = '0px';
	// help.style.padding = "0";
	help.style.margin = "0 auto 0 auto";
	// help.style.transform = "scaleY(0.1)";
	form.style.marginBottom = 0;
	// help.style.display = "none";
}

var showHelp = () => {
	help.style.opacity = 1;
	// help.style.transform = "scale (0.0)";
	help.style['max-height'] = '100px';
	// help.style.padding = "7.5px 7.5px 10px 7.5px";
	help.style.margin = "0 auto 3% auto";
	// help.style.transform = "scaleY(1)";
	form.style.marginBottom = "2.5%";
	// help.style.display = "inherit";
}

var prevWord = '';
var isBackspace = (val) => {
	prevWord = val;
	var bool = val && val.length < prevWord.length;
	return bool;
}

// transitionsInit();
// logo.style.transform = "scale(0.0);";
// document.getElementsByTagName("canvas")[1].style="max-height: 150px";
