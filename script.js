const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const startPauseBtTexto = document.querySelector('#start-pause span')
const startPauseBtIcone = document.querySelector('#start-pause img')
const temporizador = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const tempPause = new Audio('/sons/pause.mp3')
const tempPlay = new Audio('/sons/play.wav')
const tempZerado = new Audio('/sons/beep.mp3')

tempPause.volume = 0.5;
tempPlay.volume = 0.5;
tempZerado.volume = 0.5;

let temporizadorSegundos = 25 * 60
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()        
    } else {
        musica.pause()
    }
})

musica.loop = true

focoBt.addEventListener('click', () => {
    temporizadorSegundos = 25 * 60
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    temporizadorSegundos = 5 * 60
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    temporizadorSegundos = 15 * 60
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade, <br>
                <strong class = "app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada? 
                <strong class = "app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície. 
                <strong class = "app__title-strong">Faça uma pausa longa!</strong>
            ` 
            break;  
    }
}

const contagemRegressiva = () => {
    if(temporizadorSegundos <= 0){
        tempZerado.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    temporizadorSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if (intervaloId) {
        tempPause.play()
        zerar()
        return
    }
    tempPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBtTexto.textContent = "Pausar"
    startPauseBtIcone.setAttribute ('src', '/imagens/pause.png')
}

function zerar(){
    startPauseBtTexto.textContent = "Começar"
    startPauseBtIcone.setAttribute ('src', '/imagens/play_arrow.png')
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(temporizadorSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoFormatado}`
}

mostrarTempo()