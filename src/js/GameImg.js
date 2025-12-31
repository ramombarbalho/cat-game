export class GameImg {
  constructor() {
    this.el = document.createElement('img');
    this.el.classList.add('game-img');
    this.el.setAttribute('draggable', 'false');
  }
}
