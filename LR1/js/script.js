function addtoPL(name, path) {
	localStorage[name] = path; /*додаємо в localStorage шлях до аудіо файлу*/
	window.parent.location.href = window.parent.location.href;
}

function loadAlbum(path) {
	var iframe = document.getElementById('target');
	iframe.setAttribute('src', path);
	sessionStorage["album"] = path;
}

function testListen(path) {
	var audio = document.createElement('audio'); /*створюємо новий audio element*/
	var div = document.getElementById('tracks');
	/*отримуємо доступ до контейнеру з треками*/
	audio.src = path; /*задаємо джерело для відтворення*/
	audio.controls = false;
	/*відключаємо елементи управління аудіо, фактично елемент не буде відображатися*/
	div.appendChild(audio); /*додаємо створений audio елемент контейнеру*/
	audio.addEventListener('timeupdate', function ()
   /*обробник подій, що викликається впродовж всього відтворення аудіо, кожні 250 мс*/ {
		if (audio.currentTime > 10) { audio.pause(); }
		/*перериваємо відтворення після 10 секунд прослуховування*/
	}, false);
	audio.play(); /*початок відтворення аудіо*/
}

function playtrack(track) {
	var b = false;
	for (var i in localStorage) {
		/*в даному циклі знаходимо поточний трек і "запам’ятовуємо" наступний*/
		if (b) { localStorage['next'] = localStorage[i]; break; }
		if (i == track) { b = true; }
	}
	var audio = document.getElementById('audio'); /*отримуємо доступ до елементу audio*/
	audio.src = localStorage[track]; /*задаємо джерело відтворення*/
	audio.controls = true;
	audio.play(); /*починаємо відтворення*/
}

function load() {
	if (sessionStorage["album"] != undefined) {
		loadAlbum(sessionStorage["album"]);
	}
	var audio = document.getElementById('audio');
	/*отримуємо доступ до audio елементу*/
	audio.addEventListener('ended', function ()
   /*додаємо обробник події – завершення поточного відтворення*/ {
		playtrack('next');
		/*ініціюємо відтворення наступного треку з користувацького списку*/
	}, false);
	/*переходимо до завантаження користувацького списку відтворення*/
	var list = document.getElementById('playlist');
	/*отримуємо доступ до списку відтворення*/
	for (var i in localStorage) /*додаємо треки, збережені користувачем*/ {
		var element = document.createElement('li');
		element.setAttribute('class', 'PL');
		element.setAttribute('onclick', "playtrack('" + i + "')");
		element.innerText = i;
		if (i != 'next') {
			list.appendChild(element);
		}
	}
}