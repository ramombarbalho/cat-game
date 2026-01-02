import { TitleUI } from './TitleUI';

export class Title {
  constructor(game) {
    this.game = game;
    this.ui = new TitleUI(this.game);
  }
}
