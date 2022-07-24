const marioCss = document.querySelector('.mario')

const jump = () => {
    marioCss.classList.add('jump')

    setTimeout(() => {
        marioCss.classList.remove('jump')
    }, 500);
}


const enemyCss = document.querySelector('.enemy')
document.addEventListener("keydown", jump)

const loop = setInterval(() => {
    const enemyPosition = enemyCss.offsetLeft
    const marioPosition = +window.getComputedStyle(marioCss).bottom.replace('px','')
    if(enemyPosition <= 120 && enemyPosition >= -50 && marioPosition <= 80){
        enemyCss.style.animation = 'none'
        enemyCss.style.left = `${enemyPosition}px`

        marioCss.style.animation = 'none'
        marioCss.style.bottom = `${marioPosition}px`
        marioCss.src = "./css/images/game-over.png"
        marioCss.style.width = '12%'
        marioCss.style.marginLeft = '50px'

        clearInterval(loop)
    }
},10)