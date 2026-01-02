export const STAGE_LIST = [
  {
    id: 'tutorial',
    title: '1-1',
    enemyGroup: [0],
    bossStage: false,
    bossId: null,
    enemyIntervalFrames: 120,
    scoreGoal: 1,
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
    id: 'moon',
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
