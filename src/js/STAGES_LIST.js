export const STAGES_LIST = [
  {
    title: '0-0',
    enemyGroup: null,
    bossStage: false,
    bossId: null,
    enemyIntervalFrames: null,
    scoreGoal: 0,
    isClear: true,
    backgroundImage: 'linear-gradient(#7f55ff, #7f55ff)'
  },
  // {
  //   title: '1-2',
  //   enemyGroup: null,
  //   bossStage: true,
  //   bossId: 0,
  //   enemyIntervalFrames: null,
  //   scoreGoal: null,
  //   isClear: false,
  //   backgroundImage: 'linear-gradient(#25b3df, #5a23a1)'
  // },
  {
    title: '1-1',
    enemyGroup: [0],
    bossStage: false,
    bossId: null,
    enemyIntervalFrames: 120,
    scoreGoal: 50,
    breakPoint: {
      score: 25,
      enemyGroup: [0],
      enemyIntervalFrames: 60
    },
    breakPointActive: false,
    isClear: false,
    backgroundImage: 'linear-gradient(#5a23a1, #25b3df)'
  },
  {
    title: '1-2',
    enemyGroup: null,
    bossStage: true,
    bossId: 0,
    enemyIntervalFrames: null,
    scoreGoal: null,
    isClear: false,
    backgroundImage: 'linear-gradient(#25b3df, #5a23a1)'
  }
];
