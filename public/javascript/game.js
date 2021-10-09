const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'; 
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
let sentenceCountValue = -1;
let recentSpeed = 0;
let pastSpeed = 0;

quoteInputElement.addEventListener('input',() => { 
    const arrayQuote  = quoteDisplayElement.querySelectorAll('span'); 
    const arrayValue = quoteInputElement.value.split('')

    let correct = true;
    arrayQuote.forEach((characterSpan,index) => { 
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false 
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
        })

        if (correct) renderNewQuote();
    })


function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content); 
}

async function renderNewQuote() { 
    const quote = await getRandomQuote(); 
    quoteDisplayElement.innerHTML = ''; 
    sentenceCountValue += 1;
    document.getElementById('SC_value').innerHTML = sentenceCountValue;
    quote.split('').forEach(character => { 
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    })
    quoteInputElement.value = null;
    recentSpeed = (getSpeed(timerElement));
    pastSpeed = compareSpeed(pastSpeed,recentSpeed);
    startTimer()
}

let startTime;
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date()
    setInterval(() => { 
        timer.innerText = getTimerTime();
    }, 1000)
}


function getTimerTime() {
   return Math.floor((new Date() - startTime) / 1000); 
}
function getSpeed(timerElement,recentSpeed) {

    const arrayQuote  = quoteDisplayElement.querySelectorAll('span');
 
    arrayQuote.forEach((characterSpan,index) => {
        const character = arrayQuote[index].innerText;
 
        if (character === " ") { 
            characterSpan.classList.add("space");
        } 
    })
    const wordCountArray = document.querySelectorAll('.space'); 
    const wordCount = wordCountArray.length + 1;
    let time = parseInt(timerElement.innerHTML)
    console.log(wordCount);
    recentSpeed = Math.floor((wordCount/time) * 60);
    document.querySelector("#recentSpeed").innerHTML = recentSpeed;
    if (isNaN(recentSpeed)) {
        document.querySelector("#recentSpeed").innerHTML = 0;
    }
    return(recentSpeed)
}

function compareSpeed (pastSpeed, recentSpeed) {
    if (recentSpeed > pastSpeed) {
        document.querySelector("#topSpeed").innerHTML = recentSpeed;
        pastSpeed = recentSpeed
    }
       return pastSpeed; 
}


renderNewQuote();