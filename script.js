// INDEX

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MENSAJE DE BIENVENIDA
    mostrarMensajeBienvenida();
    
    function mostrarMensajeBienvenida() {
        if (!sessionStorage.getItem('bienvenidaMostrada')) {
            setTimeout(function() {
                alert("Bienvenido al portafolio de Brandon Carranza");
                sessionStorage.setItem('bienvenidaMostrada', 'true');
            }, 500);
        }
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
                } else {
                    detallesContainer.style.display = 'block';
                    btnToggle.textContent = 'Ocultar detalles';
                    visible = true;
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
                
                alert("Gracias " + nombre + "! Tu mensaje ha sido enviado.\n\nTe responderemos a: " + email);
                
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
                alert('Funcion de cuenta en desarrollo. Proximamente podras registrarte.');
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
                alert('Funcion de busqueda en desarrollo.');
            });
        }
    }
    
});