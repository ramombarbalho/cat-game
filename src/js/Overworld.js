import { OverworldUI } from './OverworldUI';

export class Overworld {
  constructor(game) {
    this.game = game;
    this.ui = new OverworldUI(this);
  }
}
