export class DialogBox {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add('dialog-box');
  }

  addContent(content) {
    this.el.innerHTML = content;
  }
}
