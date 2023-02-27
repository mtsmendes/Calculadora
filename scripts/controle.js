var controlador = true
var conteudoBtns = ["%"  ,  "CE" ,   "C"   , "backspace", 
                    "¹/x",  "x²" ,   "²√"   , "÷",  
                    "7"  ,  "8"  ,   "9"   , "X", 
                    "4"  ,  "5 " ,   "6"   , "-", 
                    "1"  ,  "2"  ,   "3"   , "+", 
                    "+/-",  "0"  ,   ","   , "="];

var funcoesBtns = ["operacoesEspeciais('P')", "limparDados(false)", "limparDados()", "apagarCaracter()",
                    "operacoesEspeciais('D')", "operacoesEspeciais('E')", "operacoesEspeciais('R')", "calculoAritmetico('/')",
                    "addDisplay(7)", "addDisplay(8)", "addDisplay(9)", "calculoAritmetico('*')", 
                    "addDisplay(4)", "addDisplay(5)", "addDisplay(6)", "calculoAritmetico('-')",
                    "addDisplay(1)", "addDisplay(2)", "addDisplay(3)", "calculoAritmetico('+')", 
                    "inverterSinal()", "addDisplay(0)","addPonto()", "calculoAritmetico('=')"]; 


//criando os botoes da calculadora
criarBotoesCalc();

//cria os botoes do teclado
function criarBotoesCalc() {
    criarLinhasBtns(0, 3);
    criarLinhasBtns(4, 7);
    criarLinhasBtns(8, 11);
    criarLinhasBtns(12, 15);
    criarLinhasBtns(16, 19);
    criarLinhasBtns(20, 23);

}

//criando as linhas com 5 botoes cada
function criarLinhasBtns(indiceInicio, indiceFim) { 
    let container = document.querySelector(".container-botoes-calc");
    let div = criarTag("div");
    let btn;
    
    addAtributo(div, "class", "container-linha-botoes");

    for (let i = indiceInicio; i <=indiceFim; i ++) {
        btn = criarTag("input");
        addAtributo(btn, "type", "button");
        addAtributo(btn, "value", conteudoBtns[i]);
        addAtributo(btn, "onclick", funcoesBtns[i]);


        if ((indiceInicio >= 0 && indiceFim <= 7) || i == 11 || i ==15 ||  i == 19) {
            addAtributo(btn, "class", "botao-operacoes config-btn");
            if (i == 3) {
                addAtributo(btn, "class", "botao-operacoes config-btn material-symbols-outlined");
            }
        }
        else if (i == 23) {
            addAtributo(btn, "class", "botao-igual config-btn");
        }
        else {
            addAtributo(btn, "class", "botao-numeros config-btn");
        }

        div.appendChild(btn);
    }

    container.appendChild(div);
}

//auxilixar para criar as tag
function criarTag(tag) {
    return document.createElement(tag);
}

//auxiliar ao colocar atributos a um elemento
function addAtributo(elemento, atributo, valor) {
    elemento.setAttribute(atributo, valor);
}

/**== CONTROLADORES ==*/

//controla a abertura de memoria e histórico
function ativarAuxiliares(parametro = false, caracter = 'H', diminuirTela = false) {
    let principal   = document.querySelector(".principal");
    let calculadora = document.querySelector(".container-calculadora");
    let auxiliares  = document.querySelector(".container-auxiliares");
    let btnMemoria  = document.querySelector("#btn-mostrar-memoria");


    if (parametro){
        controlador = true;
    }

    if(diminuirTela) {
        controlador = false;
    }


    if (controlador == true) {

        principal.style.width    = "60vw";
        calculadora.style.width  = "50%";
        auxiliares.style.display = "flex";
        btnMemoria.style.display = "none";

        if (caracter == 'H') {

            console.log("entrou");
            document.getElementById("btn-historico").focus();
            ativarHistorico(true);
        }
       if (caracter == 'M') {
            
            document.getElementById("btn-memoria").focus();
            ativarHistorico(false);
        }
    }
    else {

        principal.style.width    = "30vw";  
        calculadora.style.width  = "100%";
        auxiliares.style.display = "none";
        btnMemoria.style.display = "inline";

    }

     //vai receber sempre o valor ao contrário que se encontra
     controlador = !controlador;

}

function ativarHistorico(parametro) {
    let historico = document.querySelector(".container-historico");
    let memoria = document.querySelector(".container-memoria");

    if (parametro) {

        historico.style.display = "flex";
        memoria.style.display   = "none";
        carregarHistorico();
    }
    else {
        
        historico.style.display = "none";
        memoria.style.display   = "flex";
        carregarMemoria();
    }
}

//Controlar o tamanho da tela para mudar o display
window.addEventListener('resize', function () {
    var largura = window.innerWidth;

    if (largura < 650) 
    ativarAuxiliares(false, null, true);
});