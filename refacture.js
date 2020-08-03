const $campos = [...document.querySelectorAll(".campo")];
const $pontoJogador1 = document.querySelector(".pontos-jogador1");
const $pontoJogador2 = document.querySelector(".pontos-jogador2");
const $nomeVencecdorPlacar = document.querySelector(".jogador-vencedor-placar");
const $inputJogador1 = document.querySelector(".nome-jogador1");
const $inputJogador2 = document.querySelector(".nome-jogador2");
const $checkBoxMD = document.querySelector(".checkbox-tipo-partida");
const $botaoMD = document.querySelector(".checkbox-tipo-partida__bolinha");
const $buttonReset = document.querySelector(".button-reiniciar");
const $checkBoxBot = document.querySelector(".checkbox-bot");
const $botaoBot = document.querySelector(".checkbox-bot__bolinha");
const $historicoJogadas = document.querySelector('.historico-jogadas-wrapper');
const $historicoPartidasWrapper = document.querySelector('.historico-partidas-wrapper');
const $botaoJogar = document.querySelector('.button-jogar');

const linha1 = [$campos[0], $campos[1], $campos[2]];
const linha2 = [$campos[3], $campos[4], $campos[5]];
const linha3 = [$campos[6], $campos[7], $campos[8]];
const coluna1 = [$campos[0], $campos[3], $campos[6]];
const coluna2 = [$campos[1], $campos[4], $campos[7]];
const coluna3 = [$campos[2], $campos[5], $campos[8]];
const diagonal1 = [$campos[0], $campos[4], $campos[8]];
const diagonal2 = [$campos[2], $campos[4], $campos[6]];

const linhas = [linha1, linha2, linha3, coluna1, coluna2, coluna3, diagonal1, diagonal2];
const dicionarioCampos = ['Primeiro Campo', 'Segundo Campo', 'Terceiro Campo', 'Quarto Campo', 'Quinto Campo', 'Sexto Campo', 'Sétimo Campo', 'Oitavo Campo', 'Nono Campo'];
const arrayHistoricoJogadas = [];
const arrayHistoricoPartida = [];
const listaJogadas = [];

let jogada = "X";
let vencedor = "";
let placarJogador1 = 0;
let placarJogador2 = 0;
let velha = false;
let md3 = true;
let bot = false;
let jogar = false;

const handleClickCampos = () => {
  $campos.map((campo, index) => {
    campo.addEventListener("click", () => {
      if (vencedor != "") {
        return;
      }
      if (campo.textContent != "") {
        return;
      }
      if (!jogar) {
        return;
      }
      imprimeLetra(index);
      guardaHistoricoJogadas();
      historicoJogadas(index, listaJogadas.length);
      verificaVencedor();
      imprimePontuacao();
      imprimeVencedor();
      verificaMD();
      verificaVelha();
      imprimeVelha();
      if (velha === true || vencedor != "") {
        constroiArrayHistoricoPartida();
        historicoPartidas();
        return resetAutomatico();
      }
      alternaJogada();
      ativaBot();
    });
  })
};

const imprimeLetra = (campo) => {
  const campoAtual = document.querySelector(".campo" + campo);
  campoAtual.textContent = jogada;
};

const alternaJogada = () => {
  if (jogada === "X") {
    jogada = "O";
  } else {
    jogada = "X";
  }
};

const verificaVencedor = () => {
  linhas.map((linha, index) => {
    if (
      linha[0].textContent === linha[1].textContent &&
      linha[1].textContent === linha[2].textContent &&
      linha[0].textContent != ""
    ) {
      vencedor = jogada;
    }
  })
};

const imprimePontuacao = () => {
  if (vencedor === "X") {
    placarJogador1++;
    $pontoJogador1.textContent = placarJogador1;
  } else if (vencedor === "O") {
    placarJogador2++;
    $pontoJogador2.textContent = placarJogador2;
  }
};

const imprimeVencedor = () => {
  if (vencedor === "X") {
    $nomeVencecdorPlacar.textContent = $inputJogador1.value;
  } else if (vencedor === "O") {
    $nomeVencecdorPlacar.textContent = $inputJogador2.value;
  }
};

const verificaVelha = () => {
  let campoVazio = 0;
  $campos.map((campo) => {
    campo.textContent == '' && campoVazio++;
  })
  if ((vencedor == "" && campoVazio == 0)) {
    velha = true;
  } else {
    velha = false;
  }
};

const imprimeVelha = () => {
  if(velha == true){
    $nomeVencecdorPlacar.textContent = 'Ihh... Deu velha!'
  }
};

const resetAutomatico = () => {
  resetaCampos();
  vencedor = "";
  velha = false;
  jogadaAtual = 'X';
  $historicoJogadas.innerHTML = '';
  arrayHistoricoPartida.length = 0;
};

const resetaCampos = () => {
    $campos.map((campo, index) => {
    campo.textContent = '';
  })
};

const resetTudo = () => {
  resetaCampos();
  jogadaAtual = 'X';
  vencedor = "";
  placarJogador1 = 0;
  $pontoJogador1.textContent = "0";
  placarJogador2 = 0;
  $pontoJogador2.textContent = "0";
  velha = false;
  $nomeVencecdorPlacar.textContent = "Nome Jogador";
  $inputJogador1.value = "";
  $inputJogador2.value = "";
  $historicoJogadas.innerHTML = ''
  arrayHistoricoPartida.length = 0;
};

const reiniciaMD = () => {
  resetAutomatico();
  jogadaAtual = 'X';
  vencedor = "";
  placarJogador1 = 0;
  $pontoJogador1.textContent = "0";
  placarJogador2 = 0;
  $pontoJogador2.textContent = "0";
  velha = false;
  $nomeVencecdorPlacar.textContent = "Nome Jogador";
  arrayHistoricoPartida.length = 0;
};

const verificaMD = () => {
  if (md3 === true && (placarJogador1 === 2 || placarJogador2 === 2)) {
    reiniciaMD();
  } else if (md3 === false && (placarJogador1 === 3 || placarJogador2 === 3)) {
    reiniciaMD();
  }
};

const ativaBot = () => {
  if (bot === true) {
    const campoAleatorio = Math.floor(Math.random() * 9);
    if ($campos[campoAleatorio].textContent != "" && velha === false) {
      return ativaBot();
    }
    imprimeLetra(campoAleatorio);
    historicoJogadas(campoAleatorio, listaJogadas.length);
    verificaVencedor();
    imprimePontuacao();
    imprimeVencedor();
    verificaVelha();
    imprimeVelha();
    if (velha === true || vencedor != "") {
      constroiArrayHistoricoPartida();
      historicoPartidas();
      resetAutomatico();
      return;
    }
    verificaMD();
    alternaJogada();
  }
};

const desativarInput2 = () => {
    $inputJogador2.setAttribute('disabled', true);
}

const historicoJogadas = (campo, sequencia) => {
  const campoHistorico = document.createElement('li');
  campoHistorico.classList.add('campo-historico-jogadas');

  const jogadaHistorico = document.createElement('span');
  jogadaHistorico.classList.add('jogada-historico-jogadas');
  jogadaHistorico.textContent = jogada;

  const wrapperCampoJogada = document.createElement('div');
  wrapperCampoJogada.classList.add('nome-campo-jogada');
  
  const jogador = document.createElement('span');
  jogador.classList.add('jogador-historico-jogadas');
  jogador.textContent = jogadorAtual();

  const campoJogada = document.createElement('span');
  campoJogada.classList.add('campo-jogada');
  campoJogada.textContent = dicionarioCampos[campo];

  $historicoJogadas.appendChild(campoHistorico);
  campoHistorico.appendChild(jogadaHistorico);
  campoHistorico.appendChild(wrapperCampoJogada);
  wrapperCampoJogada.appendChild(jogador);
  wrapperCampoJogada.appendChild(campoJogada);

  campoHistorico.addEventListener('click', () => {
    listaJogadas[sequencia-1].map((campo, index) => {
      $campos[index].textContent = campo;
    })
   })
}

const historicoPartidas = () => {
  const historicoPartidaCard = document.createElement('li');
  historicoPartidaCard.classList.add('historico-partidas');

  const vencedorPartidaWrapper = document.createElement('div');
  vencedorPartidaWrapper.classList.add('vecedor-partidas-wrapper');

  const vencedorPartida = document.createElement('h1');
  vencedorPartida.classList.add('vencedor-partidas');
  vencedorPartida.textContent = velha ? 'Velha' : 'Vencedor';

  const nomeVencedorPartida = document.createElement('h2');
  nomeVencedorPartida.classList.add('nome-vencedor-partidas');
  nomeVencedorPartida.textContent = velha ? 'Ihh... Deu velha!' : jogadorAtual();

  const textoCenario = document.createElement('h2');
  textoCenario.classList.add('cenario-partida');
  textoCenario.textContent = 'Cenário';

  const boxMiniCampo = document.createElement('ul');
  boxMiniCampo.classList.add('box-mini-campo');

  arrayHistoricoPartida.map((jogada) => {
    const miniCampo = document.createElement('li');
    miniCampo.classList.add('mini-campo');
    miniCampo.textContent = jogada;

    boxMiniCampo.appendChild(miniCampo);
  })

  $historicoPartidasWrapper.appendChild(historicoPartidaCard);
  historicoPartidaCard.appendChild(vencedorPartidaWrapper);
  historicoPartidaCard.appendChild(textoCenario);
  historicoPartidaCard.appendChild(boxMiniCampo);
  vencedorPartidaWrapper.appendChild(vencedorPartida);
  vencedorPartidaWrapper.appendChild(nomeVencedorPartida);
}

const constroiArrayHistoricoPartida = () => {
  $campos.map((campo) => {
    arrayHistoricoPartida.push(campo.textContent);
  })
}

const jogadorAtual = () => {
  if(jogada == 'X'){ 
    return $inputJogador1.value;
  } else if(bot == true){
    return 'Bot';
  } else if(jogada == 'O'){
    return $inputJogador2.value;
  } 
}

const guardaHistoricoJogadas = () => {
  const novoHistoricoJogadas = $campos.map((campo) => {
    return campo.textContent;
  });
  listaJogadas.push(novoHistoricoJogadas);
}

$checkBoxMD.addEventListener("click", () => {
  $botaoMD.classList.toggle("checkbox-bot-md-bolinha-clicked");
  if (md3 === true) {
    md3 = false;
  } else {
    md3 = true;
  }
});

$checkBoxBot.addEventListener("click", () => {
  $botaoBot.classList.toggle("checkbok-bot-bolinha-clicked");
  if (bot === false) {
    bot = true;
    desativarInput2();
  } else {
    bot = false;
  }
});

$buttonReset.addEventListener("click", () => {
  resetTudo();
});

$botaoJogar.addEventListener('click', () => {
  jogar = !jogar;
  if (jogar === true) {
    $botaoJogar.textContent = 'Finalizar'
  } else if(jogar === false) {
    $botaoJogar.textContent = 'Jogar'
  };
})

handleClickCampos();
