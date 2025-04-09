import './render-footer.css';

export const renderFooter = (element) => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.innerHTML = `
    <div class="footer__container">
      <p class="footer__text prevent-selected" data-i18n="made-by">Made by 
        <a href="https://github.com/ejbpz" class="footer__link">ejbpz</a>
      </p>
    </div>
  `;
  element.append(footer);
}