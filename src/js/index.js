import { INIT_CONFIG } from './INIT_CONFIG';
import { STAGES_LIST } from './STAGES_LIST';
import { INIT_PLAYER_STATE } from './INIT_PLAYER_STATE';
import { Game } from './Game';

if ('ontouchstart' in document.documentElement)
  document.querySelector('.game-loading').innerHTML = `<p style="font-size: 20px">THIS GAME DOESN'T WORK ON TOUCH SCREEN DEVICES =/</p>`;
else window.addEventListener('load', () => new Game(INIT_CONFIG, STAGES_LIST, INIT_PLAYER_STATE));
