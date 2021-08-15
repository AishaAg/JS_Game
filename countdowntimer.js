window.addEventListener('load', () => {
    let timer = document.getElementById('timer')
    var time = 3;
    setInterval(() => {
        timer.innerText = time;
        time -= 1;
        if (time < 0) time = 3
    }, 1000)
})