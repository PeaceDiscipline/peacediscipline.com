const header = document.querySelector("#home-header");
const menu = document.querySelector("#menu"); 
const landing = document.querySelector("#landing");

// ########################################## INTERSECTION OBSERVER ##########################################
const options = {
	threshold: 1
};
const landingObserver = new IntersectionObserver(function (entries) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			header.classList.add("top");
		} else {
			header.classList.remove("top");
		}
	})
}, options);

landingObserver.observe(landing);

// ############################################## CHANGING QUOTE #############################################
// fetch("../../resources/quotes.json")
// 	.then(res => res.json())
// 	.then(data => {
// 		const quote = document.querySelector("#quote");
// 		let i = 0;
// 		setInterval(() => {
// 			quote.textContent = data["quotes"][i];
// 			i = (i + 1) % data["quotes"].length;
// 		}, 8000);
// 	});

// ############################################### MOBILE MENU ###############################################
function openMenu() {
	menu.classList.add("open");
}

function closeMenu() {
	menu.classList.remove("open");
}

let tooltipVisible = false;
let timesClicked = 0;
let tooltipTimeout;
let tTip = document.querySelector(".tooltip");
let tTipText = tTip.querySelector(".tooltip-text");
document.querySelector(".obfus").addEventListener("click", async function(event) {
	if (!navigator.clipboard) {
		// Clipboard API not available
		console.warn("Clipboard API not avialable in this browser");
		return;
	}
	let text = event.target.innerText.split("").reverse().join("");
	try {
		await navigator.clipboard.writeText(text);
		// Tooltip code
		// position tooltip
		let left = (tTip.getBoundingClientRect().width - tTipText.getBoundingClientRect().width)/2;
		tTipText.style.left = `${left}px`;
		// multiple clicks easter egg
		let tooltip = this;
		if (tooltipVisible) {
			clearTimeout(tooltipTimeout);
			if (timesClicked < 101) {
				timesClicked++
				tTipText.innerText = `Copied ×${timesClicked}`;
			}
			else {
				tTipText.innerText = `Surely You have copied it enough`;
			}
		}
		else {
			tooltipVisible = true;
			timesClicked = 1;
			tooltip.classList.add("visible");
		}
		tooltipTimeout = setTimeout(() => {
			tooltip.classList.remove("visible");
			tTipText.innerText = "Copied";
			tooltipVisible = false;
			timesClicked = 0;
		}, 1000);
	}
	catch (err) {
		console.error("Failed to copy", err)
	}
})