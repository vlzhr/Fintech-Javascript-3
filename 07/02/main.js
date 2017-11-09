function formatTime() {

  const date = new Date();

  let dd = date.getDate();
  if(dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if(mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if(yy < 10) yy = '0' + yy;

  let hh = date.getHours();
  if(hh < 10) hh = '0' + hh;

  let min = date.getMinutes();
  if(min < 10) min = '0' + min;

  let sec = date.getSeconds();
  if(sec < 10) sec = '0' + sec;

  return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min + ":" + sec;
}

let clicks = [];

const timeDistance = 500;

function handler () {
	clicks = [];
	const li = document.createElement("li");
	li.innerText = "2xClick - " + formatTime();
	document.querySelector("ol").appendChild(li);
}

const but = document.querySelector(".btn");
but.addEventListener("click", (event) => {
	clicks.push(event.timeStamp);
	doubleClick(event.target, handler, timeDistance);
})

function doubleClick(element, doubleClickHandler, timeDistance) {
	const len = clicks.length;
	if (len === 0) return 0;
	clicks[len-1] - clicks[len-2] <= timeDistance ? doubleClickHandler() : console.log("too long");
}