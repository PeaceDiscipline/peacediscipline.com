const modal = document.querySelector("#video-modal");

modal.addEventListener("click", (e) => {
	modal.innerHTML = "";
	modal.classList.add("hidden");
})

for (let i of document.querySelectorAll(".video")) {
	i.addEventListener("click", showModal);
}

function showModal(e) {
	console.log(e.target.firstElementChild.src.substr(27, 11));
	modal.innerHTML = `
	<iframe src="https://youtu.be/${e.target.firstElementChild.src.substr(27, 11)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	`
	modal.classList.remove("hidden");
}
