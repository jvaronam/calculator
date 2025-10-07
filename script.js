//VARIABLES
let primNum = '';
let segNum = '';
let operador =null;
let reset = false;

const display = document.getElementById('display');


//FUNCIONES
function sumar(a,b){return a+b;}
function restar(a,b){return a-b;}
function multiplicar(a,b){return a*b;}
function dividir(a, b) {
    if (b === 0) return "Error: divide by 0";
    return a / b;
}

//OPERAR
function operate(operator, a,b){
    a = Number(a);
    b = Number(b);

    if(operator === '+'){
        return sumar(a,b);
    }else if(operator === '-'){
        return restar(a,b);
    }else if(operator === '*'){
        return multiplicar(a,b);
    }else if(operator === '/'){
        return dividir(a,b);
    }
}

//EVENTOS
function handleNumber(num) {
    if(reset){
    	display.textContent = '';
    	reset = false;
    }
    
    display.textContent += num;
    
    if (operador === null) {
        primNum += num;
    } else {
        segNum += num;
    }
}

function handleOperator(op) {
    if (primNum === '') return; //no hay primer numero
    
    if (operador !== null && segNum !== '') { // si ya hay operación previa, calcula antes
    	calcular();
    }
    
    operador = op;
    display.textContent += ' ' + op + ' ';
    reset = false;
}



function calcular() {
    if (primNum === '' || segNum === '' || operador === null) return;
    const resultado = operate(operador, Number(primNum), Number(segNum));
    display.textContent = resultado;
    
    // reinicia los valores para poder seguir calculando
    primNum = resultado.toString();
    segNum = '';
    operador = null;
    reset = true; // siguiente numero empiece limpio

}

//NUMEROS
for(let i=0;i<9;i++){
	document.getElementById(i.toString()).addEventListener('click', () => handleNumber(i.toString()));
}

// BOTONES OPERADORES
document.getElementById('sumar').addEventListener('click', () => handleOperator('+'));
document.getElementById('restar').addEventListener('click', () => handleOperator('-'));
document.getElementById('multiplicar').addEventListener('click', () => handleOperator('*'));
document.getElementById('dividir').addEventListener('click', () => handleOperator('/'));

//BOTONES ESPECIALES
document.getElementById('igual').addEventListener('click', calcular);
document.getElementById('C').addEventListener('click', limpiar);




function limpiar() {
    primNum = '';
    segNum = '';
    operador = null;
    display.textContent = '';
}
