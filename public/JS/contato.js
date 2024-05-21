const cepInput = document.getElementById('cep-input');
const telefoneInput = document.getElementById('telefone');


$(document).ready(function(){

    $('input[name="cep"]').inputmask({mask: '99999-999'});
});

cepInput.addEventListener('blur', (event) => {
    let input = event.target;
    input.placeholder = "Informe seu CEP"
});

telefoneInput.addEventListener('focus', function (event) {
    let input = event.target;
    input.placeholder = 'Informe seu telefone';
});

$(document).ready(function(){

    $('input[name="telefone"]').inputmask({mask: '(99) 9 9999-9999'});

});



