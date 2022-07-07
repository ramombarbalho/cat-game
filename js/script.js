var gameBoard = document.querySelector('.game-board')
var cat = document.querySelector('.cat')
var shotPosition = 3

// hpPlanet01

var hpPlanet01Y1 = 5
var hpPlanet01Y2 = 5
var hpPlanet01Y3 = 5
var hpPlanet01Y4 = 5
var hpPlanet01Y5 = 5

// hpPlanet02

var hpPlanet02Y1 = 3
var hpPlanet02Y2 = 3
var hpPlanet02Y3 = 3
var hpPlanet02Y4 = 3
var hpPlanet02Y5 = 3

// hpPlanet03

var hpPlanet03Y1 = 1
var hpPlanet03Y2 = 1
var hpPlanet03Y3 = 1
var hpPlanet03Y4 = 1
var hpPlanet03Y5 = 1


// hpMoonBoss

var hpMoonBoss = 40

//var timee = 4000 


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

/* setInterval(() => {
    
    rnggg = Number(Math.floor(Math.random() * (8000 - 2000 + 1 )) + 2000)
    console.log(rnggg)
    timee = rnggg
    
}, 1999)


setInterval(() => {
    
    setInterval(() => {
        
        var planet01Y0 = document.createElement('img')
        planet01Y0.src = './img/planet01.gif'
        planet01Y0.classList.add('planet01')
        gameBoard.appendChild(planet01Y0)
        
        setTimeout(() => {
            gameBoard.removeChild(planet01Y0)
        }
        , 2000)

    }, timee)

}, 2000)
 */

// Ordem dos enemies sprites

// 1

setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 4000);

setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 6000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 8000);

setTimeout(() => {

    planet02Y3 = document.createElement('img')
    planet02Y3.src = './img/planet02.gif'
    planet02Y3.classList.add('planet-02-y3')
    gameBoard.appendChild(planet02Y3)
        
}, 10000);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 12000);

setTimeout(() => {

    planet01Y2 = document.createElement('img')
    planet01Y2.src = './img/planet01.gif'
    planet01Y2.classList.add('planet-01-y2')
    gameBoard.appendChild(planet01Y2)
        
}, 14000);

setTimeout(() => {

    planet02Y4 = document.createElement('img')
    planet02Y4.src = './img/planet02.gif'
    planet02Y4.classList.add('planet-02-y4')
    gameBoard.appendChild(planet02Y4)
        
}, 16000);

setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 18000);

setTimeout(() => {

    planet02Y5 = document.createElement('img')
    planet02Y5.src = './img/planet02.gif'
    planet02Y5.classList.add('planet-02-y5')
    gameBoard.appendChild(planet02Y5)
        
}, 20000);

setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = './img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 22000);

// 2 desce sobe

setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 24000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 25000);

setTimeout(() => {

    planet03Y3 = document.createElement('img')
    planet03Y3.src = './img/planet03.gif'
    planet03Y3.classList.add('planet-03-y3')
    gameBoard.appendChild(planet03Y3)
        
}, 26000);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 27000);

setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 28000);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 29000);

setTimeout(() => {

    planet03Y3 = document.createElement('img')
    planet03Y3.src = './img/planet03.gif'
    planet03Y3.classList.add('planet-03-y3')
    gameBoard.appendChild(planet03Y3)
        
}, 30000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 31000);

setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 32000);

// 3 linha

setTimeout(() => {

    planet01Y3 = document.createElement('img')
    planet01Y3.src = './img/planet01.gif'
    planet01Y3.classList.add('planet-01-y3')
    gameBoard.appendChild(planet01Y3)
        
}, 35000);

setTimeout(() => {

    planet02Y4 = document.createElement('img')
    planet02Y4.src = './img/planet02.gif'
    planet02Y4.classList.add('planet-02-y4')
    gameBoard.appendChild(planet02Y4)
        
}, 35000);

setTimeout(() => {

    planet02Y2 = document.createElement('img')
    planet02Y2.src = './img/planet02.gif'
    planet02Y2.classList.add('planet-02-y2')
    gameBoard.appendChild(planet02Y2)
        
}, 35000);

setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 35000);

setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 35000);

// 4 sobe desce

setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 38000);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 39000);

setTimeout(() => {

    planet03Y3 = document.createElement('img')
    planet03Y3.src = './img/planet03.gif'
    planet03Y3.classList.add('planet-03-y3')
    gameBoard.appendChild(planet03Y3)
        
}, 40000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 41000);

setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 42000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 43000);

setTimeout(() => {

    planet03Y3 = document.createElement('img')
    planet03Y3.src = './img/planet03.gif'
    planet03Y3.classList.add('planet-03-y3')
    gameBoard.appendChild(planet03Y3)
        
}, 44000);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 45000);

setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 46000);

// 5

setTimeout(() => {

    planet02Y5 = document.createElement('img')
    planet02Y5.src = './img/planet02.gif'
    planet02Y5.classList.add('planet-02-y5')
    gameBoard.appendChild(planet02Y5)
        
}, 48000);

setTimeout(() => {

    planet02Y4 = document.createElement('img')
    planet02Y4.src = './img/planet02.gif'
    planet02Y4.classList.add('planet-02-y4')
    gameBoard.appendChild(planet02Y4)
        
}, 49000);setTimeout(() => {

    planet02Y5 = document.createElement('img')
    planet02Y5.src = './img/planet02.gif'
    planet02Y5.classList.add('planet-02-y5')
    gameBoard.appendChild(planet02Y5)
        
}, 50000);

setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 50000);

setTimeout(() => {

    planet02Y1 = document.createElement('img')
    planet02Y1.src = './img/planet02.gif'
    planet02Y1.classList.add('planet-02-y1')
    gameBoard.appendChild(planet02Y1)
        
}, 52000);

setTimeout(() => {

    planet02Y2 = document.createElement('img')
    planet02Y2.src = './img/planet02.gif'
    planet02Y2.classList.add('planet-02-y2')
    gameBoard.appendChild(planet02Y2)
        
}, 53000);

setTimeout(() => {

    planet02Y1 = document.createElement('img')
    planet02Y1.src = './img/planet02.gif'
    planet02Y1.classList.add('planet-02-y1')
    gameBoard.appendChild(planet02Y1)
        
}, 54000);

setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 54000);

// 6

setTimeout(() => {

    planet02Y3 = document.createElement('img')
    planet02Y3.src = './img/planet02.gif'
    planet02Y3.classList.add('planet-02-y3')
    gameBoard.appendChild(planet02Y3)
        
}, 56000);

setTimeout(() => {

    planet03Y3 = document.createElement('img')
    planet03Y3.src = './img/planet03.gif'
    planet03Y3.classList.add('planet-03-y3')
    gameBoard.appendChild(planet03Y3)
        
}, 56000);

setTimeout(() => {

    planet03Y2 = document.createElement('img')
    planet03Y2.src = './img/planet03.gif'
    planet03Y2.classList.add('planet-03-y2')
    gameBoard.appendChild(planet03Y2)
        
}, 57000);

setTimeout(() => {

    planet03Y4 = document.createElement('img')
    planet03Y4.src = './img/planet03.gif'
    planet03Y4.classList.add('planet-03-y4')
    gameBoard.appendChild(planet03Y4)
        
}, 58000);

setTimeout(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet-03-y1')
    gameBoard.appendChild(planet03Y1)
        
}, 59000);

setTimeout(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet-03-y5')
    gameBoard.appendChild(planet03Y5)
        
}, 60000);

// 7 linha

setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)
        
}, 62000);

setTimeout(() => {

    planet01Y5 = document.createElement('img')
    planet01Y5.src = './img/planet01.gif'
    planet01Y5.classList.add('planet-01-y5')
    gameBoard.appendChild(planet01Y5)
        
}, 62000);

setTimeout(() => {

    planet02Y4 = document.createElement('img')
    planet02Y4.src = './img/planet02.gif'
    planet02Y4.classList.add('planet-02-y4')
    gameBoard.appendChild(planet02Y4)
        
}, 62000);

setTimeout(() => {

    planet02Y2 = document.createElement('img')
    planet02Y2.src = './img/planet02.gif'
    planet02Y2.classList.add('planet-02-y2')
    gameBoard.appendChild(planet02Y2)
        
}, 62000);

setTimeout(() => {

    planet03Y3 = document.createElement('img')
    planet03Y3.src = './img/planet03.gif'
    planet03Y3.classList.add('planet-03-y3')
    gameBoard.appendChild(planet03Y3)
        
}, 61000);

// 8 boss

setInterval(() => {

    moonBoss = document.createElement('img')
    moonBoss.src = './img/moon-boss.png'
    moonBoss.classList.add('moon-boss')
    gameBoard.appendChild(moonBoss)
    
}, 66000);

/* setTimeout(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet-01-y1')
    gameBoard.appendChild(planet01Y1)

    //setTimeout(() => {
      //  gameBoard.removeChild(planett01)
    //}, 7999);
        
}, 8001); */

// colisoes planet01

setInterval(() => {

    shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)
    planet01Y1Left = document.querySelector('.planet-01-y1')
    planet01Y1Left = Number(planet01Y1.offsetLeft)

    if (shot01Left >= 140 && planet01Y1Left >= 140) {

        if (shot01Left >= planet01Y1Left) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet01Y1--
            gameBoard.removeChild(shot01Left)

            if (hpPlanet01Y1 == 0) {

                gameBoard.removeChild(planet01Y1)
                hpPlanet01Y1 = 5
            
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
                hpPlanet01Y2 = 5
            
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
                hpPlanet01Y3 = 5
            
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
                hpPlanet01Y4 = 5
            
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
                hpPlanet01Y5 = 5
            
            }

        }

    }

}, 100);

// colisoes planet02

setInterval(() => {

    shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)
    planet02Y1Left = document.querySelector('.planet-02-y1')
    planet02Y1Left = Number(planet02Y1.offsetLeft)

    if (shot01Left >= 140 && planet02Y1Left >= 140) {

        if (shot01Left >= planet02Y1Left) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet02Y1--
            gameBoard.removeChild(shot01Left)

            if (hpPlanet02Y1 == 0) {

                gameBoard.removeChild(planet02Y1)
                hpPlanet02Y1 = 3
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot02Left = document.querySelector('.shot-position-2')
    shot02Left = Number(shot02Left.offsetLeft)
    planet02Y2Left = document.querySelector('.planet-02-y2')
    planet02Y2Left = Number(planet02Y2.offsetLeft)

    if (shot02Left >= 140 && planet02Y2Left >= 140) {

        if (shot02Left >= planet02Y2Left) {

            var shot02Left = document.querySelector('.shot-position-2')
            hpPlanet02Y2--
            gameBoard.removeChild(shot02Left)

            if (hpPlanet02Y2 == 0) {

                gameBoard.removeChild(planet02Y2)
                hpPlanet02Y2 = 3
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot03Left = document.querySelector('.shot-position-3')
    shot03Left = Number(shot03Left.offsetLeft)
    planet02Y3Left = document.querySelector('.planet-02-y3')
    planet02Y3Left = Number(planet02Y3.offsetLeft)

    if (shot03Left >= 140 && planet02Y3Left >= 140) {

        if (shot03Left >= planet02Y3Left) {

            var shot03Left = document.querySelector('.shot-position-3')
            hpPlanet02Y3--
            gameBoard.removeChild(shot03Left)

            if (hpPlanet02Y3 == 0) {

                gameBoard.removeChild(planet02Y3)
                hpPlanet02Y3 = 3
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot04Left = document.querySelector('.shot-position-4')
    shot04Left = Number(shot04Left.offsetLeft)
    planet02Y4Left = document.querySelector('.planet-02-y4')
    planet02Y4Left = Number(planet02Y4.offsetLeft)

    if (shot04Left >= 140 && planet02Y4Left >= 140) {

        if (shot04Left >= planet02Y4Left) {

            var shot04Left = document.querySelector('.shot-position-4')
            hpPlanet02Y4--
            gameBoard.removeChild(shot04Left)

            if (hpPlanet02Y4 == 0) {

                gameBoard.removeChild(planet02Y4)
                hpPlanet02Y4 = 3
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot05Left = document.querySelector('.shot-position-5')
    shot05Left = Number(shot05Left.offsetLeft)
    planet02Y5Left = document.querySelector('.planet-02-y5')
    planet02Y5Left = Number(planet02Y5.offsetLeft)

    if (shot05Left >= 140 && planet02Y5Left >= 140) {

        if (shot05Left >= planet02Y5Left) {

            var shot05Left = document.querySelector('.shot-position-5')
            hpPlanet02Y5--
            gameBoard.removeChild(shot05Left)

            if (hpPlanet02Y5 == 0) {

                gameBoard.removeChild(planet02Y5)
                hpPlanet02Y5 = 3
            
            }

        }

    }

}, 100);

// colisoes planet03

setInterval(() => {

    shot01Left = document.querySelector('.shot-position-1')
    shot01Left = Number(shot01Left.offsetLeft)
    planet03Y1Left = document.querySelector('.planet-03-y1')
    planet03Y1Left = Number(planet03Y1.offsetLeft)

    if (shot01Left >= 140 && planet03Y1Left >= 140) {

        if (shot01Left >= planet03Y1Left) {

            var shot01Left = document.querySelector('.shot-position-1')
            hpPlanet03Y1--
            gameBoard.removeChild(shot01Left)

            if (hpPlanet03Y1 == 0) {

                gameBoard.removeChild(planet03Y1)
                hpPlanet03Y1 = 1
            
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
                hpPlanet03Y2 = 1
            
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
                hpPlanet03Y3 = 1
            
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
                hpPlanet03Y4 = 1
            
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
                hpPlanet03Y5 = 1
            
            }

        }

    }

}, 100);

// colisao moon boss

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