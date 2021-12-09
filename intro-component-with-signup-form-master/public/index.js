function handleForm() {
	const error = {
		update(labelName, msg) {
			const message = document.createElement("p");
			const icon = document.createElement("img");
			icon.src = "images/icon-error.svg";
			icon.className = "error-icon";
			const label = document.querySelector(`label[for=${labelName}]`);
			const input = label.children[0];
			message.className = "error-message";
			message.textContent = msg;
			input.classList.add("invalid");
			label.appendChild(message);
			label.appendChild(icon);
		},
		refresh(form) {
			const messages = [...form.querySelectorAll("p.error-message")];
			const icons = [...form.querySelectorAll("img.error-icon")];
			const tagsToRemove = messages.concat(icons);
			tagsToRemove.map((tag) => {
				tag.parentElement.removeChild(tag);
			});
			const inputs = document.querySelectorAll("input");
			[...inputs].map((input) => input.classList.remove("invalid"));
		},
	};

	const submit = document.querySelector("button");
	submit.addEventListener("click", () => {
		const form = document.querySelector("form");
		error.refresh(form);
		const data = new FormData(form);
		if (data.get("name").length === 0)
			error.update("name", "First Name cannot be empty");
		if (data.get("last-name").length === 0)
			error.update("last-name", "Last Name cannot be empty");
		if (data.get("email").length === 0)
			error.update("email", "Email cannot be empty");
		if (!validator.isEmail(data.get("email")))
			error.update("email", "Looks like this is not an email");
		if (data.get("password").length === 0)
			error.update("password", "Password cannot be empty");
		if (!validator.isStrongPassword(data.get("password")))
			error.update(
				"password",
				`Password must have:\n1 number\n1 uppercase letter\n1 lowercase letter\n1 symbol !@#$%&\n8 characters`
			);
		else window.location.reload();
	});
}

handleForm();
