const $checkboxBot = document.querySelector('.checkbox-bot');
const $checkboxBotBolinha = document.querySelector('.checkbox-bot__bolinha');
const $checkboxMd = document.querySelector('.checkbox-tipo-partida');
const $checkboxMdBolinha = document.querySelector('.checkbox-tipo-partida__bolinha');
const $campo0 = document.querySelector('.campo0');
const $campo1 = document.querySelector('.campo1');
const $campo2 = document.querySelector('.campo2');
const $campo3 = document.querySelector('.campo3');
const $campo4 = document.querySelector('.campo4');
const $campo5 = document.querySelector('.campo5');
const $campo6 = document.querySelector('.campo6');
const $campo7 = document.querySelector('.campo7');
const $campo8 = document.querySelector('.campo8');
const $placarJogador1 = document.querySelector('.pontos-jogador1');
const $placarJogador2 = document.querySelector('.pontos-jogador2');
const $vencedorPlacar = document.querySelector('.jogador-vencedor-placar');
const $nomeJogador1 = document.querySelector('.nome-jogador1');
const $nomeJogador2 = document.querySelector('.nome-jogador2');
const $historicoJogadas = document.querySelector('.historico-jogadas-wrapper');
const $historicoPartidasWrapper = document.querySelector('.historico-partidas-wrapper');
const $botaoJogar = document.querySelector('.button-jogar');
const $botaoReiniciar = document.querySelector('.button-reiniciar');


const linha1 = [$campo0, $campo1, $campo2];
const linha2 = [$campo3, $campo4, $campo5];
const linha3 = [$campo6, $campo7, $campo8];
const coluna1 = [$campo0, $campo3, $campo6];
const coluna2 = [$campo1, $campo4, $campo7];
const coluna3 = [$campo2, $campo5, $campo8];
const diagonal1 = [$campo0, $campo4, $campo8];
const diagonal2 = [$campo2, $campo4, $campo6];

const dicionarioCampos = ['Primeiro Campo', 'Segundo Campo', 'Terceiro Campo', 'Quarto Campo', 'Quinto Campo', 'Sexto Campo', 'Sétimo Campo', 'Oitavo Campo', 'Nono Campo'];
const linhas = [linha1, linha2, linha3, coluna1, coluna2, coluna3, diagonal1, diagonal2];
const arrayHistoricoJogadas = [];
const historicoUltimaPartida = [];

let jogadaAtual = 'X';
let vencedor = '';
let pontosJogador1 = 0;
let pontosJogador2 = 0;
let md3 = true;
let botAtivo = false;
let jogar = false;

function imprimeLetra(campo) {
    const campoAtual = document.querySelector('.campo' + campo);
    campoAtual.textContent = jogadaAtual;
}

function alternaJogada() {
    if (jogadaAtual == 'X') {
        jogadaAtual = 'O'
    } else {
        jogadaAtual = 'X'
    }
} 1

function verificaVencedor() {
    for (linha of linhas) {
        const linha0 = linha[0].textContent;
        const linha1 = linha[1].textContent;
        const linha2 = linha[2].textContent;

        if (linha0 == linha1 && linha1 == linha2 && linha0 != '' && linha1 != '' && linha2 != '') {
            vencedor = jogadaAtual;
        }
    }
}

function resetaVencedor() {
    $campo0.textContent = '';
    $campo1.textContent = '';
    $campo2.textContent = '';
    $campo3.textContent = '';
    $campo4.textContent = '';
    $campo5.textContent = '';
    $campo6.textContent = '';
    $campo7.textContent = '';
    $campo8.textContent = '';
    vencedor = '';
    $historicoJogadas.innerHTML = '';
    limpaArray(historicoUltimaPartida);

}

function adicionaPontos() {
    if (vencedor == 'X') {
        pontosJogador1++
    };
    if (vencedor == 'O') {
        pontosJogador2++
    };
}

function imprimePlacar() {
    if (vencedor == 'X') {
        $placarJogador1.textContent = pontosJogador1
    };
    if (vencedor == 'O') {
        $placarJogador2.textContent = pontosJogador2
    };
}

function imprimeNomeVencedor() {
    const jogador1 = $nomeJogador1.value;
    const jogador2 = $nomeJogador2.value;

    if (vencedor == 'X') {
        $vencedorPlacar.textContent = jogador1
    };
    if (vencedor == 'O') {
        $vencedorPlacar.textContent = jogador2
    };
}

function verificaVelha() {
    const listaDeCampos = [$campo0, $campo1, $campo2, $campo3, $campo4, $campo5, $campo6, $campo7, $campo8];
    let quantidadeItensVazios = 0;

    for (campo of listaDeCampos) {
        if (campo.textContent == '') {
            quantidadeItensVazios++
        };
    }
    if (vencedor == '' && quantidadeItensVazios == 0) {
        return true;
    } else {
        return false
    };
}

function verificaMD() {
    if (md3 && (pontosJogador1 == 2 || pontosJogador2 == 2)) {
        return true;
    } else if (!md3 && (pontosJogador1 == 3 || pontosJogador2 == 3)) {
        return true;
    } else {
        return false;
    }

}

function resetMD() {
    resetaVencedor();
    pontosJogador1 = 0;
    pontosJogador2 = 0;
    $placarJogador1.textContent = '0';
    $placarJogador2.textContent = '0';
    $vencedorPlacar.textContent = 'Nome Jogador';
}

function criaHistoricoJogadas(campo, sequencia) {
    const campoHistorico = document.createElement('li');
    campoHistorico.classList.add('campo-historico-jogadas');

    const jogada = document.createElement('span');
    jogada.classList.add('jogada-historico-jogadas');
    jogada.textContent = jogadaAtual;

    const wrapperJogadaCampo = document.createElement('div');
    wrapperJogadaCampo.classList.add('nome-campo-jogada');

    const jogador = document.createElement('span');
    jogador.classList.add('jogador-historico-jogadas');
    jogador.textContent = jogadorAtual();

    const campoJogada = document.createElement('span');
    campoJogada.classList.add('campo-jogada');
    campoJogada.textContent = dicionarioCampos[campo];

    campoHistorico.addEventListener('click', function () {
        const listaDeCampos = [$campo0, $campo1, $campo2, $campo3, $campo4, $campo5, $campo6, $campo7, $campo8];
        for (let i = 0; i < listaDeCampos.length; i++) {
            listaDeCampos[i].textContent = arrayHistoricoJogadas[sequencia][i];
        }
    })

    $historicoJogadas.appendChild(campoHistorico);
    campoHistorico.appendChild(jogada);
    campoHistorico.appendChild(wrapperJogadaCampo);
    wrapperJogadaCampo.appendChild(jogador);
    wrapperJogadaCampo.appendChild(campoJogada);
}

function jogadorAtual() {
    if (jogadaAtual == 'X') {
        return $nomeJogador1.value
    } else {
        return $nomeJogador2.value
    };
}

function criaArrayHistoricoJogadas() {
    const listaDeCampos = [$campo0, $campo1, $campo2, $campo3, $campo4, $campo5, $campo6, $campo7, $campo8];
    limpaArray(historicoUltimaPartida);
    for (campo of listaDeCampos) {
        historicoUltimaPartida.push(campo.textContent);
    }
}

function limpaArray(array) {
    array.length = 0;
}

function criaHistoricoPartida() {
    const historicoPartida = document.createElement('div');
    historicoPartida.classList.add('historico-partidas');

    const vencedorPartidasWrapper = document.createElement('div');
    vencedorPartidasWrapper.classList.add("vecedor-partidas-wrapper");

    const vencedorPartida = document.createElement('h1');
    vencedorPartida.classList.add('vencedor-partidas');
    if (verificaVelha()) {
        vencedorPartida.textContent = 'Velha';
    } else {
        vencedorPartida.textContent = 'Vencedor';
    }

    const nomeVencedorPartida = document.createElement('h2');
    nomeVencedorPartida.classList.add("nome-vencedor-partidas");
    if (verificaVelha()) {
        nomeVencedorPartida.textContent = '';
    } else {
        nomeVencedorPartida.textContent = jogadorAtual();
    }

    const cenario = document.createElement('h2');
    cenario.classList.add("cenario-partida");
    cenario.textContent = 'Cenário';

    const boxMiniCampo = document.createElement('ul');
    boxMiniCampo.classList.add("box-mini-campo");

    for (jogada of historicoUltimaPartida) {
        const miniCampo = document.createElement('li');
        miniCampo.classList.add('mini-campo');
        miniCampo.textContent = jogada;

        boxMiniCampo.appendChild(miniCampo);
    }

    $historicoPartidasWrapper.appendChild(historicoPartida);
    historicoPartida.appendChild(vencedorPartidasWrapper);
    historicoPartida.appendChild(cenario);
    historicoPartida.appendChild(boxMiniCampo);
    vencedorPartidasWrapper.appendChild(vencedorPartida);
    vencedorPartidasWrapper.appendChild(nomeVencedorPartida);

}

function bot() {
    const numeroAleatorio = Math.floor(Math.random() * 9);
    const campoJogadaBot = document.querySelector('.campo' + numeroAleatorio);
    if (verificaVelha() || vencedor != '') {
        return;
    }
    if (campoJogadaBot.textContent != '' && vencedor == '') {
        return bot()
    };
    imprimeLetra(numeroAleatorio);
    criaHistoricoJogadas(numeroAleatorio, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
}

function guardaHistoricoJogadas() {
    const novoArrayUltimaPartida = [...historicoUltimaPartida];
    arrayHistoricoJogadas.push(novoArrayUltimaPartida);
}

function reset() {
    resetMD();
    $historicoPartidasWrapper.innerHTML = '';
}

$checkboxBot.addEventListener('click', function () {
    $checkboxBotBolinha.classList.toggle('checkbok-bot-bolinha-clicked');
    botAtivo = !botAtivo;

})

$checkboxMd.addEventListener('click', function () {
    $checkboxMdBolinha.classList.toggle('checkbox-bot-md-bolinha-clicked')
    md3 = !md3;
})

$botaoJogar.addEventListener('click', function () {
    jogar = !jogar;
    if (jogar) {
        $botaoJogar.textContent = 'Finalizar'
    } else {
        $botaoJogar.textContent = 'Jogar'
    };
})

$botaoReiniciar.addEventListener('click', reset);

$campo0.addEventListener('click', function () {
    if (vencedor != '' || $campo0.textContent != '' || !jogar) return;
    imprimeLetra(0);
    criaHistoricoJogadas(0, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
    if (botAtivo == true) {
        bot();
    }
})

$campo1.addEventListener('click', function () {
    if (vencedor != '' || $campo1.textContent != '' || !jogar) return;
    imprimeLetra(1);
    criaHistoricoJogadas(1, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
    if (botAtivo == true) {
        bot();
    }
})

$campo2.addEventListener('click', function () {
    if (vencedor != '' || $campo2.textContent != '' || !jogar) return;
    imprimeLetra(2);
    criaHistoricoJogadas(2, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
    if (botAtivo == true) {
        bot();
    }
})

$campo3.addEventListener('click', function () {
    if (vencedor != '' || $campo3.textContent != '' || !jogar) return;
    imprimeLetra(3);
    criaHistoricoJogadas(3, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
    if (botAtivo == true) {
        bot();
    }
})

$campo4.addEventListener('click', function () {
    if (vencedor != '' || $campo4.textContent != '' || !jogar) return;
    imprimeLetra(4);
    criaHistoricoJogadas(4, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
    if (botAtivo == true) {
        bot();
    }
})

$campo5.addEventListener('click', function () {
    if (vencedor != '' || $campo5.textContent != '' || !jogar) return;
    imprimeLetra(5);
    criaHistoricoJogadas(5, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
    if (botAtivo == true) {
        bot();
    }
})

$campo6.addEventListener('click', function () {
    if (vencedor != '' || $campo6.textContent != '' || !jogar) return;
    imprimeLetra(6);
    criaHistoricoJogadas(6, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
    if (botAtivo == true) {
        bot();
    }
})

$campo7.addEventListener('click', function () {
    if (vencedor != '' || $campo7.textContent != '' || !jogar) return;
    imprimeLetra(7);
    criaHistoricoJogadas(7, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
    if (botAtivo == true) {
        bot();
    }
})

$campo8.addEventListener('click', function () {
    if (vencedor != '' || $campo8.textContent != '' || !jogar) return;
    imprimeLetra(8);
    criaHistoricoJogadas(8, arrayHistoricoJogadas.length);
    criaArrayHistoricoJogadas();
    guardaHistoricoJogadas();
    verificaVencedor();
    if (verificaVelha()) {
        criaHistoricoPartida();
        setTimeout(resetaVencedor, 1000);
    } else if (vencedor == '') {
        alternaJogada()
    } else {
        criaHistoricoPartida();
        adicionaPontos();
        imprimePlacar();
        imprimeNomeVencedor();
        if (verificaMD()) {
            setTimeout(resetMD, 1000)
        } else {
            setTimeout(resetaVencedor, 1000)
        };
    };
    if (botAtivo == true) {
        bot();
    }
})