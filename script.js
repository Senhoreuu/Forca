const btn_abrir_opçoes = document.querySelector('#abrir_opçoes');
const btn_start = document.querySelector('#btn_start');

const btns = document.querySelectorAll('.btn');

const div_pagina_inicial = document.querySelector('.pagina_inicial');
const div_opçoes_do_jogo = document.querySelector('.opçoes_do_jogo');
const div_pagina_jogo = document.querySelector('.pagina_jogo');

let palavra = '';
let erros = 0;
let acertos = 0;

function removerAcentos(palavra) {
    return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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

    password = removerAcentos(password).toLowerCase();

    palavra = password.value;

    const div_palavra = document.querySelector('#palavra');

    div_palavra.innerHTML = '';

    let conteudo = '';

    palavra.split('').forEach((_, index) => {
        conteudo += `<span data-index="${index}">_</span>`;
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

        let button_letra = event.target.innerHTML.toLowerCase();

        if (button_letra === 'espaço') {
            button_letra = ' ';
        }

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
