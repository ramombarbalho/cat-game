export class Dialog {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add('dialog');
  }

  addContent(content) {
    this.el.innerHTML = content;
  }

  deleteDialog() {
    this.el.remove();
    this.el = null;
  }
}
