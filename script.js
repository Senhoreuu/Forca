const game = {
    start: false,
    word: '',
    errorCount: 0,
    corrects: 0
};

function removeAccents(word) {
    return word.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');
}

function updateErrors() {
    const conta_erros = $('#conta_erros');
    conta_erros.text(game.errorCount);

    if (game.errorCount === 6) {
        loser();
    }
}

function clearButtons() {
    $('.btn').each((_, btn) => {
        btn.classList.remove('correto');
        btn.classList.remove('errado');

        btn.disabled = false;
    });
}

function updateLetter(letter_btn) {
    let hasLetter = false;

    game.word.split('').forEach((letter, index) => {
        if (letter === letter_btn) {
            const span = $(`span[data-index="${index}"]`);
            span.text(letter.toUpperCase());
            hasLetter = true;
            game.corrects++;
        }
    });

    return hasLetter;
}

function openOptions(event) {
    event.preventDefault();

    $('.opçoes_do_jogo').removeClass('hidden');
    $('.pagina_inicial').addClass('hidden');
}

function start(event) {
    event.preventDefault();

    const theme = $('#tema');

    const span_alert = $('#alerta');

    if (theme.val() === "") {
        return span_alert.text('Insira um tema!');
    }

    let password = $('#password');

    if (password.val() === "") {
        return span_alert.text('Insira uma palavra!');
    }

    span_alert.empty();

    game.word = String(removeAccents(`${password.val()}`))?.toLowerCase();

    if (!game.word) {
        return alert.text('A palavra escolhida não pode usada! Apenas textos são permitidos.');
    }

    $('.opçoes_do_jogo').addClass('hidden');
    $('.pagina_jogo').removeClass('hidden');

    $('.tema_content').text(`Tema: ${theme.val()}`);

    const div_word = $('#palavra');

    div_word.empty();

    let content = '';

    game.word.split('').forEach((letter, index) => {
        switch (letter) {
            case ' ':
                content += `<span> </span>`;
                game.corrects++;
                break;
            case '-':
                content += `<span>-</span>`;
                game.corrects++;
                break;
            default:
                content += `<span data-index="${index}">_</span>`;
                break;
        }
    });

    div_word.html(content);

    theme.val('');
    password.val('');

    game.start = true;

    const conta_erros = $('#conta_erros');
    conta_erros.text(game.errorCount);
}

$('#btn-confirm').click((event) => {
    event.preventDefault();

    reset();
});

function resetPosition() {
    $('.message').css('left', '849px');
    $('.message').css('top', '-668px');
}

function win() {
    resetPosition();
    game.start = false;
    $('.message').removeClass('hidden');
    $('.title-message').text('Você venceu!');
    $('.phrase').text(`Parabéns, você descobriu a palavra!
    A palavra certa era ${game.word}.`);
}

function loser() {
    resetPosition();
    game.start = false;
    $('.message').removeClass('hidden');
    $('.title-message').text('Você perdeu!');
    $('.phrase').text(`Infelizmente, você não descobriu a palavra!
    A palavra certa era ${game.word}.`);
}

function checkWord(event) {
    event.preventDefault();

    if (!game.start) return;

    const btn = event.target;

    btn.disabled = true;

    const letter_btn = btn.textContent.toLowerCase();

    const hasLetter = updateLetter(letter_btn);

    if (hasLetter) {
        btn.classList.add('correto');
    }
    else {
        game.errorCount++;
        btn.classList.add('errado');
    }

    if (game.corrects === game.word.length) {
        win();
    }

    updateErrors();
}

function reset() {
    game.start = false;
    game.word = '';
    game.errorCount = 0;
    game.corrects = 0;

    $('.opçoes_do_jogo').removeClass('hidden');
    $('.pagina_jogo').addClass('hidden');
    $('.pagina_inicial').addClass('hidden');
    $('.message').addClass('hidden');

    clearButtons();
    updateErrors();
};

$('#abrir_opçoes').click(openOptions);

$('#btn_start').click(start);

$('.btn').each((_, btn) => btn.addEventListener('click', checkWord));

$('.opçoes').keypress((event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
        start(event);
    }
});

(() => {
    $('#draggable').draggable();
})();
