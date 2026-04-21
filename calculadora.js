// Calculadora con 3 inputs: NUM1, OPERADOR, NUM2

let inputNum1 = document.getElementById('num1');
let inputOperador = document.getElementById('operador');
let inputNum2 = document.getElementById('num2');
let inputResultado = document.getElementById('pantalla');

let campoActivo = 'num1';

// Resaltar campo activo
function setCampoActivo(campo) {
    campoActivo = campo;
    
    inputNum1.style.border = '1px solid red';
    inputOperador.style.border = '1px solid red';
    inputNum2.style.border = '1px solid red';
    
    if (campo === 'num1') {
        inputNum1.style.border = '2px solid white';
        inputNum1.focus();
    } else if (campo === 'operador') {
        inputOperador.style.border = '2px solid white';
        inputOperador.focus();
    } else if (campo === 'num2') {
        inputNum2.style.border = '2px solid white';
        inputNum2.focus();
    }
}

// Agregar valor al campo activo
function agregarValor(valor) {
    let inputActivo;
    
    if (campoActivo === 'num1') {
        inputActivo = inputNum1;
    } else if (campoActivo === 'operador') {
        inputActivo = inputOperador;
    } else {
        inputActivo = inputNum2;
    }
    
    if (campoActivo === 'operador') {
        if (['+', '-', '*', '/'].includes(valor)) {
            inputActivo.value = valor;
            setCampoActivo('num2');
        }
    } else {
        if (valor === '.') {
            if (inputActivo.value.includes('.')) return;
        }
        
        if (inputActivo.value === '0' && valor !== '.') {
            inputActivo.value = valor;
        } else {
            inputActivo.value += valor;
        }
    }
}

// Limpiar SOLO el campo activo
function limpiarCampoActivo() {
    if (campoActivo === 'num1') {
        inputNum1.value = '';
    } else if (campoActivo === 'operador') {
        inputOperador.value = '';
    } else if (campoActivo === 'num2') {
        inputNum2.value = '';
    }
}

// Limpiar TODOS los campos (NUM1, OPERADOR, NUM2, RESULTADO)
function limpiarTodo() {
    inputNum1.value = '';
    inputOperador.value = '';
    inputNum2.value = '';
    inputResultado.value = '';
    setCampoActivo('num1');
}

// Limpiar SOLO NUM1, OPERADOR, NUM2 (deja resultado)
function limpiarCampos() {
    inputNum1.value = '';
    inputOperador.value = '';
    inputNum2.value = '';
    setCampoActivo('num1');
}

// Calcular
function calcular() {
    let num1 = parseFloat(inputNum1.value);
    let operador = inputOperador.value;
    let num2 = parseFloat(inputNum2.value);
    
    if (isNaN(num1)) {
        inputResultado.value = 'Error: Numero 1';
        return;
    }
    
    if (operador === '') {
        inputResultado.value = 'Error: Operador';
        return;
    }
    
    if (isNaN(num2)) {
        inputResultado.value = 'Error: Numero 2';
        return;
    }
    
    let resultado;
    
    switch(operador) {
        case '+': resultado = num1 + num2; break;
        case '-': resultado = num1 - num2; break;
        case '*': resultado = num1 * num2; break;
        case '/': 
            if (num2 === 0) {
                inputResultado.value = 'Error: Div /0';
                return;
            }
            resultado = num1 / num2;
            break;
        default:
            inputResultado.value = 'Error: Operador';
            return;
    }
    
    resultado = Math.round(resultado * 100000000) / 100000000;
    inputResultado.value = resultado;
}

// Eventos de los botones
document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let valor = btn.getAttribute('data-valor');
        
        if (valor === 'AC') {
            
            limpiarTodo();
        } else if (valor === '=') {
            calcular();
        } else if (['+', '-', '*', '/'].includes(valor)) {
            if (campoActivo === 'num1') {
                setCampoActivo('operador');
                agregarValor(valor);
            } else if (campoActivo === 'operador') {
                agregarValor(valor);
            } else if (campoActivo === 'num2') {
                calcular();
                if (inputResultado.value && !inputResultado.value.includes('Error')) {
                    inputNum1.value = inputResultado.value;
                    inputNum2.value = '';
                    inputResultado.value = '';
                    setCampoActivo('operador');
                    agregarValor(valor);
                } else {
                    setCampoActivo('operador');
                    agregarValor(valor);
                }
            }
        } else {
            agregarValor(valor);
        }
    });
});



setCampoActivo('num1');