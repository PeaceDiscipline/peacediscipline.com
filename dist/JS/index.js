// ########################################### HOME PAGE MENU FADE ###########################################
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
