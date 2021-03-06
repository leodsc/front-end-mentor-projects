const loadSocials = () => {
	const socialsContainer = document.createElement("div");
	socialsContainer.innerHTML = `
		<section class="socials">
			<p>share</p>
			<a href="https://facebook.com">
			  <img src="images/icon-facebook.svg" alt="facebook icon">
			</a>
			<a href="https://twitter.com">
			  <img src="images/icon-twitter.svg" alt=twitter icon"">
			</a>
			<a href="https://pinterest.com">
			  <img src="images/icon-pinterest.svg" alt="pinterest icon">
			</a>
		</section>
		<div class="ballon"></div>
	`;

	const shareButton = document.querySelector(".share");
	if (window.Touch || window.innerWidth < 1440) {
		socialsContainer.className = "mobile socials-container";
		shareButton.addEventListener("click", () => {
			const info = document.querySelector(".info");
			if (!document.querySelector(".socials-container")) {
				info.appendChild(socialsContainer);
			} else {
				info.removeChild(socialsContainer);
			}
		});
	} else {
		socialsContainer.className = "desktop socials-container";
		shareButton.addEventListener("mouseover", () => {
			shareButton.appendChild(socialsContainer);
		});

		shareButton.addEventListener("mouseout", () => {
			shareButton.removeChild(socialsContainer);
		});
	}
};

loadSocials();
