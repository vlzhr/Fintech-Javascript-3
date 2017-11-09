function throttle(callback, time) {
	let isPaused = false;
	function manager() {
	    if (!(isPaused)) {
	   		callback.apply(this, arguments);
	    	isPaused = true;
		    setTimeout(function() {
			    isPaused = false;
		    }, time);
		}
	}
	return manager;
}

function addWaitAsk() {
	console.log("please wait");
	document.querySelector(".wait").removeAttribute("hidden");
}

function makeGetRequest(url, successCallback, errorCallback) {
	addWaitAsk();
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			const error = new Error('Ошибка ' + xhr.status);
			error.code = xhr.statusText;
			errorCallback(error);
		} else {
			successCallback(xhr.responseText);
		}
	};
	xhr.send();
}

function repTemplate (rep) {
	const card = document.createElement("div");

	card.classList.add("card");
	card.innerHTML = `
		<a href="${rep.git_url}"><h2>${rep.name}</h2></a>
		<p>${rep.description}</p>
		<p>created at ${rep.created_at.split("T")[0]}</p>
		<p>updated at ${rep.updated_at.split("T")[0]}</p>
	`;

	return card;
}

function drawReps(reps) {
	document.querySelector(".wait").hidden = true;
	for (let rep of reps) {
		const card = repTemplate(rep);
		document.querySelector(".reps").appendChild(card);
	}
}

step = 1;

function getReps () {
	const link = "https://api.github.com/orgs/facebook/repos?page=" + step;
	makeGetRequest(link, (request) => {
		let data;
		try {
			data = JSON.parse(request)
		} catch (err) {
			console.error(new Error('Ошибка при чтении из json'));
		}
		if (data) {
			drawReps(data);
		}
	}, (error) => {
		console.error(error);
	})
	console.log(`step ${step} done`)
	step = step+1;
}

tgr = throttle(getReps, 1000);

function onScroll() {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        tgr();
    }
}

getReps();

const body = document.querySelector("body");
body.onscroll = onScroll;

