const counts = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const tire = ["-"]

const template = [
	["+"],
	["7"],
	["("],
	counts,
	counts,
	counts,
	[")"],
	tire,
	counts,
	counts,
	counts,
	tire,
	counts,
	counts,
	tire,
	counts,
	counts,
	[]
]

function changeLink(text) {
	const link = document.querySelector(".tel");
	link.innerText = "Позвонить на " + text;
	link.href = "tel:" + text;
}

const inp = document.querySelector(".input");
inp.addEventListener("input", () => {
	let text = inp.value;
	const number = text.length - 1;
	if (number === -1) return; // if it's the first click
	template[number].indexOf(text[number]) >= 0 ? changeLink(text) : inp.value = text.slice(0, number);
	// if ctrl+v the wrong data
	text = inp.value;
	for (n in text) {
		if (template[n].indexOf(text[n]) < 0) {
			inp.value = "";
			changeLink("");
		} 
	}
	//
	if (text.length === template.length - 1) inp.classList.add("success");
});

