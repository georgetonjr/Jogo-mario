let engine = {
  cores: ["green", "purple", "pink", "red", "yellow", "orange"],
  hexadecimais: {
    green: "#02ef00",
    purple: "#790093",
    pink: "##ff00aa",
    red: "#e90808",
    yellow: "#e7d703",
    orange: "#f16529",
  },
  moedas: 0,
};

const audioMoeda = new Audio("/audio/moeda.mp3");
const audioErrou = new Audio("/audio/errou.mp3");

function sortearCor() {
  let indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
  let legendaCorDaCaixa = document.querySelector("#cor-na-caixa");
  let nomeCorSorteada = engine.cores[indexCorSorteada];

  legendaCorDaCaixa.innerHTML = nomeCorSorteada.toUpperCase();

  return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor) {
  let caixaDasCores = document.querySelector("#cor-atual");

  caixaDasCores.style.backgroundColor = nomeDaCor;
  caixaDasCores.style.backgroundImage = "url('/img/caixa-fechada.png')";
  caixaDasCores.style.backgroundSize = "100%";
}

function atualizarPontuacao(valor) {
  var pontuacao = document.querySelector("#pontuacao-atual");
  engine.moedas += valor;

  if (valor < 0) {
    audioErrou.play();
  } else {
    audioMoeda.play();
  }

  pontuacao.innerHTML = engine.moedas;
}

aplicarCorNaCaixa(sortearCor());

let btnGravador = document.querySelector("#btn-responder");
let transcricao = "";
var respostaCorreta = "";

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  var gravador = new SpeechAPI();

  gravador.continuos = false;
  gravador.lang = "en-US";

  gravador.onstart = function () {
    btnGravador.innerHTML = "Estou ouvindo";

    btnGravador.style.backgroundColor = "white";
    btnGravador.style.color = "black";
  };

  gravador.onend = function () {
    btnGravador.innerHTML = "Responder";

    btnGravador.style.backgroundColor = "transparent";
    btnGravador.style.color = "white";
  };

  gravador.onresult = function (event) {
    transcricao = event.results[0][0].transcript.toUpperCase();

    respostaCorreta = document
      .querySelector("#cor-na-caixa")
      .innerText.toUpperCase();

    if (transcricao === respostaCorreta) {
      atualizarPontuacao(1);
    } else {
      atualizarPontuacao(-1);
    }
    aplicarCorNaCaixa(sortearCor());
    console.log(transcricao);
  };
} else {
  alert("Navegador sem suporte!!");
}

btnGravador.addEventListener("click", function () {
  gravador.start();
});
