// Capturar evento de submit do formulário
const form = document.querySelector('.form');

// função para prevenir o envio do formulário
form.addEventListener('submit', function(evento) {
    evento.preventDefault();
    const inputPeso = form.querySelector('#peso'); // pode utilizar evento.target (demonstra de onde ta vindo esse evento) é o mesmo que utilizar form
    const inputAltura = form.querySelector('#altura');

    const peso = Number(inputPeso.value); // O input é do tipo texto, por isso é necessário captar o valor desse input como number
    const altura = Number(inputAltura.value);

    if (!peso) { // condicionando caso o peso seja um NaN
        setResultado('Peso inválido!', false); // msg e isValid, respectivamente
        return;
    }

    if (!altura) {
        setResultado('Altura inválida!', false);
        return;
    }

    const imc = getImc(peso, altura);
    const tabelaImc = getTabelaImc(imc);

    const msg = `Seu IMC é ${imc} (${tabelaImc}).`;

    setResultado(msg, true);
});

function getTabelaImc (imc) {
    const tabela = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if (imc >= 39.9) return tabela[5]; // quando o if é muito pequeno(uma linha), não é necessario utlizar um bloco de chaves
    if (imc >= 34.9) return tabela[4]; // como a execuçao é um return, ou seja, ele para de executar após o return, não é necessario o else if
    if (imc >= 29.9) return tabela[3];
    if (imc >= 24.9) return tabela[2];
    if (imc >= 18.5) return tabela[1];
    if (imc < 18.5) return tabela[0];
}

// funçao que calcula o imc
function getImc (peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2); // retorna um valor com duas casa decimais
}

// Função que cria um parágrafo
function criaP () {
    const p = document.createElement('p');
    return p;
}

// funçao para mostrar o resultado do calculo
function setResultado(msg, isValid) { // utiliza o msg para determinar uma mensagem e o isValid para mudar o background caso verdadeira e caso falso
    const resultado = document.querySelector('.resultado');
    resultado.innerHTML = '';
    const p = criaP();

    if (isValid) {
        p.classList.add('estilo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
}