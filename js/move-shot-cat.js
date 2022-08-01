// Declarações iniciais

var gameBoard = document.querySelector('.game-board')
var cat = document.querySelector('.cat')
var txtQtShotHaduken = document.querySelector('.qt-shot-haduken')
var qtShotHaduken = 150
txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
var qtBomb = 1
/* var txtQtBomb = document.querySelector('.qt-bomb')
txtQtBomb.innerHTML = `x ${qtBomb}` */
var shotPosition = 3
var bombValue = 0

// Funções que fazem a movimentação do personagem com o click

function move1() {

    cat.style.animation = "move1 0.08s 1"
    shotPosition = 1

    setTimeout(() => {

        cat.style.top = "0px"
        
    }, 65);

}

function move2() {

    cat.style.animation = "move2 0.08s 1"
    shotPosition = 2

    setTimeout(() => {

        cat.style.top = "120px"
        
    }, 65);

}

function move3() {

    cat.style.animation = "move3 0.08s 1"
    shotPosition = 3

    setTimeout(() => {

        cat.style.top = "240px"
        
    }, 65);

}

function move4() {

    cat.style.animation = "move4 0.08s 1"
    shotPosition = 4

    setTimeout(() => {

        cat.style.top = "360px"
        
    }, 65);

}

function move5() {

    cat.style.animation = "move5 0.08s 1"
    shotPosition = 5

    setTimeout(() => {

        cat.style.top = "480px"
        
    }, 65);

}

function bombing() {

    if (qtBomb > 0) {

        bombValue = 1

        var explosionBomb = document.createElement('img')
        explosionBomb.src = '../img/bomb-explosion.gif'
        explosionBomb.classList.add('bomb-explosion')
        explosionBomb.style.top = `0`
        explosionBomb.style.left = `0`
        gameBoard.appendChild(explosionBomb)
        qtBomb--
        var noAllowed = document.querySelector('.no-allowed')
        noAllowed.style.display = 'block'
        /* txtQtBomb.innerHTML = `x ${qtBomb}` */

        setTimeout(() => {

            bombValue = 2

        }, 300);

        setTimeout(() => {

            gameBoard.removeChild(explosionBomb)

        }, 350);

    }

}

// Função que permite o disparo e o faz desparecer após sair do game-board

onkeyup = function shotting() {
    
    if (qtShotHaduken > 0) {
        
        if (shotPosition == 1) {
            
            var shot1 = document.createElement('img')
            shot1.src = '../img/shot.gif'
            shot1.classList.add('shot-position-1')
            gameBoard.appendChild(shot1)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot1)
            }
            , 2000)
            
        }
        
        if (shotPosition == 2) {

            var shot2 = document.createElement('img')
            shot2.src = '../img/shot.gif'
            shot2.classList.add('shot-position-2')
            gameBoard.appendChild(shot2)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot2)
            }
            , 2000)
            
        }
        
        if (shotPosition == 3) {
            
            var shot3 = document.createElement('img')
            shot3.src = '../img/shot.gif'
            shot3.classList.add('shot-position-3')
            gameBoard.appendChild(shot3)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot3)
            }
            , 2000)
            
        }
        
        if (shotPosition == 4) {
            
            var shot4 = document.createElement('img')
            shot4.src = '../img/shot.gif'
            shot4.classList.add('shot-position-4')
            gameBoard.appendChild(shot4)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot4)
            }
            , 2000)
            
        }
        
        if (shotPosition == 5) {
            
            var shot5 = document.createElement('img')
            shot5.src = '../img/shot.gif'
            shot5.classList.add('shot-position-5')
            gameBoard.appendChild(shot5)
            qtShotHaduken--
            txtQtShotHaduken.innerHTML = `${qtShotHaduken}`
            
            setTimeout(() => {
                gameBoard.removeChild(shot5)
            }
            , 2000)
            
        }
        
    }
    
}