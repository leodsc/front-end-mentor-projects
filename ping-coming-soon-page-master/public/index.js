const button = document.querySelector('.notify');
const input = document.querySelector('input');

button.addEventListener('click', () => {
  const isEmail = validator.isEmail(input.value);
  if (!isEmail) {
    const para = document.createElement('p');
    para.textContent = "Please provide a valid email address";
    para.className = "error-message";
    if (window.innerWidth >= 1440) {
      const container = document.querySelector('div.ctn');
      container.insertAdjacentElement('afterend', para);
    } else {
      input.insertAdjacentElement('afterend', para);
    }
    input.style.border = "1px solid hsl(354, 100%, 66%)";
  } else {
    input.style.border = "1px solid var(--gray)";
    const para = document.querySelector('.error-message');
    if (para) {
      para.parentElement.removeChild(para);
    }
  }
})
