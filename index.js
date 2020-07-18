const $checkboxBot = document.querySelector('.checkbox-bot');
const $checkboxBotBolinha = document.querySelector('.checkbox-bot__bolinha');
const $checkboxMd = document.querySelector('.checkbox-tipo-partida');
const $checkboxMdBolinha = document.querySelector('.checkbox-tipo-partida__bolinha');
const $campos = document.querySelectorAll('.campo');
const $placarJogador1 = document.querySelector('.pontos-jogador1');
const $placarJogador2 = document.querySelector('.pontos-jogador2');
const $vencedorPlacar = document.querySelector('.jogador-vencedor-placar');
const $nomeJogador1 = document.querySelector('.nome-jogador1');
const $nomeJogador2 = document.querySelector('.nome-jogador2');
const $historicoJogadas = document.querySelector('.historico-jogadas-wrapper');
const $historicoPartidasWrapper = document.querySelector('.historico-partidas-wrapper');
const $botaoJogar = document.querySelector('.button-jogar');
const $botaoReiniciar = document.querySelector('.button-reiniciar');

const linha1 = [$campos[0], $campos[1], $campos[2]];
const linha2 = [$campos[3], $campos[4], $campos[5]];
const linha3 = [$campos[6], $campos[7], $campos[8]];
const coluna1 = [$campos[0], $campos[3], $campos[6]];
const coluna2 = [$campos[1], $campos[4], $campos[7]];
const coluna3 = [$campos[2], $campos[5], $campos[8]];
const diagonal1 = [$campos[0], $campos[4], $campos[8]];
const diagonal2 = [$campos[2], $campos[4], $campos[6]];

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

const imprimeLetra = campo =>{
    const campoAtual = document.querySelector('.campo' + campo);
    campoAtual.textContent = jogadaAtual;
}

const alternaJogada = () =>{
    jogadaAtual == 'X' ? jogadaAtual = 'O' : jogadaAtual = 'X';
}

const verificaVencedor = () =>{
    for (linha of linhas) {
        const linha0 = linha[0].textContent;
        const linha1 = linha[1].textContent; ''
        const linha2 = linha[2].textContent;

        if (linha0 == linha1 && linha1 == linha2 && linha0 != '' && linha1 != '' && linha2 != '') {
            vencedor = jogadaAtual;
        }
    }
}

const resetaVencedor = () =>{
    for($campo of $campos){
        $campo.textContent = '';
    }
    vencedor = '';
    $historicoJogadas.innerHTML = '';
    limpaArray(historicoUltimaPartida);

}

const adicionaPontos = () =>{
    vencedor == 'X' && pontosJogador1++;
    vencedor == 'O' && pontosJogador2++;
}

const imprimePlacar = () =>{
    vencedor == 'X' && ($placarJogador1.textContent = pontosJogador1);
    vencedor == 'O' && ($placarJogador2.textContent = pontosJogador2);
}

const imprimeNomeVencedor = () =>{
    const jogador1 = $nomeJogador1.value;
    const jogador2 = $nomeJogador2.value;

    vencedor == 'X' && ($vencedorPlacar.textContent = jogador1);
    vencedor == 'O' && ($vencedorPlacar.textContent = jogador2);
}

const verificaVelha = () =>{;
    let quantidadeItensVazios = 0;

    for (campo of $campos) {
        campo.textContent == '' && quantidadeItensVazios++;
    }
    if (vencedor == '' && quantidadeItensVazios == 0) {
        return true;
    } else {
        return false
    };
}

const verificaMD = () =>{
    if (md3 && (pontosJogador1 == 2 || pontosJogador2 == 2)) {
        return true;
    } else if (!md3 && (pontosJogador1 == 3 || pontosJogador2 == 3)) {
        return true;
    } else {
        return false;
    }

}

const resetMD = () =>{
    resetaVencedor();
    pontosJogador1 = 0;
    pontosJogador2 = 0;
    $placarJogador1.textContent = '0';
    $placarJogador2.textContent = '0';
    $vencedorPlacar.textContent = 'Nome Jogador';
}

const criaHistoricoJogadas = (campo, sequencia) =>{
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

    campoHistorico.addEventListener('click', () => {
        for (let i = 0; i < $campos.length; i++) {
            $campos[i].textContent = arrayHistoricoJogadas[sequencia][i];
        }
    })

    $historicoJogadas.appendChild(campoHistorico);
    campoHistorico.appendChild(jogada);
    campoHistorico.appendChild(wrapperJogadaCampo);
    wrapperJogadaCampo.appendChild(jogador);
    wrapperJogadaCampo.appendChild(campoJogada);
}

const jogadorAtual = () =>{
    if (jogadaAtual == 'X') {
        return $nomeJogador1.value
    } else {
        return $nomeJogador2.value
    };
}

const criaArrayHistoricoJogadas = () =>{
    limpaArray(historicoUltimaPartida);
    for (campo of $campos) {
        historicoUltimaPartida.push(campo.textContent);
    }
}

const limpaArray = array =>{
    array.length = 0;
}

const criaHistoricoPartida = () =>{
    const historicoPartida = document.createElement('div');
    historicoPartida.classList.add('historico-partidas');

    const vencedorPartidasWrapper = document.createElement('div');
    vencedorPartidasWrapper.classList.add("vecedor-partidas-wrapper");

    const vencedorPartida = document.createElement('h1');
    vencedorPartida.classList.add('vencedor-partidas');
    vencedorPartida.textContent = verificaVelha() ? 'Velha' : 'Vencedor';   

    const nomeVencedorPartida = document.createElement('h2');
    nomeVencedorPartida.classList.add("nome-vencedor-partidas");
    nomeVencedorPartida.textContent = verificaVelha() ? '' : jogadorAtual();

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

const bot = () =>{
    const numeroAleatorio = Math.floor(Math.random() * 9);
    const campoJogadaBot = document.querySelector('.campo' + numeroAleatorio);
    if (verificaVelha() || vencedor != '') return;
    if (campoJogadaBot.textContent != '' && vencedor == '') return bot();

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
        verificaMD() ? setTimeout(resetMD, 1000) : setTimeout(resetaVencedor, 1000);
    };
}

const guardaHistoricoJogadas = () =>{
    const novoArrayUltimaPartida = [...historicoUltimaPartida];
    arrayHistoricoJogadas.push(novoArrayUltimaPartida);
}

const reset = () =>{
    resetMD();
    $historicoPartidasWrapper.innerHTML = '';
}

$checkboxBot.addEventListener('click', () => {
    $checkboxBotBolinha.classList.toggle('checkbok-bot-bolinha-clicked');
    botAtivo = !botAtivo;

})

$checkboxMd.addEventListener('click', () => {
    $checkboxMdBolinha.classList.toggle('checkbox-bot-md-bolinha-clicked')
    md3 = !md3;
})

$botaoJogar.addEventListener('click', () =>{
    jogar = !jogar;
    jogar ? ($botaoJogar.textContent = 'Finalizar') : ($botaoJogar.textContent = 'Jogar');
})

$botaoReiniciar.addEventListener('click', reset);


const inicializacao = () =>{
    for (let i = 0; i < $campos.length; i++) {
        $campos[i].addEventListener('click', function () {
            if (vencedor != '' || $campos[i].textContent != '' || !jogar) return;
            imprimeLetra(i);
            criaHistoricoJogadas(i, arrayHistoricoJogadas.length);
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
                verificaMD() ? setTimeout(resetMD, 1000) : setTimeout(resetaVencedor, 1000);
            };
            botAtivo && bot();
        })
    }
}

inicializacao();