const selectMarca = document.getElementById('marca');

function getMarcasCarros() {
    var url = "https://parallelum.com.br/fipe/api/v1/carros/marcas";
    
    console.log(url);

    var ajax = new XMLHttpRequest();
    ajax.onload = function() {
        respostaCarro(ajax);
    };
    ajax.open("GET", url);
    ajax.send();


    function respostaCarro(ajax) {
        var resposta = JSON.parse(ajax.responseText);
        console.log(resposta);
        
        for (var i = 0; i < resposta.length; i++) {
            var option = document.createElement("option");
            option.text = resposta[i].nome;
            selectMarca.add(option);
        }
    }

}

