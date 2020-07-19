const $campos = document.querySelectorAll('.campo');
const $pontoJogador1 = document.querySelector('.pontos-jogador1');
const $pontoJogador2 = document.querySelector('.pontos-jogador2');
const $nomeVencecdorPlacar = document.querySelector('.jogador-vencedor-placar');
const $inputJogador1 = document.querySelector('.nome-jogador1');
const $inputJogador2 = document.querySelector('.nome-jogador2');
const $checkBoxMD = document.querySelector('.checkbox-tipo-partida');
const $botaoMD = document.querySelector('.checkbox-tipo-partida__bolinha');
const $buttonReset = document.querySelector('.button-reiniciar');
const $checkBoxBot = document.querySelector('.checkbox-bot');
const $botaoBot = document.querySelector('.checkbox-bot__bolinha');
 
const linha1 = [$campos[0], $campos[1], $campos[2]];
const linha2 = [$campos[3], $campos[4], $campos[5]];
const linha3 = [$campos[6], $campos[7], $campos[8]];
const coluna1 = [$campos[0], $campos[3], $campos[6]];
const coluna2 = [$campos[1], $campos[4], $campos[7]];
const coluna3 = [$campos[2], $campos[5], $campos[8]];
const diagonal1 = [$campos[0], $campos[4], $campos[8]];
const diagonal2 = [$campos[2], $campos[4], $campos[6]];

const linha = [linha1, linha2, linha3, coluna1, coluna2, coluna3, diagonal1, diagonal2];

let jogada = 'X';
let vencedor = '';
let placarJogador1 = 0;
let placarJogador2 = 0;
let velha = undefined;
let md3 = true;
let bot = false;


const handleClickCampos = () => {
    for(let i = 0; i < $campos.length; i++) {
        $campos[i].addEventListener('click', () => {
            if(vencedor != ''){
                return;           
            } 
            if($campos[i].textContent != '') {
                return;
            }
            imprimeLetra(i);
            verificaVencedor();
            imprimePontuacao();
            imprimeVencedor();
            imprimeVelha();
            if(velha === true || vencedor != '') {
                setTimeout(resetAutomatico, 2000);
            }
            setTimeout(verificaMD, 2000)
            alternaJogada();
            ativaBot();

        });
    }
}

const imprimeLetra = (campo) => {
    const campoAtual = document.querySelector('.campo' + campo);
    campoAtual.textContent = jogada;
};

const alternaJogada = () => {
    if(jogada === 'X') {
        jogada = 'O';
    } else {
        jogada = 'X';
    }
}

const verificaVencedor = () => {
    for(let i = 0; i < linha.length; i++) {
        if(linha[i][0].textContent === linha[i][1].textContent && linha[i][1].textContent === linha[i][2].textContent && linha[i][0].textContent != '') {
            vencedor = jogada;
        }
    }

}

const imprimePontuacao = () => {
    if(vencedor === 'X') {
        placarJogador1++;
        $pontoJogador1.textContent = placarJogador1;
    } else if (vencedor === 'O') {
        placarJogador2++;
        $pontoJogador2.textContent = placarJogador2;
    }
}

const imprimeVencedor = () => {
    if(vencedor === 'X') {
        $nomeVencecdorPlacar.textContent = $inputJogador1.value;
    } else if(vencedor === 'O') {
        $nomeVencecdorPlacar.textContent = $inputJogador2.value;
    } 
    }

    const imprimeVelha = () => {
        for(let i = 0; i < linha.length; i++) {
            if(linha[i][0].textContent != linha[i][1].textContent && linha[i][1].textContent != linha[i][2].textContent && linha[i][0].textContent != '' && linha[i][1].textContent != '' && linha[i][2].textContent != '') {
                $nomeVencecdorPlacar.textContent = 'Ihh... Deu velha!';
                velha = true;
            } else {
                return;
            }
    }
}

const resetAutomatico = () => {
        resetaCampos();
        vencedor = '';
        velha = false;
}

const resetaCampos = () => {
    for(let i = 0; i < $campos.length; i++) {
        $campos[i].textContent = '';
    }
}



const resetTudo = () => {
    resetaCampos();
    vencedor = '';
    placarJogador1 = 0;
    $pontoJogador1.textContent = '0';
    placarJogador2 = 0;
    $pontoJogador2.textContent = '0';
    velha = false;
    $nomeVencecdorPlacar.textContent = 'Nome Jogador';
    $inputJogador1.value = '';
    $inputJogador2.value = '';
}

const reiniciaMD = () => {
    resetaCampos();
    vencedor = '';
    placarJogador1 = 0;
    $pontoJogador1.textContent = '0';
    placarJogador2 = 0;
    $pontoJogador2.textContent = '0';
    velha = false;
    $nomeVencecdorPlacar.textContent = 'Nome Jogador';
}

const verificaMD = () => {
    if(md3 === true && (placarJogador1 === 2 || placarJogador2 === 2)){
        reiniciaMD();
    } else if(md3 === false && (placarJogador1 === 3 || placarJogador2 === 3)){
        reiniciaMD();
    }

}

const ativaBot = () => {
    const campoAleatorio = Math.floor(Math.random() * 9);
    console.log($campos[campoAleatorio]);
    if($campos[campoAleatorio].textContent != '' && velha === false) {
        return ativaBot();
    }
    if(bot === true){
        if(vencedor != ''){
            return;           
        } 
        if($campos[campoAleatorio].textContent != '') {
            return;
        }
        imprimeLetra(campoAleatorio);
        verificaVencedor();
        imprimePontuacao();
        imprimeVencedor();
        imprimeVelha();
        if(velha === true || vencedor != '') {
            setTimeout(resetAutomatico, 2000);
        }
        setTimeout(verificaMD, 2000)
        alternaJogada();
    }
}

$checkBoxMD.addEventListener('click', () => {
    $botaoMD.classList.toggle('checkbox-bot-md-bolinha-clicked');
    if(md3 === true) {
        md3 = false;
    } else {
        md3 = true;
    }
})

$checkBoxBot.addEventListener('click', () => {
    $botaoBot.classList.toggle('checkbok-bot-bolinha-clicked');
    if(bot === false){
        bot = true;
    } else {
        bot = false;
    }
    console.log(bot);
})

$buttonReset.addEventListener('click', () => {
    resetTudo();
})

handleClickCampos();