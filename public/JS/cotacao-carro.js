const selectMarca = document.getElementById('marca');
const selectmodelo = document.getElementById('modelo');
const cepInput = document.getElementById('cep-input');
const placaInput = document.getElementById('placa');
const chassisInput = document.getElementById('chassis')
// var Inputmask = require('inputmask');

function mudarRadioSelecionado() {
    var radios = document.getElementsByName('btnVeiculo');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radios[i].checked = false;
        }
    }

    event.target.checked = true;
}

let marcasCarregadas = false; // Variável para rastrear se as marcas já foram carregadas
let modelosCarregados = false;
let anosCarregados = false;

function limparOpcoesMarcas() {
    var selectElement = document.getElementById("marca");

    // Salvar a primeira opção
    var primeiraOpcao = selectElement.options[0].cloneNode(true);

    // Limpar todas as opções
    selectElement.innerHTML = "";

    // Adicionar a primeira opção de volta
    selectElement.appendChild(primeiraOpcao);
}

function limparOpcoesModelos() {
    var selectElement = document.getElementById("modelo");

    // Salvar a primeira opção
    var primeiraOpcao = selectElement.options[0].cloneNode(true);

    // Limpar todas as opções
    selectElement.innerHTML = "";

    // Adicionar a primeira opção de volta
    selectElement.appendChild(primeiraOpcao);
}

function limparOpcoesAnos() {
    var selectElement = document.getElementById("anos");

    // Salvar a primeira opção
    var primeiraOpcao = selectElement.options[0].cloneNode(true);

    // Limpar todas as opções
    selectElement.innerHTML = "";

    // Adicionar a primeira opção de volta
    selectElement.appendChild(primeiraOpcao);
}

function getMarcasCarros() {
    const tipoVeiculo = document.querySelector('input[name="btnVeiculo"]:checked').value;
    var url = "https://parallelum.com.br/fipe/api/v1/" + tipoVeiculo + "/marcas";

    console.log(url);

    var ajax = new XMLHttpRequest();
    ajax.onload = function () {
        respostaCarro(ajax);
    };
    ajax.open("GET", url);
    ajax.send();

    function respostaCarro(ajax) {
        var resposta = JSON.parse(ajax.responseText);
        console.log(resposta);

        limparOpcoesMarcas();

        var selectElement = document.getElementById("marca");

        for (var i = 0; i < resposta.length; i++) {
            var option = document.createElement("option");
            option.text = resposta[i].nome;
            option.value = resposta[i].codigo;
            selectElement.add(option);
        }   
        marcasCarregadas = true; // Marcas carregadas
    }
}

marcasCarregadas = true; // Marcas carregadas

function loadMarcas() {
    if (!marcasCarregadas) {
        getMarcasCarros();
    }
}

function mudarRadioSelecionado() {
    marcasCarregadas = false; // Resetar para carregar novas marcas quando o tipo de veículo mudar
    limparOpcoesMarcas(); // Limpar as opções atuais
    limparOpcoesModelos();
    limparOpcoesAnos(); // Limpar as opções atuais de modelos
}

function getModelos() {
    const tipoVeiculo = document.querySelector('input[name="btnVeiculo"]:checked').value;
    var selectMarca = document.getElementById("marca");
    var marcaCodigo = selectMarca.value;
    var marcaNome = selectMarca.options[selectMarca.selectedIndex].text;
    var url = "https://parallelum.com.br/fipe/api/v1/" + tipoVeiculo + "/marcas/" + marcaCodigo + "/modelos";

    console.log(url);

    var ajax = new XMLHttpRequest();
    ajax.onload = function () {
        respostaModelo(ajax);
    };
    ajax.open("GET", url);
    ajax.send();

    function respostaModelo(ajax) {
        var resposta = JSON.parse(ajax.responseText);
        console.log(resposta.modelos); // Os modelos estão dentro da propriedade "modelos"

        limparOpcoesModelos();

        var selectElement = document.getElementById("modelo");

        for (var i = 0; i < resposta.modelos.length; i++) {
            var option = document.createElement("option");
            option.text = resposta.modelos[i].nome;
            option.value = resposta.modelos[i].codigo;
            selectElement.add(option);
        }

        modelosCarregados = true; // Modelos carregados
        // Atualiza o input hidden do marcaNome
        document.getElementById("marcaNome").value = marcaNome;
    }
}



function loadModelos() {
    modelosCarregados = false; // Resetar para carregar novos modelos quando a marca mudar
    limparOpcoesModelos(); // Limpar as opções atuais de modelos
    if (document.getElementById("marca").value !== "1") {
        getModelos();
    }
}

function getAnos() {
    const tipoVeiculo = document.querySelector('input[name="btnVeiculo"]:checked').value;
    var selectMarca = document.getElementById("marca");
    var marcaCodigo = selectMarca.value;
    var selectModelo = document.getElementById("modelo");
    var modeloCodigo = selectModelo.value;
    var modeloNome = selectModelo.options[selectModelo.selectedIndex].text;

    var url = "https://parallelum.com.br/fipe/api/v1/" + tipoVeiculo + "/marcas/" + marcaCodigo + "/modelos/" + modeloCodigo + "/anos";

    console.log(url);

    var ajax = new XMLHttpRequest();
    ajax.onload = function () {
        respostaAnos(ajax);
    };
    ajax.open("GET", url);
    ajax.send();

    function respostaAnos(ajax) {
        var resposta = JSON.parse(ajax.responseText);
        console.log(resposta); // Os anos estão diretamente na resposta

        limparOpcoesAnos();

        var selectElement = document.getElementById("anos");

        for (var i = 0; i < resposta.length; i++) {
            var option = document.createElement("option");
            option.text = resposta[i].nome;
            option.value = resposta[i].codigo;
            selectElement.add(option);
        }

        anosCarregados = true; // Anos carregados
    }
    document.getElementById("modeloNome").value = modeloNome;
}



function loadAnos() {
    anosCarregados = false; // Resetar para carregar novos anos quando a marca mudar
    limparOpcoesAnos(); // Limpar as opções atuais de anos
    if (document.getElementById("modelo").value !== "1") {
        getAnos();
    }
}

function getAnoNome(){
    selectAno = document.getElementById("anos");
    anosNome =  selectAno.options[selectAno.selectedIndex].text;

    document.getElementById("anoNome").value = anosNome;
}

function mostrarDatePicker() {
    var datePickerDiv = document.getElementById('datePickerSePossuiSeguro');
    datePickerDiv.innerHTML = '<label for="dataSeguro" class="form-label">Data do Seguro</label><input type="date" class="form-control" id="dataSeguro" name="dataSeguro" required>';
}

function esconderDatePicker() {
    var datePickerDiv = document.getElementById('datePickerSePossuiSeguro');
    datePickerDiv.innerHTML = ''; // Remove o conteúdo da div
}


function usoDoCarro() {
    var usoDoVeiculoDiv = document.getElementById('usoDoVeiculo');
    usoDoVeiculoDiv.innerHTML = '<h5 class="control-label">Uso do veículo</h5>' +
    '<div class="btn-group" role="group" aria-label="Basic radio toggle button group" id="ParaQueUsaCarro">' +
    '<label class="checkbox">' +
    '<input type="checkbox" value="Lazer/Ida e volta ao trabalho" name="ParaQueUsaCarro" data-gtm-form-interact-field-id="0">' +
    'Passeio' +
    '</label>' +
    '<label class="checkbox">' +
    '<input type="checkbox" value="Prestação de Serviço" name="ParaQueUsaCarro" data-gtm-form-interact-field-id="1">' +
    'Serviço' +
    '</label>' +
    '<label class="checkbox">' +
    '<input type="checkbox" value="Motorista de aplicativo" name="ParaQueUsaCarro" data-gtm-form-interact-field-id="2">' +
    'Motorista de aplicativo' +
    '</label>' +
    '<label class="checkbox">' +
    '<input type="checkbox" value="Táxi" name="ParaQueUsaCarro" data-gtm-form-interact-field-id="3">' +
    'Táxi' +
    '</label>' +
    '</div>';
}

function usoDoCaminhao() {
    var usoDoVeiculoDiv = document.getElementById('usoDoVeiculo');
    usoDoVeiculoDiv.innerHTML = '<h5 class="control-label">Uso do veículo</h5>' +
    '<div class="btn-group" role="group" aria-label="Basic radio toggle button group" id="ParaQueUsaCarro">' +
    '<label class="checkbox">' +
    '<input type="checkbox" value="Lazer/Ida e volta ao trabalho" name="ParaQueUsaCarro" data-gtm-form-interact-field-id="0">' +
    'Particular' +
    '</label>' +
    '<label class="checkbox">' +
    '<input type="checkbox" value="Prestação de Serviço" name="ParaQueUsaCarro" data-gtm-form-interact-field-id="1">' +
    'Trabalho' +
    '</label>' +
    '<label class="checkbox">' +
    '<input type="checkbox" value="Motorista de aplicativo" name="ParaQueUsaCarro" data-gtm-form-interact-field-id="2">' +
    'Frete' +
    '</label>' +
    '<label class="checkbox">' +
    '<input type="checkbox" value="Táxi" name="ParaQueUsaCarro" data-gtm-form-interact-field-id="3">' +
    'Outros' +
    '</label>' +
    '</div>';
}


// cepInput.addEventListener('blur', (event) => {
//     let input = event.target;
//     input.placeholder = "Informe seu CEP"
// });


// placaInput.addEventListener('blur', (event)=>{
//     let input = event.target;
//     input.placeholder('Informe a placa')
// })

$(document).ready(function(){
    
    $('input[name="placa"]').inputmask();
});

$(document).ready(function(){

    $('input[name="cep"]').inputmask({mask: '99999-999'});
});

$(document).ready(function(){
    
    $('input[name="chassis"]').inputmask({mask: '*{1,17}'});
});

$(document).ready(function(){

    $('input[name="CPF"]').inputmask({mask: '999.999.999-99'});
});

$(document).ready(function(){
    $('input[name="telefone"]').inputmask({mask: '(99) 9 9999-9999'});
});