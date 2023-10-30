import { SKILL_LIST } from './SKILL_LIST';
import { ENEMY_LIST } from './ENEMY_LIST';
import { BOSS_LIST } from './BOSS_LIST';
import { GameTransition } from './GameTransition';
import { Title } from './Title';
import { Overworld } from './Overworld';
import { GameBoard } from './GameBoard';
import { InputHandler } from './InputHandler';
import { Player } from './Player';

export class Game {
  constructor(config, stages, playerState) {
    this.config = config;
    this.height = this.config.gameHeight;
    this.width = this.config.gameWidth;
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('game-container');
    this.gameContainer.style.height = this.height + 'px';
    this.gameContainer.style.width = this.width + 'px';
    document.body.appendChild(this.gameContainer);
    this.activeScreen = 'TITLE';
    this.stages = [...stages];
    this.stageId = this.config.stageId;
    this.playerState = playerState;
    this.keys = [...this.config.keys];
    this.keysActive = [];
    this.title = new Title(this);
    this.overworld = new Overworld(this);
    this.gameBoard = new GameBoard(this);
    this.transition = new GameTransition(this);
    this.input = new InputHandler(this);
    document.querySelector('.game-loading').remove();
  }

  updateActiveScreen = screen => (this.activeScreen = screen);

  setKey(key) {
    const keyIndex = this.keys.indexOf(key);
    if (keyIndex > -1) {
      this.keys[keyIndex] = this.keys[this.title.ui.id];
      this.title.ui.boxOptions.querySelector(`div[data-id="${keyIndex}"]`).previousElementSibling.innerHTML = this.keys[keyIndex];
    }
    this.keys[this.title.ui.id] = key;
    this.title.ui.boxOptions.querySelector(`div[data-id="${this.title.ui.id}"]`).previousElementSibling.innerHTML = key;
    this.title.ui.labelKeyOverlayOptions.innerHTML = '';
    this.title.ui.overlaySetKey.style.display = 'none';
    this.title.ui.overlaySetKeyIsOpen = false;
  }

  addPlayerSkills(id) {
    return new SKILL_LIST[id](this.gameBoard, this.gameBoard.player);
  }

  addEnemy() {
    const rng = Math.floor(Math.random() * this.gameBoard.stage.enemyGroup.length);
    return new ENEMY_LIST[this.gameBoard.stage.enemyGroup[rng]](this.gameBoard);
  }

  addBoss(id) {
    return new BOSS_LIST[id](this.gameBoard);
  }

  resetStateGameRunningArea() {
    this.gameBoard.gameRunningArea.innerHTML = '';
    this.gameBoard.stage = null;
    this.gameBoard.state = this.config.initStageState;
    this.gameBoard.windForceX = 0;
    this.gameBoard.pauseGameFrames = this.config.pauseGameFrames;
    this.gameBoard.pauseAllowed = true;
    this.gameBoard.projectiles.length = 0;
    this.gameBoard.enemies.length = 0;
    this.gameBoard.explosions.length = 0;
    this.gameBoard.coins.length = 0;
    this.gameBoard.hitBoxElements.length = 0;
    this.gameBoard.score = 0;
    this.gameBoard.boss = null;
    this.gameBoard.bossDefeated = false;
    this.gameBoard.gameRunningArea.style.backgroundImage = '';
  }

  updateGameBoardContext() {
    this.gameBoard.stage = { ...this.stages[this.stageId] };
    this.gameBoard.enemySpawnInterval = this.gameBoard.stage.enemyIntervalFrames;
    this.gameBoard.gameRunningArea.style.backgroundImage = this.gameBoard.stage.backgroundImage;
  }

  updateGameBoardPlayer() {
    this.gameBoard.player = new Player(this.gameBoard);
    this.gameBoard.player.top = (this.gameBoard.gameRunningHeight - this.gameBoard.player.height) / 2;
    this.gameBoard.player.left = this.gameBoard.left;
    this.gameBoard.player.hp = this.playerState.hp;
    this.gameBoard.player.skills.length = 0;
    this.gameBoard.player.skills = [this.addPlayerSkills(this.playerState.skills[0]), this.addPlayerSkills(this.playerState.skills[1])];
    this.gameBoard.player.update();
  }

  updateGameBoard() {
    this.resetStateGameRunningArea();
    this.updateGameBoardContext();
    this.updateGameBoardPlayer();
    this.gameBoard.ui.updateGameBoardUI();
  }

  transitionLoop = () => {
    this.transition.update();
    // console.log(this.transition.overlayTransitionFrames);
    if (!this.transition.overlayTransition) return;
    requestAnimationFrame(this.transitionLoop);
  };
}
