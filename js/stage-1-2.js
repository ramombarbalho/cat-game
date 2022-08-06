// Declarações iniciais

var gameBoard = document.querySelector('.game-board')
var heartStatus = document.querySelector('.heart-status')
var heartCat = document.querySelector('.heart-active')
var hpCat = 3
var shotHadukenDMG = 1
var bombValue = 0
var gameOver = false
var retryMsg = document.querySelector('.retry-msg')
var imgCatGameOver = document.querySelector('.cat-game-over')
var pointHpCat = 0
var pointQtShotHaduken = 0
var pointQtBomb = 0
var qtPointsFinal = 0
var stageComplete = false

// hpPlanet01

var hpPlanet01Y1 = 1
var hpPlanet01Y2 = 1
var hpPlanet01Y3 = 1
var hpPlanet01Y4 = 1
var hpPlanet01Y5 = 1

// hpPlanet03

var hpPlanet03Y1 = 3
var hpPlanet03Y2 = 3
var hpPlanet03Y3 = 3
var hpPlanet03Y4 = 3
var hpPlanet03Y5 = 3

// hpPlanet05

var hpPlanet05Y1 = 5
var hpPlanet05Y2 = 5
var hpPlanet05Y3 = 5
var hpPlanet05Y4 = 5
var hpPlanet05Y5 = 5

// hpMoonBoss

var hpMoonBoss = 40
var hpMoonBossFixed = hpMoonBoss
var boxBarrHpBoss = document.querySelector('.box-barr-hp-boss')
var barrHpBoss = document.querySelector('.barr-hp-boss')
var valueBarrHpBoss = 100

//
//
//
/* 
var gundamBoss = document.createElement('img')
    gundamBoss.src = '../img/gundam-boss.gif'
    gundamBoss.classList.add('gundam-boss')
    gameBoard.appendChild(gundamBoss)

 */
//
//
//

// Stage 1-1

const sprite000 = setTimeout(() => {

    var stage1_1 = document.createElement('img')
    stage1_1.src = '../img/stage_1-1.png'
    stage1_1.classList.add('stage-start')
    gameBoard.appendChild(stage1_1)

    setTimeout(() => {
        
        gameBoard.removeChild(stage1_1)

    }, 1900);
        
}, 1000);

// Padrão 1

const sprite001 = setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 4000);

const sprite002 = setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = '../img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 6500);

const sprite003 = setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = '../img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 9000);

const sprite004 = setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = '../img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 11500);

const sprite005 = setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = '../img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 12000);

const sprite006 = setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = '../img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 13500);

const sprite007 = setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = '../img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 15000);

const sprite008 = setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 17000);

const sprite009 = setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = '../img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 17500);

const sprite010 = setTimeout(() => {

    planet05Y3 = document.createElement('img')
    planet05Y3.src = '../img/planet05.gif'
    planet05Y3.classList.add('planet-05-y3')
    gameBoard.appendChild(planet05Y3)
        
}, 19000);

const sprite011 = setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = '../img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 20000);

// Padrão 2 desce sobe

const sprite012 = setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 23000);

const sprite013 = setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = '../img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 24000);

const sprite014 = setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = '../img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 25000);

const sprite015 = setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = '../img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 26000);

const sprite016 = setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = '../img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 27000);

const sprite017 = setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = '../img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 30000);

const sprite018 = setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = '../img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 30500);

const sprite019 = setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = '../img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 31000);

const sprite020 = setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = '../img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 31500);

const sprite021 = setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 32000);

// Padrão 3 linha

const sprite022 = setTimeout(() => {

    planet05Y3 = document.createElement('img')
    planet05Y3.src = '../img/planet05.gif'
    planet05Y3.classList.add('planet-05-y3')
    gameBoard.appendChild(planet05Y3)
        
}, 34000);

const sprite023 = setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = '../img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 36000);

const sprite024 = setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = '../img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 36000);

const sprite025 = setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 38000);

const sprite026 = setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = '../img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 38000);

// Padrão 4 sobe desce

const sprite027 = setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = '../img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 41000);

const sprite028 = setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = '../img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 41500);

const sprite029 = setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = '../img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 42000);

const sprite030 = setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = '../img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 42500);

const sprite031 = setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 43000);

const sprite032 = setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 46000);

const sprite033 = setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = '../img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 46375);

const sprite034 = setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = '../img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 46750);

const sprite035 = setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = '../img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 47125);

const sprite036 = setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = '../img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 47500);

// Padrão 5

const sprite037 = setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = '../img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 49500);

const sprite038 = setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = '../img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 49500);

const sprite039 = setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 50500);

const sprite040 = setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = '../img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 52000);

const sprite041 = setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = '../img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 52000);

const sprite042 = setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = '../img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 53000);

// Padrão 6

const sprite043 = setTimeout(() => {
    
    planet01Y3 = document.createElement('img')
    planet01Y3.src = '../img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
    
}, 55000);

const sprite044 = setTimeout(() => {

    planet05Y3 = document.createElement('img')
    planet05Y3.src = '../img/planet05.gif'
    planet05Y3.classList.add('planet-05-y3')
    gameBoard.appendChild(planet05Y3)
        
}, 55500);

const sprite045 = setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = '../img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 56000);

const sprite046 = setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = '../img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 57000);

const sprite047 = setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = '../img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 58000);

const sprite048 = setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = '../img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 59000);

// Padrão 7 linha

const sprite049 = setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = '../img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 61000);

const sprite050 = setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = '../img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 61000);

const sprite051 = setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = '../img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 61000);

const sprite052 = setTimeout(() => {

    planet05Y1 = document.createElement('img')
    planet05Y1.src = '../img/planet05.gif'
    planet05Y1.classList.add('planet-05-y1')
    gameBoard.appendChild(planet05Y1)
        
}, 61000);

const sprite053 = setTimeout(() => {

    planet05Y5 = document.createElement('img')
    planet05Y5.src = '../img/planet05.gif'
    planet05Y5.classList.add('planet-05-y5')
    gameBoard.appendChild(planet05Y5)
        
}, 61000);

// Warning

const sprite054 = setTimeout(() => {

    var warning = document.createElement('img')
    warning.src = '../img/warning.png'
    warning.classList.add('warning')
    gameBoard.appendChild(warning)

    setTimeout(() => {

        boxBarrHpBoss.style.display = 'block'
        barrHpBoss.style.animation = "full-boss-hp 2s 1"
        
        setTimeout(() => {
        
            barrHpBoss.style.width = "100%"
                
        }, 1900);

    }, 1500);

    setTimeout(() => {

        gameBoard.removeChild(warning)
        
    }, 2900);

    clearTimeout(sprite000)
    clearTimeout(sprite001)
    clearTimeout(sprite002)
    clearTimeout(sprite003)
    clearTimeout(sprite004)
    clearTimeout(sprite005)
    clearTimeout(sprite006)
    clearTimeout(sprite007)
    clearTimeout(sprite008)
    clearTimeout(sprite009)
    clearTimeout(sprite010)
    clearTimeout(sprite011)
    clearTimeout(sprite012)
    clearTimeout(sprite013)
    clearTimeout(sprite014)
    clearTimeout(sprite015)
    clearTimeout(sprite016)
    clearTimeout(sprite017)
    clearTimeout(sprite018)
    clearTimeout(sprite019)
    clearTimeout(sprite020)
    clearTimeout(sprite021)
    clearTimeout(sprite022)
    clearTimeout(sprite023)
    clearTimeout(sprite024)
    clearTimeout(sprite025)
    clearTimeout(sprite026)
    clearTimeout(sprite027)
    clearTimeout(sprite028)
    clearTimeout(sprite029)
    clearTimeout(sprite030)
    clearTimeout(sprite031)
    clearTimeout(sprite032)
    clearTimeout(sprite033)
    clearTimeout(sprite034)
    clearTimeout(sprite035)
    clearTimeout(sprite036)
    clearTimeout(sprite037)
    clearTimeout(sprite038)
    clearTimeout(sprite039)
    clearTimeout(sprite040)
    clearTimeout(sprite041)
    clearTimeout(sprite042)
    clearTimeout(sprite043)
    clearTimeout(sprite044)
    clearTimeout(sprite045)
    clearTimeout(sprite046)
    clearTimeout(sprite047)
    clearTimeout(sprite048)
    clearTimeout(sprite049)
    clearTimeout(sprite050)
    clearTimeout(sprite051)
    clearTimeout(sprite052)
    clearTimeout(sprite053)

    clearInterval(colisaoP01Y1)
    clearInterval(colisaoP01Y2)
    clearInterval(colisaoP01Y3)
    clearInterval(colisaoP01Y4)
    clearInterval(colisaoP01Y5)

    clearInterval(colisaoP03Y1)
    clearInterval(colisaoP03Y2)
    clearInterval(colisaoP03Y3)
    clearInterval(colisaoP03Y4)
    clearInterval(colisaoP03Y5)

    clearInterval(colisaoP05Y1)
    clearInterval(colisaoP05Y2)
    clearInterval(colisaoP05Y3)
    clearInterval(colisaoP05Y4)
    clearInterval(colisaoP05Y5)

    clearInterval(bombP01Y1)
    clearInterval(bombP01Y2)
    clearInterval(bombP01Y3)
    clearInterval(bombP01Y4)
    clearInterval(bombP01Y5)

    clearInterval(bombP03Y1)
    clearInterval(bombP03Y2)
    clearInterval(bombP03Y3)
    clearInterval(bombP03Y4)
    clearInterval(bombP03Y5)

    clearInterval(bombP05Y1)
    clearInterval(bombP05Y2)
    clearInterval(bombP05Y3)
    clearInterval(bombP05Y4)
    clearInterval(bombP05Y5)

    clearInterval(heartP01Y1)
    clearInterval(heartP01Y2)
    clearInterval(heartP01Y3)
    clearInterval(heartP01Y4)
    clearInterval(heartP01Y5)

    clearInterval(heartP03Y1)
    clearInterval(heartP03Y2)
    clearInterval(heartP03Y3)
    clearInterval(heartP03Y4)
    clearInterval(heartP03Y5)

    clearInterval(heartP05Y1)
    clearInterval(heartP05Y2)
    clearInterval(heartP05Y3)
    clearInterval(heartP05Y4)
    clearInterval(heartP05Y5)

}, 68000);

// Padrão 8 e colisão shot/boss

const sprite055 = setTimeout(() => {

    var moonBoss = document.createElement('img')
    moonBoss.src = '../img/moon-boss.png'
    moonBoss.classList.add('moon-boss')
    gameBoard.appendChild(moonBoss)

    const colisaoBossY1 = setInterval(() => {


        var shot01Left = document.querySelector('.shot-position-1')
        shot01Left = Number(shot01Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot01Left >= 140 && moonBossLeft >= 100) {

            if (shot01Left >= (moonBossLeft + 100)) {

                var shot01Left = document.querySelector('.shot-position-1')
                gameBoard.removeChild(shot01Left)

            }

        }

    }, 10);

    const colisaoBossY2 = setInterval(() => {

        var shot02Left = document.querySelector('.shot-position-2')
        shot02Left = Number(shot02Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot02Left >= 140 && moonBossLeft >= 140) {

            if (shot02Left >= moonBossLeft) {

                var shot02Left = document.querySelector('.shot-position-2')
                gameBoard.removeChild(shot02Left)

            }

        }

    }, 10);

    const colisaoBossY3 = setInterval(() => {

        var shot03Left = document.querySelector('.shot-position-3')
        shot03Left = Number(shot03Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot03Left >= 140 && moonBossLeft >= 140) {

            if (shot03Left >= moonBossLeft) {

                var shot03Left = document.querySelector('.shot-position-3')
                hpMoonBoss = hpMoonBoss - shotHadukenDMG
                gameBoard.removeChild(shot03Left)

                if (hpMoonBoss == 30) {

                    moonBoss.src = '../img/moon-boss-30.png'

                }

                if (hpMoonBoss == 20) {

                    moonBoss.src = '../img/moon-boss-20.png'
                
                }

                if (hpMoonBoss == 10) {

                    moonBoss.src = '../img/moon-boss-10.png'
                
                }

                if (hpMoonBoss == 0) {

                    gameBoard.removeChild(moonBoss)
                    hpMoonBoss = 40

                    pointHpCat = hpCat * 1500
                    pointQtBomb = qtBomb * 4000
                    pointQtShotHaduken = qtShotHaduken * 100
                    qtPointsFinal = pointHpCat + pointQtBomb + pointQtShotHaduken

                    var explosionMoonBoos = document.createElement('img')
                    explosionMoonBoos.src = '../img/boss-explosion.gif'
                    explosionMoonBoos.classList.add('boss-explosion')
                    explosionMoonBoos.style.top = `0`
                    explosionMoonBoos.style.left = `${moonBossLeft}px`
                    gameBoard.appendChild(explosionMoonBoos)

                    setTimeout(() => {
                        
                        gameBoard.removeChild(explosionMoonBoos)
                        
                    }, 1790);

                    setTimeout(() => {

                        var missionComplete = document.createElement('img')
                        missionComplete.src = '../img/mission-complete.gif'
                        missionComplete.classList.add('mission-complete')
                        gameBoard.appendChild(missionComplete)

                        setTimeout(() => {

                            gameBoard.removeChild(missionComplete)
                            
                        }, 5000);
 
                    }, 2000);

                    setTimeout(() => {

                        var msgPointsFinal = document.createElement('div')
                        msgPointsFinal.classList.add('points-final')
                        msgPointsFinal.innerHTML = `<h2>POINTS:</h1> <br>
                                                    <h2>HP:.....${pointHpCat}pts</h2>
                                                    <h2>BOMB:...${pointQtBomb}pts</h2>
                                                    <h2>SHOTS:..${pointQtShotHaduken}pts</h2>
                                                    <h1>TOTAL: ${qtPointsFinal}pts</h1>
                                                    <a href="../map/map.html" class="button-stage-complete">NEXT STAGE</a>
                                                    <a href="#" class="button-stage-complete" onclick="retry()">RETRY</a>`
                        gameBoard.appendChild(msgPointsFinal)

                        if (qtPointsFinal >= 10000) {

                            var perfectStage = document.createElement('img')
                            perfectStage.src = '../img/cat-perfect-stage.jpg'
                            perfectStage.classList.add('perfect-stage')
                            msgPointsFinal.appendChild(perfectStage)

                            var perfectStageMsg = document.createElement('div')
                            perfectStageMsg.classList.add('perfect-stage-msg')
                            perfectStageMsg.innerHTML = `<h2><b>YOU ARE AWESOME!!</b></h2>`
                            msgPointsFinal.appendChild(perfectStageMsg)
                        }
 
                    }, 6500);
                
                    setTimeout(() => {

                        stageComplete = true

                    }, 6500);

                    clearInterval(heartMoonBoss)

                    clearInterval(colisaoBossY1)
                    clearInterval(colisaoBossY2)
                    clearInterval(colisaoBossY3)
                    clearInterval(colisaoBossY4)
                    clearInterval(colisaoBossY5)
                
                }

                valueBarrHpBoss = valueBarrHpBoss - (100/(hpMoonBossFixed))
                barrHpBoss.style.width = `${valueBarrHpBoss}%`

            }

        }

    }, 10);

    const colisaoBossY4 = setInterval(() => {

        var shot04Left = document.querySelector('.shot-position-4')
        shot04Left = Number(shot04Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot04Left >= 140 && moonBossLeft >= 140) {

            if (shot04Left >= moonBossLeft) {

                var shot04Left = document.querySelector('.shot-position-4')
                gameBoard.removeChild(shot04Left)

            }

        }

    }, 10);

    const colisaoBossY5 = setInterval(() => {

        var shot05Left = document.querySelector('.shot-position-5')
        shot05Left = Number(shot05Left.offsetLeft)
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot05Left >= 140 && moonBossLeft >= 100) {

            if (shot05Left >= (moonBossLeft + 100)) {

                var shot05Left = document.querySelector('.shot-position-5')
                gameBoard.removeChild(shot05Left)

            }

        }

    }, 10);

}, 72000);

// Colisões shot/planet01

const colisaoP01Y1 = setInterval(() => {

    var shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)
    var planet01Y1Left = document.querySelector('.planet-01-y1')
    planet01Y1Left = Number(planet01Y1.offsetLeft)

    if (shot01Left >= 140 && planet01Y1Left >= 140) {

        if (shot01Left >= planet01Y1Left) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet01Y1 = hpPlanet01Y1 - shotHadukenDMG
            gameBoard.removeChild(shot01Left)

            if (hpPlanet01Y1 == 0) {

                gameBoard.removeChild(planet01Y1)
                hpPlanet01Y1 = 1

                var explosionPlanet01Y1 = document.createElement('img')
                explosionPlanet01Y1.src = '../img/explosion-planet-01-y1.gif'
                explosionPlanet01Y1.classList.add('explosion-planet')
                explosionPlanet01Y1.style.top = `0`
                explosionPlanet01Y1.style.left = `${planet01Y1Left}px`
                gameBoard.appendChild(explosionPlanet01Y1)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y1)

                }, 963);

            }

        }

    }

}, 100);

const bombP01Y1 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y1)
        hpPlanet01Y1 = 1

    }

}, 100);

const colisaoP01Y2 = setInterval(() => {

    var shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)
    var planet01Y2Left = document.querySelector('.planet-01-y2')
    planet01Y2Left = Number(planet01Y2.offsetLeft)

    if (shot02Left >= 140 && planet01Y2Left >= 140) {

        if (shot02Left >= planet01Y2Left) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet01Y2 = hpPlanet01Y2 - shotHadukenDMG
            gameBoard.removeChild(shot02Left)

            if (hpPlanet01Y2 == 0) {

                gameBoard.removeChild(planet01Y2)
                hpPlanet01Y2 = 1

                var explosionPlanet01Y2 = document.createElement('img')
                explosionPlanet01Y2.src = '../img/explosion-planet-01-y2.gif'
                explosionPlanet01Y2.classList.add('explosion-planet')
                explosionPlanet01Y2.style.top = `120px`
                explosionPlanet01Y2.style.left = `${planet01Y2Left}px`
                gameBoard.appendChild(explosionPlanet01Y2)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y2)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP01Y2 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y2)
        hpPlanet01Y2 = 1

    }

}, 100);

const colisaoP01Y3 = setInterval(() => {

    var shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)
    var planet01Y3Left = document.querySelector('.planet-01-y3')
    planet01Y3Left = Number(planet01Y3.offsetLeft)

    if (shot03Left >= 140 && planet01Y3Left >= 140) {

        if (shot03Left >= planet01Y3Left) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet01Y3 = hpPlanet01Y3 - shotHadukenDMG
            gameBoard.removeChild(shot03Left)

            if (hpPlanet01Y3 == 0) {

                gameBoard.removeChild(planet01Y3)
                hpPlanet01Y3 = 1

                var explosionPlanet01Y3 = document.createElement('img')
                explosionPlanet01Y3.src = '../img/explosion-planet-01-y3.gif'
                explosionPlanet01Y3.classList.add('explosion-planet')
                explosionPlanet01Y3.style.top = `240px`
                explosionPlanet01Y3.style.left = `${planet01Y3Left}px`
                gameBoard.appendChild(explosionPlanet01Y3)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y3)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP01Y3 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y3)
        hpPlanet01Y3 = 1

    }

}, 100);

const colisaoP01Y4 = setInterval(() => {

    var shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)
    var planet01Y4Left = document.querySelector('.planet-01-y4')
    planet01Y4Left = Number(planet01Y4.offsetLeft)

    if (shot04Left >= 140 && planet01Y4Left >= 140) {

        if (shot04Left >= planet01Y4Left) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet01Y4 = hpPlanet01Y4 - shotHadukenDMG
            gameBoard.removeChild(shot04Left)

            if (hpPlanet01Y4 == 0) {

                gameBoard.removeChild(planet01Y4)
                hpPlanet01Y4 = 1

                var explosionPlanet01Y4 = document.createElement('img')
                explosionPlanet01Y4.src = '../img/explosion-planet-01-y4.gif'
                explosionPlanet01Y4.classList.add('explosion-planet')
                explosionPlanet01Y4.style.top = `360px`
                explosionPlanet01Y4.style.left = `${planet01Y4Left}px`
                gameBoard.appendChild(explosionPlanet01Y4)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y4)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP01Y4 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y4)
        hpPlanet01Y4 = 1

    }

}, 100);

const colisaoP01Y5 = setInterval(() => {

    var shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)
    var planet01Y5Left = document.querySelector('.planet-01-y5')
    planet01Y5Left = Number(planet01Y5.offsetLeft)

    if (shot05Left >= 140 && planet01Y5Left >= 140) {

        if (shot05Left >= planet01Y5Left) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet01Y5 = hpPlanet01Y5 - shotHadukenDMG
            gameBoard.removeChild(shot05Left)

            if (hpPlanet01Y5 == 0) {

                gameBoard.removeChild(planet01Y5)
                hpPlanet01Y5 = 1

                var explosionPlanet01Y5 = document.createElement('img')
                explosionPlanet01Y5.src = '../img/explosion-planet-01-y5.gif'
                explosionPlanet01Y5.classList.add('explosion-planet')
                explosionPlanet01Y5.style.top = `480px`
                explosionPlanet01Y5.style.left = `${planet01Y5Left}px`
                gameBoard.appendChild(explosionPlanet01Y5)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet01Y5)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP01Y5 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet01Y5)
        hpPlanet01Y5 = 1

    }

}, 100);

// Colisões shot/planet03

const colisaoP03Y1 = setInterval(() => {

    var shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)
    var planet03Y1Left = document.querySelector('.planet-03-y1')
    planet03Y1Left = Number(planet03Y1.offsetLeft)

    if (shot01Left >= 140 && planet03Y1Left >= 140) {

        if (shot01Left >= planet03Y1Left) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet03Y1 = hpPlanet03Y1 - shotHadukenDMG
            gameBoard.removeChild(shot01Left)

            if (hpPlanet03Y1 == 0) {

                gameBoard.removeChild(planet03Y1)
                hpPlanet03Y1 = 3

                var explosionPlanet03Y1 = document.createElement('img')
                explosionPlanet03Y1.src = '../img/explosion-planet-03-y1.gif'
                explosionPlanet03Y1.classList.add('explosion-planet')
                explosionPlanet03Y1.style.top = `0`
                explosionPlanet03Y1.style.left = `${planet03Y1Left}px`
                gameBoard.appendChild(explosionPlanet03Y1)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y1)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP03Y1 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y1)
        hpPlanet03Y1 = 3

    }

}, 100);

const colisaoP03Y2 = setInterval(() => {

    var shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)
    var planet03Y2Left = document.querySelector('.planet-03-y2')
    planet03Y2Left = Number(planet03Y2.offsetLeft)

    if (shot02Left >= 140 && planet03Y2Left >= 140) {

        if (shot02Left >= planet03Y2Left) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet03Y2 = hpPlanet03Y2 - shotHadukenDMG
            gameBoard.removeChild(shot02Left)

            if (hpPlanet03Y2 == 0) {

                gameBoard.removeChild(planet03Y2)
                hpPlanet03Y2 = 3

                var explosionPlanet03Y2 = document.createElement('img')
                explosionPlanet03Y2.src = '../img/explosion-planet-03-y2.gif'
                explosionPlanet03Y2.classList.add('explosion-planet')
                explosionPlanet03Y2.style.top = `120px`
                explosionPlanet03Y2.style.left = `${planet03Y2Left}px`
                gameBoard.appendChild(explosionPlanet03Y2)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y2)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP03Y2 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y2)
        hpPlanet03Y2 = 3

    }

}, 100);

const colisaoP03Y3 = setInterval(() => {

    var shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)
    var planet03Y3Left = document.querySelector('.planet-03-y3')
    planet03Y3Left = Number(planet03Y3.offsetLeft)

    if (shot03Left >= 140 && planet03Y3Left >= 140) {

        if (shot03Left >= planet03Y3Left) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet03Y3 = hpPlanet03Y3 - shotHadukenDMG
            gameBoard.removeChild(shot03Left)

            if (hpPlanet03Y3 == 0) {

                gameBoard.removeChild(planet03Y3)
                hpPlanet03Y3 = 3

                var explosionPlanet03Y3 = document.createElement('img')
                explosionPlanet03Y3.src = '../img/explosion-planet-03-y3.gif'
                explosionPlanet03Y3.classList.add('explosion-planet')
                explosionPlanet03Y3.style.top = `240px`
                explosionPlanet03Y3.style.left = `${planet03Y3Left}px`
                gameBoard.appendChild(explosionPlanet03Y3)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y3)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP03Y3 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y3)
        hpPlanet03Y3 = 3

    }

}, 100);

const colisaoP03Y4 = setInterval(() => {

    var shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)
    var planet03Y4Left = document.querySelector('.planet-03-y4')
    planet03Y4Left = Number(planet03Y4.offsetLeft)

    if (shot04Left >= 140 && planet03Y4Left >= 140) {

        if (shot04Left >= planet03Y4Left) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet03Y4 = hpPlanet03Y4 - shotHadukenDMG
            gameBoard.removeChild(shot04Left)

            if (hpPlanet03Y4 == 0) {

                gameBoard.removeChild(planet03Y4)
                hpPlanet03Y4 = 3

                var explosionPlanet03Y4 = document.createElement('img')
                explosionPlanet03Y4.src = '../img/explosion-planet-03-y4.gif'
                explosionPlanet03Y4.classList.add('explosion-planet')
                explosionPlanet03Y4.style.top = `360px`
                explosionPlanet03Y4.style.left = `${planet03Y4Left}px`
                gameBoard.appendChild(explosionPlanet03Y4)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y4)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP03Y4 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y4)
        hpPlanet03Y4 = 3

    }

}, 100);

const colisaoP03Y5 = setInterval(() => {

    var shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)
    var planet03Y5Left = document.querySelector('.planet-03-y5')
    planet03Y5Left = Number(planet03Y5.offsetLeft)

    if (shot05Left >= 140 && planet03Y5Left >= 140) {

        if (shot05Left >= planet03Y5Left) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet03Y5 = hpPlanet03Y5 - shotHadukenDMG
            gameBoard.removeChild(shot05Left)

            if (hpPlanet03Y5 == 0) {

                gameBoard.removeChild(planet03Y5)
                hpPlanet03Y5 = 3

                var explosionPlanet03Y5 = document.createElement('img')
                explosionPlanet03Y5.src = '../img/explosion-planet-03-y5.gif'
                explosionPlanet03Y5.classList.add('explosion-planet')
                explosionPlanet03Y5.style.top = `480px`
                explosionPlanet03Y5.style.left = `${planet03Y5Left}px`
                gameBoard.appendChild(explosionPlanet03Y5)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet03Y5)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP03Y5 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet03Y5)
        hpPlanet03Y5 = 3

    }

}, 100);

// Colisões shot/planet05

const colisaoP05Y1 = setInterval(() => {

    var shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)
    var planet05Y1Left = document.querySelector('.planet-05-y1')
    planet05Y1Left = Number(planet05Y1.offsetLeft)

    if (shot01Left >= 140 && planet05Y1Left >= 140) {

        if (shot01Left >= planet05Y1Left) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet05Y1 = hpPlanet05Y1 - shotHadukenDMG
            gameBoard.removeChild(shot01Left)

            if (hpPlanet05Y1 == 0) {

                gameBoard.removeChild(planet05Y1)
                hpPlanet05Y1 = 5

                var explosionPlanet05Y1 = document.createElement('img')
                explosionPlanet05Y1.src = '../img/explosion-planet-05-y1.gif'
                explosionPlanet05Y1.classList.add('explosion-planet')
                explosionPlanet05Y1.style.top = `0`
                explosionPlanet05Y1.style.left = `${planet05Y1Left}px`
                gameBoard.appendChild(explosionPlanet05Y1)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y1)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP05Y1 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y1)
        hpPlanet05Y1 = 5

    }

}, 100);

const colisaoP05Y2 = setInterval(() => {

    var shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)
    var planet05Y2Left = document.querySelector('.planet-05-y2')
    planet05Y2Left = Number(planet05Y2.offsetLeft)

    if (shot02Left >= 140 && planet05Y2Left >= 140) {

        if (shot02Left >= planet05Y2Left) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet05Y2 = hpPlanet05Y2 - shotHadukenDMG
            gameBoard.removeChild(shot02Left)

            if (hpPlanet05Y2 == 0) {

                gameBoard.removeChild(planet05Y2)
                hpPlanet05Y2 = 5

                var explosionPlanet05Y2 = document.createElement('img')
                explosionPlanet05Y2.src = '../img/explosion-planet-05-y2.gif'
                explosionPlanet05Y2.classList.add('explosion-planet')
                explosionPlanet05Y2.style.top = `120px`
                explosionPlanet05Y2.style.left = `${planet05Y2Left}px`
                gameBoard.appendChild(explosionPlanet05Y2)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y2)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP05Y2 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y2)
        hpPlanet05Y2 = 5

    }

}, 100);

const colisaoP05Y3 = setInterval(() => {

    var shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)
    var planet05Y3Left = document.querySelector('.planet-05-y3')
    planet05Y3Left = Number(planet05Y3.offsetLeft)

    if (shot03Left >= 140 && planet05Y3Left >= 140) {

        if (shot03Left >= planet05Y3Left) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet05Y3 = hpPlanet05Y3 - shotHadukenDMG
            gameBoard.removeChild(shot03Left)

            if (hpPlanet05Y3 == 0) {

                gameBoard.removeChild(planet05Y3)
                hpPlanet05Y3 = 5

                var explosionPlanet05Y3 = document.createElement('img')
                explosionPlanet05Y3.src = '../img/explosion-planet-05-y3.gif'
                explosionPlanet05Y3.classList.add('explosion-planet')
                explosionPlanet05Y3.style.top = `240px`
                explosionPlanet05Y3.style.left = `${planet05Y3Left}px`
                gameBoard.appendChild(explosionPlanet05Y3)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y3)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP05Y3 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y3)
        hpPlanet05Y3 = 5

    }

}, 100);

const colisaoP05Y4 = setInterval(() => {

    var shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)
    var planet05Y4Left = document.querySelector('.planet-05-y4')
    planet05Y4Left = Number(planet05Y4.offsetLeft)

    if (shot04Left >= 140 && planet05Y4Left >= 140) {

        if (shot04Left >= planet05Y4Left) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet05Y4 = hpPlanet05Y4 - shotHadukenDMG
            gameBoard.removeChild(shot04Left)

            if (hpPlanet05Y4 == 0) {

                gameBoard.removeChild(planet05Y4)
                hpPlanet05Y4 = 5

                var explosionPlanet05Y4 = document.createElement('img')
                explosionPlanet05Y4.src = '../img/explosion-planet-05-y4.gif'
                explosionPlanet05Y4.classList.add('explosion-planet')
                explosionPlanet05Y4.style.top = `360px`
                explosionPlanet05Y4.style.left = `${planet05Y4Left}px`
                gameBoard.appendChild(explosionPlanet05Y4)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y4)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP05Y4 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y4)
        hpPlanet05Y4 = 5

    }

}, 100);

const colisaoP05Y5 = setInterval(() => {

    var shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)
    var planet05Y5Left = document.querySelector('.planet-05-y5')
    planet05Y5Left = Number(planet05Y5.offsetLeft)

    if (shot05Left >= 140 && planet05Y5Left >= 140) {

        if (shot05Left >= planet05Y5Left) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet05Y5 = hpPlanet05Y5 - shotHadukenDMG
            gameBoard.removeChild(shot05Left)

            if (hpPlanet05Y5 == 0) {

                gameBoard.removeChild(planet05Y5)
                hpPlanet05Y5 = 5

                var explosionPlanet05Y5 = document.createElement('img')
                explosionPlanet05Y5.src = '../img/explosion-planet-05-y5.gif'
                explosionPlanet05Y5.classList.add('explosion-planet')
                explosionPlanet05Y5.style.top = `480px`
                explosionPlanet05Y5.style.left = `${planet05Y5Left}px`
                gameBoard.appendChild(explosionPlanet05Y5)

                setTimeout(() => {

                    gameBoard.removeChild(explosionPlanet05Y5)

                }, 963);
            
            }

        }

    }

}, 100);

const bombP05Y5 = setInterval(() => {

    if (bombValue == 1) {
        
        gameBoard.removeChild(planet05Y5)
        hpPlanet05Y5 = 5

    }

}, 100);

// Sistema de Hp

const heartP01Y1 = setInterval(() => {
    
    var planet01Y1Left = document.querySelector('.planet-01-y1')
    planet01Y1Left = Number(planet01Y1.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet01Y1Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y1)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet01Y1 = 1

    }
    
}, 50);

const heartP01Y2 = setInterval(() => {
    
    var planet01Y2Left = document.querySelector('.planet-01-y2')
    planet01Y2Left = Number(planet01Y2.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet01Y2Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y2)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet01Y2 = 1

    }
    
}, 50);

const heartP01Y3 = setInterval(() => {
    
    var planet01Y3Left = document.querySelector('.planet-01-y3')
    planet01Y3Left = Number(planet01Y3.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet01Y3Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y3)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet01Y3 = 1

    }
    
}, 50);

const heartP01Y4 = setInterval(() => {
    
    var planet01Y4Left = document.querySelector('.planet-01-y4')
    planet01Y4Left = Number(planet01Y4.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet01Y4Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y4)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet01Y4 = 1

    }
    
}, 50);

const heartP01Y5 = setInterval(() => {
    
    var planet01Y5Left = document.querySelector('.planet-01-y5')
    planet01Y5Left = Number(planet01Y5.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet01Y5Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet01Y5)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet01Y5 = 1

    }
    
}, 50);

const heartP03Y1 = setInterval(() => {
    
    var planet03Y1Left = document.querySelector('.planet-03-y1')
    planet03Y1Left = Number(planet03Y1.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet03Y1Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y1)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y1 = 3

    }
    
}, 50);

const heartP03Y2 = setInterval(() => {
    
    var planet03Y2Left = document.querySelector('.planet-03-y2')
    planet03Y2Left = Number(planet03Y2.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet03Y2Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y2)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y2 = 3

    }
    
}, 50);

const heartP03Y3 = setInterval(() => {
    
    var planet03Y3Left = document.querySelector('.planet-03-y3')
    planet03Y3Left = Number(planet03Y3.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet03Y3Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y3)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y3 = 3

    }
    
}, 50);

const heartP03Y4 = setInterval(() => {
    
    var planet03Y4Left = document.querySelector('.planet-03-y4')
    planet03Y4Left = Number(planet03Y4.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet03Y4Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y4)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y4 = 3

    }
    
}, 50);

const heartP03Y5 = setInterval(() => {
    
    var planet03Y5Left = document.querySelector('.planet-03-y5')
    planet03Y5Left = Number(planet03Y5.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet03Y5Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet03Y5)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet03Y5 = 3

    }
    
}, 50);

const heartP05Y1 = setInterval(() => {
    
    var planet05Y1Left = document.querySelector('.planet-05-y1')
    planet05Y1Left = Number(planet05Y1.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet05Y1Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y1)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y1 = 5

    }
    
}, 50);

const heartP05Y2 = setInterval(() => {
    
    var planet05Y2Left = document.querySelector('.planet-05-y2')
    planet05Y2Left = Number(planet05Y2.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet05Y2Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y2)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y2 = 5

    }
    
}, 50);

const heartP05Y3 = setInterval(() => {
    
    var planet05Y3Left = document.querySelector('.planet-05-y3')
    planet05Y3Left = Number(planet05Y3.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet05Y3Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y3)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y3 = 5

    }
    
}, 50);

const heartP05Y4 = setInterval(() => {
    
    var planet05Y4Left = document.querySelector('.planet-05-y4')
    planet05Y4Left = Number(planet05Y4.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet05Y4Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y4)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y4 = 5

    }
    
}, 50);

const heartP05Y5 = setInterval(() => {
    
    var planet05Y5Left = document.querySelector('.planet-05-y5')
    planet05Y5Left = Number(planet05Y5.offsetLeft)
    var heartCat = document.querySelector('.heart-active')

    if (planet05Y5Left <= -55 && hpCat > 0) {

        gameBoard.removeChild(planet05Y5)
        heartStatus.removeChild(heartCat)
        hpCat--
        hpPlanet05Y5 = 5

    }
    
}, 50);

const heartMoonBoss = setInterval(() => {
    
        var moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

    if (moonBossLeft <= -55 && hpCat > 0) {
   
        heartStatus.innerHTML = ""
        hpCat = 0

    }
    
}, 50);

// Game Over verificação

function catThumbsUp() {

    imgCatGameOver.src = '../img/cat-thumbs-up.jpg'
    
}
  
function catSad() {

    imgCatGameOver.src = '../img/cat-game-over.jpg'
    
}

const gameOverVerification = setInterval(() => {

    if (hpCat <= 0 || stageComplete) {

        gameOver = true

        if (gameOver == true) {

            clearTimeout(sprite000)
            clearTimeout(sprite001)
            clearTimeout(sprite002)
            clearTimeout(sprite003)
            clearTimeout(sprite004)
            clearTimeout(sprite005)
            clearTimeout(sprite006)
            clearTimeout(sprite007)
            clearTimeout(sprite008)
            clearTimeout(sprite009)
            clearTimeout(sprite010)
            clearTimeout(sprite011)
            clearTimeout(sprite012)
            clearTimeout(sprite013)
            clearTimeout(sprite014)
            clearTimeout(sprite015)
            clearTimeout(sprite016)
            clearTimeout(sprite017)
            clearTimeout(sprite018)
            clearTimeout(sprite019)
            clearTimeout(sprite020)
            clearTimeout(sprite021)
            clearTimeout(sprite022)
            clearTimeout(sprite023)
            clearTimeout(sprite024)
            clearTimeout(sprite025)
            clearTimeout(sprite026)
            clearTimeout(sprite027)
            clearTimeout(sprite028)
            clearTimeout(sprite029)
            clearTimeout(sprite030)
            clearTimeout(sprite031)
            clearTimeout(sprite032)
            clearTimeout(sprite033)
            clearTimeout(sprite034)
            clearTimeout(sprite035)
            clearTimeout(sprite036)
            clearTimeout(sprite037)
            clearTimeout(sprite038)
            clearTimeout(sprite039)
            clearTimeout(sprite040)
            clearTimeout(sprite041)
            clearTimeout(sprite042)
            clearTimeout(sprite043)
            clearTimeout(sprite044)
            clearTimeout(sprite045)
            clearTimeout(sprite046)
            clearTimeout(sprite047)
            clearTimeout(sprite048)
            clearTimeout(sprite049)
            clearTimeout(sprite050)
            clearTimeout(sprite051)
            clearTimeout(sprite052)
            clearTimeout(sprite053)
            clearTimeout(sprite054)
            clearTimeout(sprite055)

            clearInterval(colisaoP01Y1)
            clearInterval(colisaoP01Y2)
            clearInterval(colisaoP01Y3)
            clearInterval(colisaoP01Y4)
            clearInterval(colisaoP01Y5)

            clearInterval(colisaoP03Y1)
            clearInterval(colisaoP03Y2)
            clearInterval(colisaoP03Y3)
            clearInterval(colisaoP03Y4)
            clearInterval(colisaoP03Y5)

            clearInterval(colisaoP05Y1)
            clearInterval(colisaoP05Y2)
            clearInterval(colisaoP05Y3)
            clearInterval(colisaoP05Y4)
            clearInterval(colisaoP05Y5)

            clearInterval(bombP01Y1)
            clearInterval(bombP01Y2)
            clearInterval(bombP01Y3)
            clearInterval(bombP01Y4)
            clearInterval(bombP01Y5)

            clearInterval(bombP03Y1)
            clearInterval(bombP03Y2)
            clearInterval(bombP03Y3)
            clearInterval(bombP03Y4)
            clearInterval(bombP03Y5)

            clearInterval(bombP05Y1)
            clearInterval(bombP05Y2)
            clearInterval(bombP05Y3)
            clearInterval(bombP05Y4)
            clearInterval(bombP05Y5)

            clearInterval(heartP01Y1)
            clearInterval(heartP01Y2)
            clearInterval(heartP01Y3)
            clearInterval(heartP01Y4)
            clearInterval(heartP01Y5)

            clearInterval(heartP03Y1)
            clearInterval(heartP03Y2)
            clearInterval(heartP03Y3)
            clearInterval(heartP03Y4)
            clearInterval(heartP03Y5)

            clearInterval(heartP05Y1)
            clearInterval(heartP05Y2)
            clearInterval(heartP05Y3)
            clearInterval(heartP05Y4)
            clearInterval(heartP05Y5)

            clearInterval(heartMoonBoss)

            if (hpCat <= 0) {

                retryMsg.style.display = 'block'

            }
                
        }

    }
    
}, 100);

function retry() {

    location.reload()

}