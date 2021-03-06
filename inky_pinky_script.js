var colors = ['red', 'blue', 'white', 'grey', 'pink', 'yellow', 'green', 'orange', 'brown', 'purple', 'magenta', 'golden']
var answer = ''
var chosen = false
var interval = 0;
var loseAudio = new Audio('lose.mp3')
var winAudio = new Audio('win.mp3')


// Shuffle Function 
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function chooseCol(color) {
    chosen = true;
    document.getElementsByClassName('box')[0].classList.add('hidden')
    if (color === false) 
        loseAudio.play()
    else if (color === answer)
        winAudio.play()
    else
        loseAudio.play()
    clearInterval(interval);
}

// timer function
function timerStart (time) {
    let timer = document.getElementById('timer');
    timer.innerText = time
    interval = setInterval(() => {
        time -= 1;
        timer.innerText = time;
    }, 1000)
    setTimeout((interval) => {
        if (!chosen)
            chooseCol(false);
        clearInterval(interval);
    }, time * 1000, [interval]);
}

window.addEventListener('load', () => {
    document.getElementById('startbtn').addEventListener('click', () => {
        winAudio.pause()
        winAudio.currentTime = 0
        loseAudio.pause()
        loseAudio.currentTime = 0
        document.getElementsByClassName('text_style')[0].classList.remove('hidden')
        var dots = ['.', '..', '...', '']
        var i = 0
        var dotsInterval = setInterval(() => {
            document.getElementById('dots').innerText = dots[i % dots.length]
            i += 1
            i %= dots.length
        }, 500)
        
        var time = Math.floor(Math.random() * 3) + 2
        setTimeout((dotsInterval) => {
            // Getting a random answer
            var index = Math.floor(Math.random() * colors.length)
            answer =  colors[index]

            // print wanted colour name
            var element = document.getElementsByClassName('text_style')[1]
            element.innerText = answer
            clearInterval(dotsInterval)
            document.getElementsByClassName('text_style')[0].classList.add('hidden') // I want division
            element.classList.remove('hidden')
            

            // Shuffling colors
            var colNames = shuffle([...colors])
            var colCol = shuffle([...colors])
            
            // create grid
            var getGrid = document.getElementsByClassName('container')[0]
            getGrid.innerHTML = ''

            // Defining Row
            var row = document.createElement('div')
            row.classList = 'row'

            // Defining Column
            var col = document.createElement('div')
            col.classList = 'col text_style text-center'

            // Row with four columns
            for (var i = 0; i < 4; i ++){
                row.appendChild(col.cloneNode())
            }
            var f = 0
            for (var i = 0; i < 3; i++) {
                var newRow = row.cloneNode(true)
                newRow.childNodes.forEach((c) => {
                    c.innerText = colNames[f];
                    c.classList.add(colCol[f]);
                    c.setAttribute('onclick', "chooseCol('" + colCol[f] + "')")
                    f += 1;
                })
                getGrid.appendChild(newRow)
            }
            getGrid.classList.remove('hidden')
            document.getElementsByClassName('box')[0].classList.remove('hidden')
            timerStart(3)

        }, 0 * 1000, [dotsInterval])
    })
})