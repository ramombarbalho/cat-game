export class BtnToBeContinued {
  constructor(overworld) {
    this.overworld = overworld;
    this.btn = document.createElement('div');
    this.btn.classList.add('btn-test');
    this.btn.textContent = `UNDER DEVELOPMENT`;
    this.overworld.game.screen.appendChild(this.btn);
  }
}
