// ############################################## NOTIFICATIONS ##############################################
const notifications = document.querySelector("#notifications");
/**
 * @type {HTMLFormElement}
 */
const form = document.querySelector("#subscribe-to-mailing-list");

function notification(title, message, status) {
	const notification = document.createElement('notification-element');
	notification.setAttribute('status', status);
	notification.setAttribute('title', title);
	notification.setAttribute('message', message);
	notification.setAttribute('type', type)
	if (status >= 200 && status < 300) {
		notification.setAttribute('type', "success");
	}
	notification.setAttribute('type', "error");
	return notification;
}

// ################################################### FORM ##################################################
async function onSubmit(token) {
	const data = new FormData(form);
	data.append("g-recaptcha-response", token);
	const response = fetch(form.action, {
		method: form.method,
		body: data,
	});
	const result = await response;
	const body = await result.json();
	notifications.appendChild(notification(body.response, body.message, result.status));
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