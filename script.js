const game = {
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

$('#abrir_opçoes').click((event) => {
    event.preventDefault();

    $('.opçoes_do_jogo').removeClass('hidden');
    $('.pagina_inicial').addClass('hidden');
});

$('#btn_start').click((event) => {
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

    console.log(game.word);

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

    const conta_erros = $('#conta_erros');
    conta_erros.text(game.errorCount);
});

function reset() {
    game.word = '';
    game.errorCount = 0;
    game.corrects = 0;

    $('.opçoes_do_jogo').removeClass('hidden');
    $('.pagina_jogo').addClass('hidden');

    clearButtons();
    updateErrors();
};

$('.btn').each((_, btn) => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();

        btn.disabled = true;

        const letter_btn = btn.textContent.toLowerCase();

        const hasLetter = updateLetter(letter_btn);

        if (hasLetter) {
            btn.classList.add('correto');
        }
        else {
            btn.classList.add('errado');
            game.errorCount++;
            if (game.errorCount === 6) {
                alert(`Você perdeu! A palavra era ${game.word}`);
                reset();
            }
        }

        if (game.corrects === game.word.length) {
            alert(`Você acertou a palavra! A palavra era ${game.word}`);
            reset();
        }

        updateErrors();
    });
});
