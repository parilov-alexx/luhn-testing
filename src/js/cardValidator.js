import Cardcheck from './cardcheck';
import Luna from './luna';

export default class CardValidator {
  constructor(cardWidget) {
    this.cardWidget = cardWidget;
    this.cardcheck = new Cardcheck(this.cardWidget.cards);
    this.validator = new Luna();
    this.match = [];
  }

  init() {
    this.cardWidget.drawUi();
    this.cardWidget.formEl.addEventListener('submit', () => false);
    this.cardWidget.inputEl.setAttribute('maxlength', 19);

    this.cardWidget.inputEl.addEventListener('input', () => {
      this.match = this.cardcheck.check(this.cardWidget.inputEl.value);

      this.cardWidget.cards.forEach((card) => {
        const cardEl = document.getElementById(`${card.image}`);
        cardEl.classList.remove('bright');
        if (this.match.includes(card)) {
          cardEl.classList.add('bright');
        }
      });
    });

    this.cardWidget.btnEl.addEventListener('click', (event) => {
      event.preventDefault();
      const titleEl = this.cardWidget.messageEl.querySelectorAll('.cardTitle');
      if (titleEl.length) {
        Array.from(titleEl).forEach((elem) => {
          elem.remove();
        });
      }
      this.cardWidget.clearStatus();

      let inputStatus;
      let messageStatus;

      let validate = this.validator.check(this.cardWidget.inputEl.value);

      if (validate === 'pass' && this.match.length === 0) {
        validate = 'fail';
      }

      if (validate === 'pass') {
        inputStatus = 'valid';
        messageStatus = 'messageValid';
      } else {
        inputStatus = 'invalid';
        messageStatus = 'messageInvalid';
      }

      this.cardWidget.showStatus(inputStatus, messageStatus);
      const cardTitleEl = document.createElement('div');
      cardTitleEl.className = 'cardTitle';

      if (this.match.length) {
        cardTitleEl.innerHTML = 'Проверка пройдена';
      } else {
        cardTitleEl.innerHTML = 'Не могу определить платежную систему';
      }
      this.cardWidget.messageEl.append(cardTitleEl);
    });
  }
}
