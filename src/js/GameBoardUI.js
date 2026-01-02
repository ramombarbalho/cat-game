import { BtnOverworld } from './BtnOverworld';
import { BtnRetry } from './BtnRetry';
import { GameImg } from './GameImg';
import { OverlayPause } from './OverlayPause';

export class GameBoardUI {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.openingStageMsg = null;
    this.openingStageMsgFrames =
      this.gameBoard.game.config.openingStageMsgFrames;
    this.stageClearMsg = null;
    this.stageClearMsgFrames = this.gameBoard.game.config.stageClearMsgFrames;
    this.warningMsg = null;
    this.warningMsgFrames = this.gameBoard.game.config.warningMsgFrames;
    this.statusBarr = null;
    this.statusBarrHeight = this.gameBoard.game.height / 6;
    this.statusBarrWidth = this.gameBoard.game.width;
    this.heartsBox = null;
    this.heartsImg = [];
    this.skillBoxes = [];
    this.skillBoxesCooldown = [];
    this.skillBoxesNotAllowed = [];
    this.skillCooldownFrames = [];
    this.boxMsg = null;
    this.catThumbs = null;
    this.btnRetry = null;
    this.btnOverworld = null;
    this.initialBossHp = 0;
    this.hpBossBarr = null;
    this.hpBossEl = null;
    this.hpBossElValue = 0;
    this.scoreLabel = null;
    this.scorePoints = null;
    this.overlayPause = null;
    this.initGameBoardUI();
  }

  initGameBoardUI() {
    if (!this.gameBoard.stage.bossStage) {
      this.scoreLabel = document.createElement('p');
      this.scoreLabel.classList.add('score-label');
      this.gameBoard.gameRunningArea.appendChild(this.scoreLabel);
      this.scoreLabel.innerHTML = `SCORE: <span class="score-points"></span>/${this.gameBoard.stage.scoreGoal}`;
      this.scorePoints = document.querySelector('.score-points');
      this.scorePoints.textContent = String(this.gameBoard.score).padStart(
        String(this.gameBoard.stage.scoreGoal).length,
        '0'
      );
    }

    // ##fix criar class para statusBarr
    this.statusBarr = document.createElement('div');
    this.statusBarr.classList.add('game-status-barr');
    this.statusBarr.style.height = this.statusBarrHeight + 'px';
    this.statusBarr.style.width = this.statusBarrWidth + 'px';
    this.gameBoard.game.screen.appendChild(this.statusBarr);
    this.heartsBox = document.createElement('div');
    this.heartsBox.classList.add('box-hearts');
    this.statusBarr.appendChild(this.heartsBox);
    this.renderHeartsBox();
    this.renderSkillBoxes();

    this.overlayPause = new OverlayPause(this.gameBoard.game);
  }

  updateHeart() {
    this.heartsBox.innerHTML = '';
    this.renderHeartsBox();
  }

  renderHeartsBox() {
    for (let i = 0; i < this.gameBoard.player.hp; i++) {
      this.heartsImg[i] = document.createElement('img');
      this.heartsImg[i].classList.add('heart-icon');
      this.heartsImg[i].src = 'heart-icon.png';
      this.heartsImg[i].setAttribute('draggable', 'false');
      this.heartsBox.appendChild(this.heartsImg[i]);
    }
  }

  renderSkillBoxes() {
    for (let i = 0; i < this.gameBoard.player.skills.length; i++) {
      this.skillBoxes[i] = document.createElement('div');
      this.skillBoxes[i].classList.add('box-skill');
      this.statusBarr.appendChild(this.skillBoxes[i]);
      if (this.gameBoard.player.skills[i]) {
        const skillEl = new GameImg();
        skillEl.el.style.height =
          this.gameBoard.player.skills[i].icon.height + 'px';
        skillEl.el.src = `${this.gameBoard.player.skills[i].icon.src}`;
        skillEl.el.style.filter = 'drop-shadow(4px 4px 4px black)';
        this.skillBoxes[i].appendChild(skillEl.el);
      }
      this.skillBoxesCooldown[i] = document.createElement('div');
      this.skillBoxesCooldown[i].classList.add('cooldown-box-skill');
      this.skillBoxesCooldown[i].style.display = 'none';
      this.skillBoxes[i].appendChild(this.skillBoxesCooldown[i]);
      this.skillBoxesNotAllowed[i] = new GameImg();
      this.skillBoxesNotAllowed[i].el.style.height = 25 + 'px';
      this.skillBoxesNotAllowed[i].el.src = 'not-allowed.png';
      this.skillBoxesNotAllowed[i].el.classList.add('not-allowed');
      this.skillBoxesNotAllowed[i].el.style.display = 'none';
      this.skillBoxes[i].appendChild(this.skillBoxesNotAllowed[i].el);
      this.skillCooldownFrames[i] = this.gameBoard.player.skills[i].cooldown;
    }
  }

  skillCooldownHandler(i) {
    if (this.skillCooldownFrames[i] <= 0) {
      this.skillCooldownFrames[i] = this.gameBoard.player.skills[i].cooldown;
      this.skillBoxesCooldown[i].style.display = 'none';
      this.skillBoxesNotAllowed[i].el.style.display = 'none';
      this.skillBoxesCooldown[i].style.height = '100%';
      this.gameBoard.player.skills[i].avaliable = true;
    } else {
      this.skillCooldownFrames[i]--;
      const heightPercent =
        this.skillCooldownFrames[i] / this.gameBoard.player.skills[i].cooldown;
      this.skillBoxesCooldown[i].style.height = heightPercent * 100 + '%';
    }
  }

  createHpBossBarr() {
    this.hpBossBarr = document.createElement('div');
    this.hpBossBarr.classList.add('hp-boss-barr');
    this.statusBarr.appendChild(this.hpBossBarr);
    this.hpBossEl = document.createElement('div');
    this.hpBossEl.classList.add('hp-boss-el');
    this.hpBossBarr.appendChild(this.hpBossEl);
  }

  fillHpBossBarr() {
    if (this.hpBossElValue < 100) {
      this.hpBossElValue += 1;
      // this.hpBossElValue += 50;
      this.hpBossEl.style.width = this.hpBossElValue + '%';
    }
  }

  updateBarrBoss() {
    this.hpBossEl.style.width =
      (this.hpBossElValue * this.gameBoard.boss.hp) / this.initialBossHp + '%';
  }

  // ##fix criar openStage class
  openingStage() {
    if (!this.openingStageMsg) {
      this.openingStageMsg = document.createElement('div');
      this.openingStageMsg.classList.add('opening-stage-msg');
      this.openingStageMsg.innerHTML = `<span class="game-text opening-stage-msg-number">${this.gameBoard.stage.title}</span>
                                        <span class="game-text opening-stage-msg-text">start!</span>`;
      this.gameBoard.gameRunningArea.appendChild(this.openingStageMsg);
    } else if (this.openingStageMsgFrames <= 0) {
      this.openingStageMsg.remove();
      this.openingStageMsg = null;
    } else {
      this.openingStageMsgFrames--;
    }
  }

  // ##fix criar stageClear class
  stageClear() {
    if (!this.stageClearMsg) {
      this.stageClearMsg = document.createElement('div');
      this.stageClearMsg.classList.add('stage-clear-msg');
      this.stageClearMsg.innerHTML = 'stageclear!'
        .split('')
        .map(c => `<span class="game-text stage-clear-msg-text">${c}</span>`)
        .join('');
      this.gameBoard.gameRunningArea.appendChild(this.stageClearMsg);
    } else if (this.stageClearMsgFrames <= 0) {
      this.stageClearMsg.remove();
      this.stageClearMsg = null;
    } else {
      this.stageClearMsgFrames--;
    }
  }

  // ##fix criar warning class
  warning() {
    if (!this.warningMsg) {
      this.warningMsg = document.createElement('div');
      this.warningMsg.classList.add('warning-msg');
      this.warningMsg.innerHTML = 'warning'
        .split('')
        .map(c => `<span class="game-text warning-msg-text">${c}</span>`)
        .join('');
      this.gameBoard.gameRunningArea.appendChild(this.warningMsg);
      this.createHpBossBarr();
    } else if (this.warningMsgFrames <= 0) {
      this.warningMsg.remove();
      this.warningMsg = null;
    } else {
      this.warningMsgFrames--;
    }
  }

  createBoxMsg() {
    this.boxMsg = document.createElement('div');
    this.boxMsg.classList.add('box-msg');

    if (this.gameBoard.state === 'GAME_OVER') {
      this.boxMsg.innerHTML = ` <h1 style="color: #ff3200">GAME OVER</h1>
                                <div class="box-img-game-over">
                                  <img draggable="false" src="cat-game-over.png" class="cat-game-over-img" />
                                  <img draggable="false" src="cat-game-over-thumbs.png" class="cat-game-over-img thumbs-down" id="thumbs" />
                                </div>
                              `;
      this.gameBoard.gameRunningArea.appendChild(this.boxMsg);
      this.catThumbs = document.querySelector('#thumbs');
      this.btnRetry = new BtnRetry(this.gameBoard.game, this.boxMsg);
      this.btnRetry.el.addEventListener('mouseover', this.catThumbsUp);
      this.btnRetry.el.addEventListener('mouseout', this.catThumbsDown);
    } else if (this.gameBoard.state === 'STAGE_CLEAR') {
      this.boxMsg.innerHTML = ` <h1>STAGE CLEAR</h1>
                                <h3>HP:.......??</h3>
                                <h3>BOMB:.....??</h3>
                                <h3>SHOOTS:...??</h3>
                                <h2>TOTAL:..??</h2>
                              `;
      this.gameBoard.gameRunningArea.appendChild(this.boxMsg);
      this.btnRetry = new BtnRetry(this.gameBoard.game, this.boxMsg);
    }

    this.btnOverworld = new BtnOverworld(this.gameBoard.game, this.boxMsg);
  }

  catThumbsUp = () => {
    this.catThumbs.classList.remove('thumbs-down');
  };

  catThumbsDown = () => {
    this.catThumbs.classList.add('thumbs-down');
  };
}
