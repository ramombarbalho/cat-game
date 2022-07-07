var gameBoard = document.querySelector('.game-board')
var cat = document.querySelector('.cat')
var shotPosition = 1
var hpPlanet01Y1 = 5
var hpPlanet02Y3 = 3
var hpPlanet03Y5 = 1
var hpPlanet03Y1 = 1
var hpMoonBoss = 40
/* var timee = 4000 */


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
        shot1.classList.add('shot-position1')
        gameBoard.appendChild(shot1)
        
        setTimeout(() => {
            gameBoard.removeChild(shot1)
        }
        , 2000)
        
    }

    if (shotPosition == 2) {

        var shot2 = document.createElement('img')
        shot2.src = './img/shot.gif'
        shot2.classList.add('shot-position2')
        gameBoard.appendChild(shot2)
        
        setTimeout(() => {
            gameBoard.removeChild(shot2)
        }
        , 2000)
        
    }
    
    if (shotPosition == 3) {
        
        var shot3 = document.createElement('img')
        shot3.src = './img/shot.gif'
        shot3.classList.add('shot-position3')
        gameBoard.appendChild(shot3)
        
        setTimeout(() => {
            gameBoard.removeChild(shot3)
        }
        , 2000)
        
    }
    
    if (shotPosition == 4) {
        
        var shot4 = document.createElement('img')
        shot4.src = './img/shot.gif'
        shot4.classList.add('shot-position4')
        gameBoard.appendChild(shot4)
        
        setTimeout(() => {
            gameBoard.removeChild(shot4)
        }
        , 2000)
        
    }
    
    if (shotPosition == 5) {
    
        var shot5 = document.createElement('img')
        shot5.src = './img/shot.gif'
        shot5.classList.add('shot-position5')
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

/* setInterval(() => {

    planet01Y1 = document.createElement('img')
    planet01Y1.src = './img/planet01.gif'
    planet01Y1.classList.add('planet01')
    gameBoard.appendChild(planet01Y1)

    //setTimeout(() => {
      //  gameBoard.removeChild(planett01)
    //}, 7999);
        
}, 8001);

setInterval(() => {

    planet02Y3 = document.createElement('img')
    planet02Y3.src = './img/planet02.gif'
    planet02Y3.classList.add('planet02')
    gameBoard.appendChild(planet02Y3)
    
}, 6001);

setInterval(() => {

    planet03Y5 = document.createElement('img')
    planet03Y5.src = './img/planet03.gif'
    planet03Y5.classList.add('planet03')
    gameBoard.appendChild(planet03Y5)
    
}, 4001);

setInterval(() => {

    planet03Y1 = document.createElement('img')
    planet03Y1.src = './img/planet03.gif'
    planet03Y1.classList.add('planet007')
    gameBoard.appendChild(planet03Y1)
    
}, 3001); */

setInterval(() => {

    moonBoss = document.createElement('img')
    moonBoss.src = './img/moon-boss.png'
    moonBoss.classList.add('moon-boss')
    gameBoard.appendChild(moonBoss)
    
}, 12000);


/* setInterval(() => {

    shot01Left = document.querySelector('.shot-position1')
    shot01Left = Number(shot01Left.offsetLeft)
    planet01Y1Left = document.querySelector('.planet01')
    planet01Y1Left = Number(planet01Y1.offsetLeft)

    if (shot01Left >= 140 && planet01Y1Left >= 140) {

        if (shot01Left >= planet01Y1Left) {

            var shot01Left = document.querySelector('.shot-position1')
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

    shot03Left = document.querySelector('.shot-position3')
    shot03Left = Number(shot03Left.offsetLeft)
    planet02Y3Left = document.querySelector('.planet02')
    planet02Y3Left = Number(planet02Y3Left.offsetLeft)

    if (shot03Left >= 140 && planet02Y3Left >= 140) {

        if (shot03Left >= planet02Y3Left) {

            var shot03Left = document.querySelector('.shot-position3')
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

    shot05Left = document.querySelector('.shot-position5')
    shot05Left = Number(shot05Left.offsetLeft)
    planet03Y5Left = document.querySelector('.planet03')
    planet03Y5Left = Number(planet03Y5Left.offsetLeft)

    if (shot05Left >= 140 && planet03Y5Left >= 140) {

        if (shot05Left >= planet03Y5Left) {

            var shot05Left = document.querySelector('.shot-position5')
            hpPlanet03Y5--
            gameBoard.removeChild(shot05Left)

            if (hpPlanet03Y5 == 0) {

                gameBoard.removeChild(planet03Y5)
                hpPlanet03Y5 = 1
            
            }

        }

    }

}, 100);

setInterval(() => {

    shot01Left = document.querySelector('.shot-position1')
    shot01Left = Number(shot01Left.offsetLeft)
    planet03Y1Left = document.querySelector('.planet007')
    planet03Y1Left = Number(planet03Y1Left.offsetLeft)

    if (shot01Left >= 140 && planet03Y1Left >= 140) {

        if (shot01Left >= planet03Y1Left) {

            var shot01Left = document.querySelector('.shot-position1')
            hpPlanet03Y1--
            gameBoard.removeChild(shot01Left)

            if (hpPlanet03Y1 == 0) {

                gameBoard.removeChild(planet03Y1)
                hpPlanet03Y1 = 1
            
            }

        }

    }

}, 100); */

setInterval(() => {

    shot03Left = document.querySelector('.shot-position3')
    shot03Left = Number(shot03Left.offsetLeft)
    moonBossLeft = document.querySelector('.moon-boss')
    moonBossLeft = Number(moonBossLeft.offsetLeft)

    if (shot03Left >= 140 && moonBossLeft >= 140) {

        if (shot03Left >= moonBossLeft) {

            var shot03Left = document.querySelector('.shot-position3')
            hpMoonBoss--
            gameBoard.removeChild(shot03Left)

            if (hpMoonBoss == 0) {

                gameBoard.removeChild(moonBoss)
                hpMoonBoss = 30
            
            }

        }

    }

}, 10);