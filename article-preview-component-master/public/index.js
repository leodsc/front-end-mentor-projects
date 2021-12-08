const loadSocials = () => {
	const socialsContainer = document.createElement("div");
	if (window.Touch) {
		socialsContainer.className = "mobile socials-container";
	} else {
		socialsContainer.className = "desktop socials-container";
	}

	socialsContainer.innerHTML = `
		<section class="socials">
			<p>share</p>
			<img src="images/icon-facebook.svg" alt="facebook icon">
			<img src="images/icon-twitter.svg" alt=twitter icon"">
			<img src="images/icon-pinterest.svg" alt="pinterest icon">
		</section>
		<div class="ballon"></div>
	`;

	let timer;

	const shareButton = document.querySelector(".share");
	shareButton.addEventListener("mouseover", () => {
		shareButton.appendChild(socialsContainer);
	});

	shareButton.addEventListener("mouseout", () => {
		shareButton.removeChild(socialsContainer);
	});

	shareButton.addEventListener("click", () => {
		if (window.Touch) {
			const info = document.querySelector(".info");
			if (!document.querySelector(".socials-container")) {
				info.appendChild(socialsContainer);
			} else {
				info.removeChild(socialsContainer);
			}
		}
	});
};

loadSocials();
