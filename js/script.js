//variáveis

const minutesDisplay = document.getElementById('minutes')
const secondsDisplay = document.getElementById('seconds')

const buttonPlay = document.getElementById('play')
const buttonStop = document.getElementById('stop')
const buttonMore = document.getElementById('more')
const buttonLess = document.getElementById('less')

const buttonForest = document.getElementById('forest')
const buttonRain = document.getElementById('rain')
const buttonCafeteria = document.getElementById('cafeteria')
const buttonFireside = document.getElementById('fireside')

let seconds = Number(secondsDisplay.textContent)
let minutes = Number(minutesDisplay.textContent)

let timerTimeOut
//function

function updateTimerDisplay(minutes) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}


function resetTimer(){
  minutesDisplay.textContent = 25
  minutes = minutesDisplay.textContent
  secondsDisplay.textContent = 0
  seconds = secondsDisplay.textContent

  updateTimerDisplay(minutes, seconds)
}

buttonPlay.addEventListener('click', countdown)
buttonPlay.addEventListener('click', blockControls)
buttonPlay.addEventListener('click', pauseAlert)

function blockControls(){
  buttonPlay.classList.add("blockCursor")
  buttonMore.classList.add("blockCursor")
  buttonLess.classList.add("blockCursor")
}
function unlockControls() {
  buttonPlay.classList.remove("blockCursor")
  buttonMore.classList.remove("blockCursor")
  buttonLess.classList.remove("blockCursor")
}
function unlockPlay() {
  buttonPlay.classList.remove("blockCursor")
}
function countdown() {

  
  timerTimeOut = setTimeout(() => {

    let minutes = minutesDisplay.textContent
    
    let isFinished = seconds <= 0 && minutes <= 0
    if(seconds <= 0){
      --minutes
      seconds = 60
    }
    if(seconds > 0) {
      --seconds
    }
    if(isFinished){
      unlockControls()
      resetTimer()
      return
    }
    
    countdown()
    updateTimerDisplay(minutes, 0)
  }, 1000);
  
  
}

buttonStop.addEventListener('click', stop)
buttonStop.addEventListener('click', unlockControls)

function pause(){
  clearTimeout(timerTimeOut)
}
function stop() {
  unlockControls()
  pause()
  resetTimer()
}

buttonLess.addEventListener("click", function () {

  let minutes = Number(minutesDisplay.textContent)

  if(minutes === 5) {
    return
  } 

  else {
    buttonLess.classList.remove('blockCursor')
    minutes -= 5
    updateTimerDisplay(minutes)
  } 

  if (minutes === 5) {
    buttonLess.classList.add("blockCursor")
  }
  if (minutes <= 55) {
    buttonMore.classList.remove("blockCursor")
  }
  
})

buttonMore.addEventListener('click', function(){

  let minutes = Number(minutesDisplay.textContent)
  if(minutes === 60) {
    return
  } 
  
  else {
    minutes += 5
    minutesDisplay.textContent = minutes
  }
  if(minutes === 60) {
    buttonMore.classList.add('blockCursor')
  }
  if (minutes >= 10) {
    buttonLess.classList.remove("blockCursor")
  }
})

minutesDisplay.addEventListener('click', pauseTimer)
secondsDisplay.addEventListener('click', pauseTimer)
minutesDisplay.addEventListener('click', unlockPlay)
secondsDisplay.addEventListener('click', unlockPlay)


function pauseTimer() {
  clearTimeout(timerTimeOut)
}

let alertMessage = false

function pauseAlert() {

  if(!alertMessage) {
    alert('Clique no temporizador para pausar o tempo.')
    alertMessage = true
  }

}




/* audios */

const rainSound = new Audio('./js/sounds/rain.mp3')
const rainButton = document.getElementById('rain')
function playRain() {
  rainSound.play()
  rainSound.loop = true
}

const forestSound = new Audio('./js/sounds/forest.mp3')
const forestButton = document.getElementById('forest')
function playForest() {
  forestSound.play()
  forestSound.loop = true
}

const fireplaceSound = new Audio('./js/sounds/fireplace.mp3')
const fireplaceButton = document.getElementById('fireplace')
function playFireplace() {
  fireplaceSound.play()
  fireplaceSound.loop = true
}

const cafeteriaSound = new Audio('./js/sounds/cafeteria.mp3')
const cafeteriaButton = document.getElementById('cafeteria')

let audio
function playCafeteria(event) {

  if(!audio) {
    cafeteriaSound.play()
    cafeteriaSound.loop = true
    audio = true
  } else {
    cafeteriaSound.pause()
    audio = false
  }
  
} 


rainButton.addEventListener('click', playRain)
forestButton.addEventListener('click', playForest)
fireplaceButton.addEventListener('click', playFireplace)
cafeteriaButton.addEventListener('click', playCafeteria)