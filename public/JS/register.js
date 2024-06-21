function validarSenha() {
    var senha = document.getElementById("senha").value;
    var senhaConfirm = document.getElementById("senha-confirm").value;

    return senha === senhaConfirm;
}

document.querySelector("form").addEventListener("submit", function(event) {
    if (!validarSenha()) {
        let aviso = document.getElementById('aviso-senha')
        aviso.innerHTML = 'Senhas não coincidem!'
        event.preventDefault(); // Impede o envio do formulário se as senhas não coincidirem
    }
});