// ################################################ RECAPTCHA ################################################
async function onSubmit(token) {
	const response = await fetch("/api/verify_recaptcha", {
		method: "POST",
		headers: {
			"Content-Type": "text/plain"
		},
		body: token,
	});
	const body = await response.json();
	console.log(token);
	console.log(body);
	if (body.success) {
		document.querySelector("#mailing-list form").submit();
	}
}

// ########################################### HOME PAGE MENU FADE ###########################################
const options = {
	threshold: 1
};
const landingObserver = new IntersectionObserver(function(entries) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			header.classList.add("top");
		} else {
			header.classList.remove("top");
		}
	});
}, options);

landingObserver.observe(landing);

// ############################################## CHANGING QUOTE #############################################
// fetch("../resources/quotes.json")
// 	.then(res => res.json())
// 	.then(data => {
// 		const quote = document.querySelector("#quote");
// 		let i = 0;
// 		setInterval(() => {
// 			quote.textContent = data["quotes"][i];
// 			i = (i + 1) % data["quotes"].length;
// 		}, 8000);
// 	});
const quotes = [
	"Learn about non-violent discipline",
	"Children need to feel safe with us",
];

const quote = document.querySelector("#quote");
let i = 0;
setInterval(() => {
	quote.textContent = quotes[i];
	i = (i + 1) % quotes.length;
}, 7000);
// ############################################### FLIER MODAL ###############################################
const modal = document.querySelector("#modal");
const modalFlier = modal.querySelector("#modal-flier");

function expandFlier(e) {
	modalFlier.setAttribute("src", e.target.getAttribute("src"));
	modal.classList.add("visible");
}

function closeModal() {
	modal.classList.remove("visible");
}

for (let i of document.querySelectorAll(".flier")) {
	i.addEventListener("click", expandFlier);
}