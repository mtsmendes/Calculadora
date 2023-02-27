
//variáveis globais
var pilha = [], sinal = [], ultimosValores = [], memoria = [], historico = [];
var limparDisplay = true;
var ultimoSinal;


//displays
let display = document.querySelector(".display");
let subDisplay = document.querySelector(".sub-display");
display.value = 0;


//funcao principal
function calculoAritmetico(parametro) {

    if (sinal.length == 0 && parametro == '='){
        display.value = "0";
        return
    } 
    else {
        sinal.push(parametro);
    }

    if (sinal[0] == '=' && sinal[1] == sinal[0] && pilha.length > 0) {
        repetirUltimaOperacao();
    }
    else if (sinal[0] == '=' && sinal[1] != sinal[0]) {
        let valor = display.value;
        let sinal = parametro;
        limparDados();
        display.value = valor;
        calculoAritmetico(sinal);
    }
    else {

        pilha.push(Number(display.value));
        calcular();

        escreverSubDisplay(false, sinal[0]);
        display.value = pilha[0];

        limparDisplay = true;
    }
}

//efetua a operação
function calcular() {
    if (pilha.length == 2) {

        let valor2 = pilha.pop();
        let valor1 = pilha.pop();
        let valor;

        switch (sinal[0]) {
            case '+':
                valor = valor1 + valor2;
                pilha.push(valor);
                break;

            case '-':
                valor = valor1 - valor2;
                pilha.push(valor);
                break;

            case '*':
                valor = valor1 * valor2;
                pilha.push(valor);
                break;

            case '/':
                valor = valor1 / valor2;
                pilha.push(valor);
                break;

            case '=':
                // display.value = pilha[0]; 
                display.value = "inplementar sinal =";
                break;

            default:
                window.alert("Ainda não implementado");
                break;
        }



        ultimoSinal = sinal[0];
        sinal[0] = sinal.pop();

        ultimosValores[0] = valor1;
        ultimosValores[1] = valor2;
        ultimosValores[2] = valor;
        addHistorico();
    }
}


/* === Sub operações ===*/


//efetua as operações especiais
function operacoesEspeciais(parametro) {
    let valor = Number(display.value);

    switch (parametro) {

        case 'P':
            valor = porcentagem(valor);
            break;

        case 'E':
            valor = valor ** 2;
            break;

        case 'R':
            valor = Math.sqrt(valor);
            break;

        case 'D':
            valor = 1 / valor;
            break;

        default:
            break;
    }

    display.value = valor;
}

//calcula a porcentagem
function porcentagem(parametro) {
    let aux;

    if (pilha.length == 0) {
        aux = 0;
    }
    else {
        aux = pilha[0];
    }

    return (aux * parametro) / 100;
}

//adiciona ' . ' a tela
function addPonto() {

    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

//inverter sinal
function inverterSinal() {
    let valor = display.value;

    if (valor != "0") {
        if (valor.charAt(0) == '-') {
            display.value = (valor.replace("-", ""));
        }
        else {
            display.value = "-" + valor;
        }
    }
}

//apaga ultimo caracter
function apagarCaracter() {
    let valor = display.value.slice(0, -1);

    if (valor.length > 0) {
        display.value = valor;
    }
    else {
        display.value = 0;
    }
}

/* === Funções auxiliares ===*/


// adiciona os numeros no display
function addDisplay(valor) {

    if (limparDisplay) {
        limparDisplay = false;
        display.value = null;
    }

    display.value += valor;
}

//limpa todos os parametros
function limparDados(limparTudo = true) {
    if (limparTudo) {
        limparVetor(pilha);
        limparVetor(sinal);
        limparVetor(ultimosValores);
        limparDisplay = true;
        escreverSubDisplay(true);
        ultimoSinal = undefined;
    }

    display.value = 0;
    limparDisplay = true;
}

//escreve no subDisplay
function escreverSubDisplay(limpar = false, parametro) {

    if (limpar) {
        subDisplay.innerHTML = "";
    }
    else {

        switch (parametro) {
            case '*':
                subDisplay.innerHTML = `${pilha[0]} x`;
                break;
            case '=':
                let aux;

                if (ultimoSinal == '*') { 
                    aux = 'x' 
                } 
                else { 
                    aux = ultimoSinal 
                }

                subDisplay.innerHTML = `${ultimosValores[0]} ${aux}  ${ultimosValores[1]} ${parametro} `;
                break;

            default:
                subDisplay.innerHTML = `${pilha[0]} ${sinal[0]}`;
                break;
        }
    }

}

//calculo quando der == + == novamente
function repetirUltimaOperacao() {
    let valor = pilha.pop();
    let auxSinal;

    switch (ultimoSinal) {
        case '+':
            valor = valor + ultimosValores[1];
            break;

        case '-':
            valor = valor - ultimosValores[1];
            break;

        case '*':
            valor = valor * ultimosValores[1];
            break;

        case '/':
            valor = valor / ultimosValores[1];
            break;

        default:
            console.log("erro no switch do == e == ");
            break;
    }

    pilha.push(valor);

    if (ultimoSinal == '*') {
        auxSinal = 'x'
    }
    else {
        auxSinal = ultimoSinal;
    }

   subDisplay.innerHTML = `${pilha[0]} ${auxSinal} ${ultimosValores[1]} = `;
    display.value = pilha[0];

    let array     = [2];

    //criando uma array by dimencional
    array[0] = `${pilha[0]} ${auxSinal} ${ultimosValores[1]} =`;
    array[1] = pilha[0];

    historico.push(array);

    carregarHistorico();
 
}

//para limpar os vetores
function limparVetor(vetor) {
    for (let i = vetor.length - 1; i >= 0; i--) {
        vetor.pop();
    }
}


/* == FUNCÇÕES DO HISTÓRICO ==  */


//adiciona no historico
function addHistorico(){
    let array     = [2];

    //criando uma array by dimencional
    array[0] = `${ultimosValores[0]} ${ultimoSinal} ${ultimosValores[1]} =`;
    array[1] = ultimosValores[2];

    historico.push(array);

    carregarHistorico();
}

//carrega o historico
function carregarHistorico() {
    let history = document.querySelector(".armazena-historico");
    let conteudo, tag;

    history.innerHTML = "";

    if (historico.length == 0) {
        history.innerHTML = "Não constam históricos."
    }
    else {
        for (let i = historico.length -1; i >= 0; i--) {

            tag = document.createElement("p");
            conteudo = historico[i][0] + historico[i][1];
            tag.classList.add("conteudo-memoria");
            tag.setAttribute("onclick", "jogarHistoriaDisplay(" + i + ")");
            tag.appendChild(document.createTextNode(conteudo));
            history.appendChild(tag);
        }
    }
}

//joga o historico no display
function jogarHistoriaDisplay(parametro) {
    subDisplay.innerHTML = historico[parametro][0];
    display.value = historico[parametro][1];
}

//limpar histórico
function limparHistorico(){
   limparVetor(historico);
   carregarHistorico();
}


/* == FUNÇÕES DA MEMORIA == */


//inserir na memoria
function addMemoria(){
    memoria.push(Number(display.value));
    carregarMemoria();
    limparDisplay = true;
}
   
//limpa memoria
function limpaMemoria() {
    limparVetor(memoria);
    carregarMemoria();
}

//limpa e carrega  a memoria novamente
function carregarMemoria() {
    let memory = document.querySelector(".armazena-memoria");
    let conteudo, tag;

    //limpando a tag toda
    memory.innerHTML = "";

    if (memoria.length == 0) {
        memory.innerHTML = "Não constam valores na memória."
    }
    else {
        for (let i = memoria.length -1; i >= 0; i--) {
            tag = document.createElement("p");
            conteudo = memoria[i];
            tag.classList.add("conteudo-memoria");
            tag.setAttribute("onclick", "jogarMemoriaDisplay(" + i + ")");
            tag.appendChild(document.createTextNode(conteudo));
            memory.appendChild(tag);
        }
    }
}

//pega o numero da memoria
function pegarMemoria() {
    if (memoria.length > 0){
        display.value = memoria[memoria.length - 1];
    }
}

//joga memorria no display
function jogarMemoriaDisplay(parametro) {
    display.value = memoria[parseInt(parametro)];
}

//somar ou diminuir memoria
function maisOuMenosMemoria(parametro) {
    
    if (memoria.length > 0) {
        let aux = memoria.pop();
        if(parametro == '+') {
            aux += Number(display.value);
        }
        else {
            aux -= Number(display.value);
        }

        memoria.push(aux);
        carregarMemoria();
    }
}
