const btn_abrir_opçoes = document.querySelector('#abrir_opçoes');
const btn_start = document.querySelector('#btn_start');

const btns = document.querySelectorAll('.btn');

const div_pagina_inicial = document.querySelector('.pagina_inicial');
const div_opçoes_do_jogo = document.querySelector('.opçoes_do_jogo');
const div_pagina_jogo = document.querySelector('.pagina_jogo');

let palavra = '';
let erros = 0;
let acertos = 0;

function removerAcentos(word) {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

btn_abrir_opçoes.addEventListener('click', (event) => {
    event.preventDefault();

    div_opçoes_do_jogo.classList.remove('hidden');
    div_pagina_inicial.classList.add('hidden');
});

btn_start.addEventListener('click', (event) => {
    event.preventDefault();

    const tema = document.querySelector('#tema');

    const alerta = document.querySelector('#alerta');

    if (tema.value === "") {
        return alerta.textContent = 'Insira um tema!';
    }

    let password = document.querySelector('#password');

    if (password.value === "") {
        return alerta.textContent = 'Insira uma palavra!';
    }

    div_opçoes_do_jogo.classList.add('hidden');
    div_pagina_jogo.classList.remove('hidden');

    const tema_jogo = document.querySelector('.tema_content');

    tema_jogo.innerHTML = `Tema: ${tema.value}`;

    palavra = removerAcentos(`${password.value}`) ? removerAcentos(`${password.value}`) : password.value;

    palavra = palavra.toLowerCase();

    const div_palavra = document.querySelector('#palavra');

    div_palavra.innerHTML = '';

    let conteudo = '';

    palavra.split('').forEach((letra, index) => {
        if (letra === ' ') {
            conteudo += `<span data-index="${index}"> </span>`;
            acertos++;
        }
        else {
            conteudo += `<span data-index="${index}">_</span>`;
        }
    });

    div_palavra.innerHTML = conteudo;

    tema.value = '';
    password.value = '';

    const conta_erros = document.querySelector('#conta_erros');
    conta_erros.innerHTML = 0;
});

function reset() {
    palavra = '';
    erros = 0;
    acertos = 0;

    div_opçoes_do_jogo.classList.remove('hidden');
    div_pagina_jogo.classList.add('hidden');

    btns.forEach(function (btn) {
        btn.classList.remove('correto');
        btn.classList.remove('errado');

        btn.disabled = false;
    });
};

btns.forEach(function (btn) {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.target.disabled = true;

        const button_letra = event.target.innerHTML.toLowerCase();

        let temLetra = false;

        palavra.split('').forEach((letra, index) => {
            if (letra === button_letra) {
                const span = document.querySelector(`span[data-index="${index}"]`);
                span.innerHTML = letra.toUpperCase();
                temLetra = true;
                acertos++;
            }
        });

        if (temLetra) {
            event.target.classList.add('correto');
        }
        else {
            event.target.classList.add('errado');
            erros++;
            if (erros === 6) {
                alert(`Você perdeu! A palavra era ${palavra}`);
                reset();
            }
        }

        if (acertos === palavra.length) {
            alert(`Você acertou a palavra! A palavra era ${palavra}`);
            reset();
        }

        const conta_erros = document.querySelector('#conta_erros');
        conta_erros.innerHTML = erros;
    });
})
