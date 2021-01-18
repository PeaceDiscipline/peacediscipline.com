const toolbox = document.querySelector("#toolbox");
const toolMenu = toolbox.querySelector("#tool-menu");

function toggleToolbox() {
	toolbox.classList.toggle("open");
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