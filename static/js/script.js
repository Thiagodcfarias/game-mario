const marioCss = document.querySelector('.mario')

const jump = () => {
    marioCss.classList.add('jump')

    setTimeout(() => {
        marioCss.classList.remove('jump')
    }, 500);
}

const enemyCss = document.querySelector('.enemy')

document.addEventListener("keydown", jump)
const pontos = 0
const  loop = setInterval(async () => {

    const enemyPosition = enemyCss.offsetLeft
    const marioPosition = +window.getComputedStyle(marioCss).bottom.replace('px','')
    const loopAtivo = 1
    
    const dict_values = {enemyPosition, marioPosition,pontos,loopAtivo} //Pass the javascript variables to a dictionary.
    const s = JSON.stringify(dict_values); // Stringify converts a JavaScript object or value to a JSON string
    //console.log(s); // Prints the variables to console window, which are in the JSON format
    
    $.ajax({
        url:"/test",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(s)})

    $.ajax({
        url: "/test",
        type:"GET",
        data:{actual_page:"/"},
        success: function (response) {
              //console.log(response['pular']) 
              if (response['pular'] == 1) {
                jump()
              }}})

    if(enemyPosition <= 120 && enemyPosition >= -50 && marioPosition <= 80){
        enemyCss.style.animation = 'none'
        enemyCss.style.left = `${enemyPosition}px`

        marioCss.style.animation = 'none'
        marioCss.style.bottom = `${marioPosition}px`
        marioCss.src = "../static/css/images/game-over.png"
        marioCss.style.width = '12%'
        marioCss.style.marginLeft = '50px'

        loopAtivo = 0
        console.log('-----------------------------------------')
        $.ajax({
            url:"/shutdown",
            type:"POST",
            contentType: "application/json",
            data: JSON.stringify({enemyPosition, marioPosition,pontos,loopAtivo})})
        clearInterval(loop)
    }
    pontos += 10
},10)