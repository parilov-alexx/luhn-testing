export default class Cardcheck {
  constructor(cards) {
    this.cards = cards;
  }

  checkLength(allowedLength) {
    const multipleLength = (typeof allowedLength === 'object');
    if (multipleLength) return allowedLength.includes(this.input.length);
    return (this.input.length === allowedLength);
  }

  check(input) {
    this.input = input;
    const match = [];
    this.cards.forEach((card) => {
      const cardtype = new RegExp(card.regex);
      const allowedLength = card.ln;

      if (cardtype.exec(input) && ((this.input.length > 12) && this.checkLength(allowedLength))) {
        match.push(card);
      }
    });
    return match;
  }
}
