export class Overlay {
  createEl(content) {
    const el = document.createElement('div');
    el.classList.add('overlay');
    el.innerHTML = content;
    return el;
  }
}
