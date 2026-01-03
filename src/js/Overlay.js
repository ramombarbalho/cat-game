export class Overlay {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add('overlay');
  }

  addContent(content) {
    this.el.innerHTML = content;
  }

  deleteElement() {
    this.el.remove();
    this.el = null;
  }
}
