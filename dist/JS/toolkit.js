root = document.documentElement;
const body = document.querySelector("body");
const toolbox = document.querySelector("#toolbox");
const toolMenu = toolbox.querySelector("#tool-menu");
const section = document.querySelector("section");
const toolboxWidth = toolbox.getBoundingClientRect().width;

function toggleToolbox() {
	toolbox.classList.toggle("open");
	let tempMargin = ((window.innerWidth - section.getBoundingClientRect().width) - toolboxWidth) / 2;
	root.style.setProperty("--left-margin", `${tempMargin + toolboxWidth}px`);
	root.style.setProperty("--right-margin", `${tempMargin} px`);
	body.classList.toggle("pushed");
}

const toolButtons = document.querySelectorAll(".tool-button");
let currentTool = null;
let previousTool = null;

for (let i of toolButtons) {

	i.addEventListener("click", (e) => {
		window.location.href = e.target.getAttribute("tool");
		e.target.focus();
		// if (currentTool != null) {
		// 	currentTool.classList.remove("focus");
		// }
		// currentTool = e.target;
		// currentTool.classList.add("focus");

		// if (e.target.getBoundingClientRect().bottom > 0.75*window.innerHeight) {
		// 	console.log("low");
		// 	toolMenu.scroll(0, 200);
		// }
	});
}

const tab_key = 9;
window.onkeydown = function(e) {
	if (e.keyCode === tab_key && toolbox.classList.contains("open")) {
		
	}
};

// ########################################## INTERSECTION OBSERVER ##########################################\
const sections = document.querySelectorAll(".tool");

let options = {
	root: null,
	threshhold: 0,
	// Fire when element is 60% up the page, or 40% down the page
	rootMargin: "-40% 0px -60% 0px"
}

const observer = new IntersectionObserver(function(entries, observer) {
	entries.forEach(entry => {
		if (!entry.isIntersecting) { return; }
		let toolButton = document.querySelector(`[tool="#${entry.target.id}"]`);
		toolButton.focus();
		if (toolButton.getBoundingClientRect().bottom > window.innerHeight/1.5) {
			toolMenu.scrollBy({
				top: 80,
				behavior: "smooth"
			});
		} else if (toolButton.getBoundingClientRect().top < window.innerHeight/1.5) {
			toolMenu.scrollBy({
				top: -80,
				behavior: "smooth"
			});
		}
	})
}, options);

sections.forEach(sect => {
	observer.observe(sect);
});




toggleToolbox();