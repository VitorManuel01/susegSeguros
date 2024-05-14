const cepInput = document.getElementById('cep-input');
const telefoneInput = document.getElementById('telefone');

cepInput.addEventListener('input', function (event) {
  const input = event.target;
  const cep = input.value.replace(/\D/g, '').substring(0, 8);

  const cepformatado = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  input.value = cepformatado;
});


cepInput.addEventListener('focus', (event)=>{
    let input = event.target;
    input.placeholder = "_____-___"
});

cepInput.addEventListener('blur', (event)=>{
    let input = event.target;
    input.placeholder = "Informe seu CEP"
});

telefoneInput.addEventListener('focus', function (event) {
    let input = event.target;
    input.placeholder = '(__) _ ___-____';
    });


    telefoneInput.addEventListener('input', function (event) {
    let input = event.target
    input.value = mascaraTel(input.value)
});

telefoneInput.addEventListener('blur', function (event) {
    const input = event.target;
    input.placeholder = 'Informe seu telefone';
  });

const mascaraTel = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
}

