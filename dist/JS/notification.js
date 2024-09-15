class Notification extends HTMLElement {
	static observedAttributes = ["title", "message", "status", "type"];
	static template = (() => {
		const t = document.createElement("template");
		t.innerHTML =
		/*html*/`
		<style>
			.success { --bg: #72D35F; }
			.error { --bg: #D35F5F; }
			.warning { --bg: #D3C05F; }
			.notification {
				background-color: var(--bg);
				color: #0008;
				max-width: 100%;
				width: 40rem;
				overflow: hidden;
				user-select: none;
				padding-left: 2rem;
				text-align: start;
				border-radius: 0.5rem;
				position: relative;
				display: grid;
				grid-template-columns: 1fr 4rem;
				grid-template-rows: auto auto;
				margin-bottom: 1rem;
				grid-template-areas:
				"t c"
				"m c";
				grid-column-gap: 2rem;
			}
			.status { opacity: .2; }
			.title { grid-area: t; }
			.message {
				grid-area: m;
				margin-top: 0;
			}
			button {
				all: unset;
				grid-area: c;
				cursor: pointer;
				font-weight: bold;
				text-align: center;
				font-size: 2rem;
			}
			button:hover {
				background-color: #0002;
			}
		</style>
		<div class="notification">
			<h2><span class="title"></span> <span class="status"></span></h2>
			<p class="message"></p>
			<button>×</button>
		</div>
		`;
		return t;
	})();
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.shadowRoot.appendChild(Notification.template.content.cloneNode(true));
		this.notification = this.shadowRoot.querySelector(".notification");
		this.notification.querySelector(".title").textContent = this.getAttribute("title");
		this.notification.querySelector(".message").textContent = this.getAttribute("message");
		this.notification.querySelector(".status").textContent = this.getAttribute("status");
		this.notification.classList.add(this.getAttribute("type") ?? "success");
		this.notification.animate([{
			right: "-100%"
		},
		{
			right: "1rem"
		}
		], {
			duration: 500,
			fill: "forwards",
			easing: "cubic-bezier(0, 1.6, 1, 1)"
		});
		this.notification.querySelector("button").addEventListener("click", async () => {
			this.notification.classList.add("dismissed");
			let animation = this.notification.animate([{
				right: "1rem"
			},
			{
				right: "-100%"
			}
			], {
				duration: 500,
				fill: "forwards",
				easing: "cubic-bezier(.45, -0.6, 1, .3)"
			});
			await animation.finished;
			animation = this.notification.animate([{
				height: this.notification.clientHeight + "px",
				marginBottom: "1rem"
			},
			{
				height: "0",
				marginBottom: "0"
			}
			], {
				duration: 300,
				fill: "forwards",
				easing: "ease"
			});
			await animation.finished;
			this.remove();
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			const element = this.shadowRoot.querySelector(`.${name}`);
			if (!element) return;
			element.textContent = newValue;
		}
	}
}

window.customElements.define("notification-element", Notification);