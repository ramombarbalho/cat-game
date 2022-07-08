// Declarações iniciais

var gameBoard = document.querySelector('.game-board')
var cat = document.querySelector('.cat')
var shotPosition = 3

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

// Funções que fazem a movimentação do personagem com o click

function move0() {

    cat.style.top = "0px"
    shotPosition = 1

}

function move1() {

    cat.style.top = "120px"
    shotPosition = 2

}

function move2() {

    cat.style.top = "240px"
    shotPosition = 3

}

function move3() {

    cat.style.top = "360px"
    shotPosition = 4
    
}

function move4() {

    cat.style.top = "480px"
    shotPosition = 5

}

// Função que permite o disparo e o faz desparecer após sair do game-board

onkeyup = function shotting() {

    
    if (shotPosition == 1) {
        
        var shot1 = document.createElement('img')
        shot1.src = './img/shot.gif'
        shot1.classList.add('shot-position-1')
        gameBoard.appendChild(shot1)
        
        setTimeout(() => {
            gameBoard.removeChild(shot1)
        }
        , 2000)
        
    }

    if (shotPosition == 2) {

        var shot2 = document.createElement('img')
        shot2.src = './img/shot.gif'
        shot2.classList.add('shot-position-2')
        gameBoard.appendChild(shot2)
        
        setTimeout(() => {
            gameBoard.removeChild(shot2)
        }
        , 2000)
        
    }
    
    if (shotPosition == 3) {
        
        var shot3 = document.createElement('img')
        shot3.src = './img/shot.gif'
        shot3.classList.add('shot-position-3')
        gameBoard.appendChild(shot3)
        
        setTimeout(() => {
            gameBoard.removeChild(shot3)
        }
        , 2000)
        
    }
    
    if (shotPosition == 4) {
        
        var shot4 = document.createElement('img')
        shot4.src = './img/shot.gif'
        shot4.classList.add('shot-position-4')
        gameBoard.appendChild(shot4)
        
        setTimeout(() => {
            gameBoard.removeChild(shot4)
        }
        , 2000)
        
    }
    
    if (shotPosition == 5) {
    
        var shot5 = document.createElement('img')
        shot5.src = './img/shot.gif'
        shot5.classList.add('shot-position-5')
        gameBoard.appendChild(shot5)
        
        setTimeout(() => {
            gameBoard.removeChild(shot5)
        }
        , 2000)
    
    }
    
}

// Ordem dos sprites inimigos (em qual tempo e posição irão surgir)

// Padrão 1

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 4000);

setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = './img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 6500);

setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = './img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 9000);

setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = './img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 11500);

setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = './img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 12000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 13500);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 15000);

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 17000);

setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 17500);

setTimeout(() => {

    planet05Y3 = document.createElement('img')
    planet05Y3.src = './img/planet05.gif'
    planet05Y3.classList.add('planet-05-y3')
    gameBoard.appendChild(planet05Y3)
        
}, 19000);

// Padrão 2 desce sobe

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 23000);

setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = './img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 24000);

setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = './img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 25000);

setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = './img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 26000);

setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = './img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 27000);

setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = './img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 29000);

setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = './img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 29500);

setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = './img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 30000);

setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = './img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 30500);

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 31000);

// Padrão 3 linha

setTimeout(() => {

    planet05Y3 = document.createElement('img')
    planet05Y3.src = './img/planet05.gif'
    planet05Y3.classList.add('planet-05-y3')
    gameBoard.appendChild(planet05Y3)
        
}, 34000);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 36000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 36000);

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 38000);

setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = './img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 38000);

// Padrão 4 sobe desce

setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = './img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 41000);

setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = './img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 41500);

setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = './img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 42000);

setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = './img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 42500);

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 43000);

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 45000);

setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = './img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 45375);

setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = './img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 45750);

setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = './img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 46125);

setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = './img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 46500);

// Padrão 5

setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 48500);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 48500);

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 49500);

setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 51000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 51000);

setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = './img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 52000);

// Padrão 6

setTimeout(() => {
    
    planet01Y3 = document.createElement('img')
    planet01Y3.src = './img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
    
}, 54000);

setTimeout(() => {

    planet05Y3 = document.createElement('img')
    planet05Y3.src = './img/planet05.gif'
    planet05Y3.classList.add('planet-05-y3')
    gameBoard.appendChild(planet05Y3)
        
}, 54500);

setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = './img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 55000);

setTimeout(() => {

    planet01Y4 = document.createElement('img')
    planet01Y4.src = './img/planet01.gif'
    planet01Y4.classList.add('planet-01-y4')
    gameBoard.appendChild(planet01Y4)
        
}, 56000);

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 57000);

setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = './img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 58000);

// Padrão 7 linha

setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = './img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 60000);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 60000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 60000);

setTimeout(() => {

    planet05Y1 = document.createElement('img')
    planet05Y1.src = './img/planet05.gif'
    planet05Y1.classList.add('planet-05-y1')
    gameBoard.appendChild(planet05Y1)
        
}, 60000);

setTimeout(() => {

    planet05Y5 = document.createElement('img')
    planet05Y5.src = './img/planet05.gif'
    planet05Y5.classList.add('planet-05-y5')
    gameBoard.appendChild(planet05Y5)
        
}, 60000);

// Padrão 8 e colisão shot/boss

setTimeout(() => {

    moonBoss = document.createElement('img')
    moonBoss.src = './img/moon-boss.png'
    moonBoss.classList.add('moon-boss')
    gameBoard.appendChild(moonBoss)

    setInterval(() => {


        shot01Left = document.querySelector('.shot-position-1')
        shot01Left = Number(shot01Left.offsetLeft)

        moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot01Left >= 140 && moonBossLeft >= 100) {

            if (shot01Left >= (moonBossLeft + 100)) {

                var shot01Left = document.querySelector('.shot-position-1')
                gameBoard.removeChild(shot01Left)

            }

        }

    }, 10);

    setInterval(() => {

        shot02Left = document.querySelector('.shot-position-2')
        shot02Left = Number(shot02Left.offsetLeft)

        moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot02Left >= 140 && moonBossLeft >= 140) {

            if (shot02Left >= moonBossLeft) {

                var shot02Left = document.querySelector('.shot-position-2')
                gameBoard.removeChild(shot02Left)

            }

        }

    }, 10);

    setInterval(() => {

        shot03Left = document.querySelector('.shot-position-3')
        shot03Left = Number(shot03Left.offsetLeft)


        moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot03Left >= 140 && moonBossLeft >= 140) {

            if (shot03Left >= moonBossLeft) {

                var shot03Left = document.querySelector('.shot-position-3')
                hpMoonBoss--
                gameBoard.removeChild(shot03Left)

                if (hpMoonBoss == 0) {

                    gameBoard.removeChild(moonBoss)
                    hpMoonBoss = 40
                
                }

            }

        }

    }, 10);

    setInterval(() => {

        shot04Left = document.querySelector('.shot-position-4')
        shot04Left = Number(shot04Left.offsetLeft)

        moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot04Left >= 140 && moonBossLeft >= 140) {

            if (shot04Left >= moonBossLeft) {

                var shot04Left = document.querySelector('.shot-position-4')
                gameBoard.removeChild(shot04Left)

            }

        }

    }, 10);

    setInterval(() => {

        shot05Left = document.querySelector('.shot-position-5')
        shot05Left = Number(shot05Left.offsetLeft)

        moonBossLeft = document.querySelector('.moon-boss')
        moonBossLeft = Number(moonBossLeft.offsetLeft)

        if (shot05Left >= 140 && moonBossLeft >= 100) {

            if (shot05Left >= (moonBossLeft + 100)) {

                var shot05Left = document.querySelector('.shot-position-5')
                gameBoard.removeChild(shot05Left)

            }

        }

    }, 10);

}, 1000);


// Colisões shot/planet01

setInterval(() => {

    shot05Left = document.querySelector('.shot-position-1')
    shot05Left = Number(shot05Left.offsetLeft)
    planet01Y1Left = document.querySelector('.planet-01-y1')
    planet01Y1Left = Number(planet01Y1.offsetLeft)

    if (shot05Left >= 140 && planet01Y1Left >= 140) {

        if (shot05Left >= planet01Y1Left) {

            var shot05Left = document.querySelector('.shot-position-1')
            hpPlanet01Y1--
            gameBoard.removeChild(shot05Left)

            if (hpPlanet01Y1 == 0) {

                gameBoard.removeChild(planet01Y1)
                hpPlanet01Y1 = 1
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)
    planet01Y2Left = document.querySelector('.planet-01-y2')
    planet01Y2Left = Number(planet01Y2.offsetLeft)

    if (shot02Left >= 140 && planet01Y2Left >= 140) {

        if (shot02Left >= planet01Y2Left) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet01Y2--
            gameBoard.removeChild(shot02Left)

            if (hpPlanet01Y2 == 0) {

                gameBoard.removeChild(planet01Y2)
                hpPlanet01Y2 = 1
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)
    planet01Y3Left = document.querySelector('.planet-01-y3')
    planet01Y3Left = Number(planet01Y3.offsetLeft)

    if (shot03Left >= 140 && planet01Y3Left >= 140) {

        if (shot03Left >= planet01Y3Left) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet01Y3--
            gameBoard.removeChild(shot03Left)

            if (hpPlanet01Y3 == 0) {

                gameBoard.removeChild(planet01Y3)
                hpPlanet01Y3 = 1
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)
    planet01Y4Left = document.querySelector('.planet-01-y4')
    planet01Y4Left = Number(planet01Y4.offsetLeft)

    if (shot04Left >= 140 && planet01Y4Left >= 140) {

        if (shot04Left >= planet01Y4Left) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet01Y4--
            gameBoard.removeChild(shot04Left)

            if (hpPlanet01Y4 == 0) {

                gameBoard.removeChild(planet01Y4)
                hpPlanet01Y4 = 1
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)
    planet01Y5Left = document.querySelector('.planet-01-y5')
    planet01Y5Left = Number(planet01Y5.offsetLeft)

    if (shot05Left >= 140 && planet01Y5Left >= 140) {

        if (shot05Left >= planet01Y5Left) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet01Y5--
            gameBoard.removeChild(shot05Left)

            if (hpPlanet01Y5 == 0) {

                gameBoard.removeChild(planet01Y5)
                hpPlanet01Y5 = 1
            
            }

        }

    }

}, 100);

// Colisões shot/planet03

setInterval(() => {

    shot05Left = document.querySelector('.shot-position-1')
    shot05Left = Number(shot05Left.offsetLeft)
    planet03Y1Left = document.querySelector('.planet-03-y1')
    planet03Y1Left = Number(planet03Y1.offsetLeft)

    if (shot05Left >= 140 && planet03Y1Left >= 140) {

        if (shot05Left >= planet03Y1Left) {

            var shot05Left = document.querySelector('.shot-position-1')
            hpPlanet03Y1--
            gameBoard.removeChild(shot05Left)

            if (hpPlanet03Y1 == 0) {

                gameBoard.removeChild(planet03Y1)
                hpPlanet03Y1 = 3
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)
    planet03Y2Left = document.querySelector('.planet-03-y2')
    planet03Y2Left = Number(planet03Y2.offsetLeft)

    if (shot02Left >= 140 && planet03Y2Left >= 140) {

        if (shot02Left >= planet03Y2Left) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet03Y2--
            gameBoard.removeChild(shot02Left)

            if (hpPlanet03Y2 == 0) {

                gameBoard.removeChild(planet03Y2)
                hpPlanet03Y2 = 3
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)
    planet03Y3Left = document.querySelector('.planet-03-y3')
    planet03Y3Left = Number(planet03Y3.offsetLeft)

    if (shot03Left >= 140 && planet03Y3Left >= 140) {

        if (shot03Left >= planet03Y3Left) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet03Y3--
            gameBoard.removeChild(shot03Left)

            if (hpPlanet03Y3 == 0) {

                gameBoard.removeChild(planet03Y3)
                hpPlanet03Y3 = 3
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)
    planet03Y4Left = document.querySelector('.planet-03-y4')
    planet03Y4Left = Number(planet03Y4.offsetLeft)

    if (shot04Left >= 140 && planet03Y4Left >= 140) {

        if (shot04Left >= planet03Y4Left) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet03Y4--
            gameBoard.removeChild(shot04Left)

            if (hpPlanet03Y4 == 0) {

                gameBoard.removeChild(planet03Y4)
                hpPlanet03Y4 = 3
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)
    planet03Y5Left = document.querySelector('.planet-03-y5')
    planet03Y5Left = Number(planet03Y5.offsetLeft)

    if (shot05Left >= 140 && planet03Y5Left >= 140) {

        if (shot05Left >= planet03Y5Left) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet03Y5--
            gameBoard.removeChild(shot05Left)

            if (hpPlanet03Y5 == 0) {

                gameBoard.removeChild(planet03Y5)
                hpPlanet03Y5 = 3
            
            }

        }

    }

}, 100);

// Colisões shot/planet05

setInterval(() => {

    shot05Left = document.querySelector('.shot-position-1')
    shot05Left = Number(shot05Left.offsetLeft)
    planet05Y1Left = document.querySelector('.planet-05-y1')
    planet05Y1Left = Number(planet05Y1.offsetLeft)

    if (shot05Left >= 140 && planet05Y1Left >= 140) {

        if (shot05Left >= planet05Y1Left) {

            var shot05Left = document.querySelector('.shot-position-1')
            hpPlanet05Y1--
            gameBoard.removeChild(shot05Left)

            if (hpPlanet05Y1 == 0) {

                gameBoard.removeChild(planet05Y1)
                hpPlanet05Y1 = 5
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)
    planet05Y2Left = document.querySelector('.planet-05-y2')
    planet05Y2Left = Number(planet05Y2.offsetLeft)

    if (shot02Left >= 140 && planet05Y2Left >= 140) {

        if (shot02Left >= planet05Y2Left) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet05Y2--
            gameBoard.removeChild(shot02Left)

            if (hpPlanet05Y2 == 0) {

                gameBoard.removeChild(planet05Y2)
                hpPlanet05Y2 = 5
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)
    planet05Y3Left = document.querySelector('.planet-05-y3')
    planet05Y3Left = Number(planet05Y3.offsetLeft)

    if (shot03Left >= 140 && planet05Y3Left >= 140) {

        if (shot03Left >= planet05Y3Left) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet05Y3--
            gameBoard.removeChild(shot03Left)

            if (hpPlanet05Y3 == 0) {

                gameBoard.removeChild(planet05Y3)
                hpPlanet05Y3 = 5
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)
    planet05Y4Left = document.querySelector('.planet-05-y4')
    planet05Y4Left = Number(planet05Y4.offsetLeft)

    if (shot04Left >= 140 && planet05Y4Left >= 140) {

        if (shot04Left >= planet05Y4Left) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet05Y4--
            gameBoard.removeChild(shot04Left)

            if (hpPlanet05Y4 == 0) {

                gameBoard.removeChild(planet05Y4)
                hpPlanet05Y4 = 5
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)
    planet05Y5Left = document.querySelector('.planet-05-y5')
    planet05Y5Left = Number(planet05Y5.offsetLeft)

    if (shot05Left >= 140 && planet05Y5Left >= 140) {

        if (shot05Left >= planet05Y5Left) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet05Y5--
            gameBoard.removeChild(shot05Left)

            if (hpPlanet05Y5 == 0) {

                gameBoard.removeChild(planet05Y5)
                hpPlanet05Y5 = 5
            
            }

        }

    }

}, 100);