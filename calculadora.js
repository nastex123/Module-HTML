const pantalla = document.getElementById('pantalla');

function agregar(valor) {
    pantalla.value += valor;
}

function limpiar() {
    pantalla.value = '';
}

function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
}

function calcular() {
    try {
        // eval realiza la operación matemática escrita en el input
        pantalla.value = eval(pantalla.value);
    } catch (error) {
        pantalla.value = 'Error';
        setTimeout(limpiar, 1500);
    }
}