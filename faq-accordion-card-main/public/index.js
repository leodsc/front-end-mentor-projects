const answers = [
	"You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.",
	"No more than 2GB. All files in your account must fit your allotted storage space.",
	"Click “Forgot password” from the login page or “Change password” from your profile page. A reset link will be emailed to you.",
	"Yes! Send us a message and we’ll process your request no questions asked.",
	"Chat and email support is available 24/7. Phone lines are open during normal business hours.",
];

const questions = document.querySelectorAll(".question");

[...questions].forEach((question, index = 0) => {
	question.addEventListener("click", () => {
		if (question.children.length < 3) {
			const para = document.createElement("p");
			para.textContent = answers[index];
			para.className = "answer";
			question.children[0].style.fontWeight = 700;
			question.children[1].style.transform = "rotate(180deg)";
			question.appendChild(para);
		} else {
			question.removeChild(question.children[2]);
			question.children[0].style.fontWeight = 400;
			question.children[1].style.transform = "";
		}
	});
});
