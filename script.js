// INDEX

// 9. BOTON VOLVER ARRIBA
configurarScrollTop();

function configurarScrollTop() {
    const scrollBtn = document.getElementById('scrollTop');
    
    if (!scrollBtn) return;
    
    // Mostrar/ocultar boton segun el scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Volver arriba al hacer clic
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 8. ACORDEON PARA MASCOTAS
inicializarAcordeon();

function inicializarAcordeon() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Cerrar otros acordeones (opcional)
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== btn && otherBtn.classList.contains('active')) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle el actual
            if (!isActive) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                this.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });
}
// INDEX

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MENSAJE DE BIENVENIDA (Toast notification)
    mostrarMensajeBienvenida();
    
    function mostrarMensajeBienvenida() {
        if (!sessionStorage.getItem('bienvenidaMostrada')) {
            setTimeout(function() {
                mostrarToast("Bienvenido al portafolio de Brandon Carranza");
                sessionStorage.setItem('bienvenidaMostrada', 'true');
            }, 500);
        }
    }
    
    // Funcion para mostrar mensaje emergente (toast)
    function mostrarToast(mensaje) {
        // Crear el elemento toast
        const toast = document.createElement('div');
        toast.textContent = mensaje;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '20px';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        toast.style.color = 'white';
        toast.style.border = '2px solid red';
        toast.style.borderRadius = '8px';
        toast.style.padding = '12px 20px';
        toast.style.fontSize = '1rem';
        toast.style.zIndex = '9999';
        toast.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
        toast.style.fontFamily = 'monospace';
        toast.style.maxWidth = '350px';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-20px)';
        toast.style.transition = 'all 0.3s ease';
        
        // Agregar al body
        document.body.appendChild(toast);
        
        // Animacion de entrada
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto desaparecer despues de 3 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // 2. BOTON PARA CAMBIAR TEXTO
    crearBotonCambiarTexto();
    
    function crearBotonCambiarTexto() {
        const seccionSobreMi = document.querySelector('#about');
        
        if (seccionSobreMi) {
            const divContenido = seccionSobreMi.querySelector('div');
            const parrafos = seccionSobreMi.querySelectorAll('p');
            
            const btnCambiarTexto = document.createElement('button');
            btnCambiarTexto.textContent = 'Cambiar mensaje';
            btnCambiarTexto.className = 'buy-btn';
            btnCambiarTexto.style.marginTop = '1rem';
            btnCambiarTexto.style.marginBottom = '1rem';
            btnCambiarTexto.style.padding = '0.625rem 1.25rem';
            btnCambiarTexto.style.cursor = 'pointer';
            
            let textoIndex = 0;
            const textos = [
                'Simplemente soy uno mas, nacido de la nada. No busco el estrepito de los aplausos ni la firmeza de las verdades absolutas, pues entiendo que mi propia existencia es apenas un suspiro en el devenir de los siglos.',
                'La verdad no es lo que te hace sentir comodo, sino lo que te hace libre.',
                'Observo el mundo desde las sombras, no por miedo a la luz, sino por amor al misterio.',
                'El conocimiento no se posee, se comparte. Gracias por estar aqui.'
            ];
            
            btnCambiarTexto.addEventListener('click', function() {
                parrafos[0].textContent = textos[textoIndex];
                textoIndex = (textoIndex + 1) % textos.length;
                
                btnCambiarTexto.style.transform = 'scale(0.97)';
                setTimeout(() => {
                    btnCambiarTexto.style.transform = 'scale(1)';
                }, 150);
                
                mostrarToast("Mensaje cambiado");
            });
            
            if (divContenido) {
                const ultimoParrafo = parrafos[parrafos.length - 1];
                divContenido.insertBefore(btnCambiarTexto, ultimoParrafo);
            } else {
                seccionSobreMi.appendChild(btnCambiarTexto);
            }
        }
    }
    
    // 3. BOTON MOSTRAR/OCULTAR CONTENIDO
    crearBotonMostrarOcultar();
    
    function crearBotonMostrarOcultar() {
        const seccionProyectos = document.querySelector('#projects');
        
        if (seccionProyectos) {
            const btnToggle = document.createElement('button');
            btnToggle.textContent = 'Mostrar/Ocultar detalles';
            btnToggle.className = 'buy-btn';
            btnToggle.style.marginBottom = '1rem';
            btnToggle.style.padding = '0.625rem 1.25rem';
            btnToggle.style.cursor = 'pointer';
            
            const detallesContainer = document.createElement('div');
            detallesContainer.id = 'detallesProyectos';
            detallesContainer.style.marginTop = '1rem';
            detallesContainer.style.padding = '1rem';
            detallesContainer.style.borderLeft = '3px solid red';
            detallesContainer.style.background = 'rgba(0,0,0,0.5)';
            detallesContainer.style.borderRadius = '0.5rem';
            
            detallesContainer.innerHTML = `
                <p><strong>Detalles de los proyectos:</strong></p>
                <ul style="color: white; margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Calculadora:</strong> Herramienta interactiva para operaciones basicas.</li>
                    <li><strong>Youtube:</strong> Plataforma de videos y contenido multimedia.</li>
                    <li><strong>Canva:</strong> Diseno grafico con interfaz amigable.</li>
                </ul>
                <p style="margin-top: 0.5rem; font-size: 0.875rem;">Proximamente: mas proyectos interactivos</p>
            `;
            
            let visible = true;
            
            btnToggle.addEventListener('click', function() {
                if (visible) {
                    detallesContainer.style.display = 'none';
                    btnToggle.textContent = 'Mostrar detalles';
                    visible = false;
                    mostrarToast("Detalles ocultos");
                } else {
                    detallesContainer.style.display = 'block';
                    btnToggle.textContent = 'Ocultar detalles';
                    visible = true;
                    mostrarToast("Detalles visibles");
                }
                
                btnToggle.style.transform = 'scale(0.97)';
                setTimeout(() => {
                    btnToggle.style.transform = 'scale(1)';
                }, 150);
            });
            
            const projectContainer = seccionProyectos.querySelector('.project-container');
            seccionProyectos.insertBefore(btnToggle, projectContainer);
            seccionProyectos.insertBefore(detallesContainer, projectContainer);
        }
    }
    
    // 4. FORMULARIO DE CONTACTO
    manejarFormularioContacto();
    
    function manejarFormularioContacto() {
        const formulario = document.querySelector('.contact-form');
        
        if (formulario) {
            formulario.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nombreInput = this.querySelector('input[placeholder="Tu Nombre"]');
                const emailInput = this.querySelector('input[placeholder="TuCorreo@dominio.com"]');
                const mensajeTextarea = this.querySelector('textarea');
                
                const nombre = nombreInput ? nombreInput.value : 'Anonimo';
                const email = emailInput ? emailInput.value : 'sin correo';
                const mensaje = mensajeTextarea ? mensajeTextarea.value : 'sin mensaje';
                
                mostrarToast("Gracias " + nombre + "! Mensaje enviado");
                
                this.reset();
            });
        }
    }
    
    // 5. EFECTO EN TARJETAS
    agregarEfectoTarjetas();
    
    function agregarEfectoTarjetas() {
        const tarjetas = document.querySelectorAll('.project-card');
        
        tarjetas.forEach((tarjeta, index) => {
            tarjeta.addEventListener('mouseenter', function() {
                console.log("Proyecto " + (index + 1) + ": " + (this.querySelector('h3')?.textContent || 'sin titulo'));
            });
        });
    }
    
    // 6. BOTON CUENTA
    configurarBotonCuenta();
    
    function configurarBotonCuenta() {
        const cuentaSpan = document.querySelector('.nav-right span');
        
        if (cuentaSpan && cuentaSpan.textContent.includes('CUENTA')) {
            cuentaSpan.style.cursor = 'pointer';
            cuentaSpan.addEventListener('click', function() {
                mostrarToast("Funcion de cuenta en desarrollo");
            });
        }
    }
    
    // 7. BOTON BUSQUEDA
    configurarBotonBusqueda();
    
    function configurarBotonBusqueda() {
        const searchIcon = document.querySelector('.nav-right .bi-search');
        
        if (searchIcon) {
            searchIcon.style.cursor = 'pointer';
            searchIcon.addEventListener('click', function() {
                mostrarToast("Funcion de busqueda en desarrollo");
            });
        }
    }
    
});


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