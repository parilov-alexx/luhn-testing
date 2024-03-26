import cards from './cardinfo';
import CardWidget from './card-widget';
import CardValidator from './cardValidator';

const cardWidget = new CardWidget(cards);
cardWidget.bindToDOM(document.querySelector('#card-container'));

const cardCk = new CardValidator(cardWidget);
cardCk.init();
