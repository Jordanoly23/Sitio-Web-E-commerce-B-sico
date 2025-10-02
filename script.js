// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('MiTienda - Sitio cargado correctamente');
    
    // Mensaje dinámico para la página de inicio
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        mostrarMensajeBienvenida();
    }
    
    // Validación del formulario de registro
    if (window.location.pathname.endsWith('registro.html')) {
        configurarValidacionRegistro();
    }
    
    // Funcionalidad "Ver más" en Quiénes Somos
    if (window.location.pathname.endsWith('quienes-somos.html')) {
        configurarBotonVerMas();
    }
    
    // Funcionalidad del catálogo
    if (window.location.pathname.endsWith('catalogo.html')) {
        configurarCatalogo();
    }
    
    // Funcionalidad del carrito
    if (window.location.pathname.endsWith('carrito.html')) {
        configurarCarrito();
    }
    
    // Funcionalidad de búsqueda
    if (window.location.pathname.endsWith('busqueda.html')) {
        configurarBusqueda();
    }
});

// Funciones específicas para cada página
function mostrarMensajeBienvenida() {
    const fecha = new Date();
    const opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
    
    const mensajeBienvenida = document.createElement('div');
    mensajeBienvenida.className = 'mensaje-bienvenida';
    mensajeBienvenida.innerHTML = `
        <p>¡Bienvenido a MiTienda! 🌟 Hoy es ${fechaFormateada}</p>
        <p>¡Disfruta de nuestras ofertas especiales!</p>
    `;
    
    const main = document.querySelector('main');
    if (main) {
        const banner = document.querySelector('.banner');
        if (banner) {
            main.insertBefore(mensajeBienvenida, banner.nextSibling);
        } else {
            main.insertBefore(mensajeBienvenida, main.firstChild);
        }
    }
}

function configurarValidacionRegistro() {
    const formulario = document.getElementById('formulario-registro');
    const checkboxTerminos = document.getElementById('terminos');
    const botonEnviar = document.getElementById('btn-enviar');
    
    if (checkboxTerminos && botonEnviar) {
        checkboxTerminos.addEventListener('change', function() {
            botonEnviar.disabled = !this.checked;
            if (this.checked) {
                botonEnviar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        });
        
        botonEnviar.disabled = true;
    }
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificar que todos los campos estén completos
            const campos = formulario.querySelectorAll('input[required]');
            let todosCompletos = true;
            let mensajeError = '';
            
            campos.forEach(campo => {
                if (!campo.value.trim()) {
                    todosCompletos = false;
                    campo.style.borderColor = '#e74c3c';
                    mensajeError = 'Por favor, completa todos los campos obligatorios.';
                } else {
                    campo.style.borderColor = '#28a745';
                }
                
                // Validación específica para email
                if (campo.type === 'email' && campo.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(campo.value)) {
                        todosCompletos = false;
                        campo.style.borderColor = '#e74c3c';
                        mensajeError = 'Por favor, ingresa un correo electrónico válido.';
                    }
                }
                
                // Validación para contraseña
                if (campo.type === 'password' && campo.value.trim()) {
                    if (campo.value.length < 6) {
                        todosCompletos = false;
                        campo.style.borderColor = '#e74c3c';
                        mensajeError = 'La contraseña debe tener al menos 6 caracteres.';
                    }
                }
            });
            
            if (todosCompletos) {
                // Simular envío exitoso
                botonEnviar.textContent = 'Registrando...';
                botonEnviar.disabled = true;
                
                setTimeout(() => {
                    alert('¡Registro exitoso! 🎉 Bienvenido a MiTienda');
                    formulario.reset();
                    botonEnviar.textContent = 'Registrarse';
                    botonEnviar.disabled = false;
                    checkboxTerminos.checked = false;
                }, 2000);
            } else {
                alert(mensajeError || 'Por favor, completa todos los campos correctamente.');
            }
        });
    }
}

function configurarBotonVerMas() {
    const botonVerMas = document.getElementById('btn-ver-mas');
    const infoAdicional = document.getElementById('info-adicional');
    
    if (botonVerMas && infoAdicional) {
        botonVerMas.addEventListener('click', function() {
            if (infoAdicional.style.display === 'none' || infoAdicional.style.display === '') {
                infoAdicional.style.display = 'block';
                botonVerMas.textContent = 'Ver menos';
                botonVerMas.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
            } else {
                infoAdicional.style.display = 'none';
                botonVerMas.textContent = 'Ver más';
                botonVerMas.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        });
        
        // Ocultar información adicional al cargar la página
        infoAdicional.style.display = 'none';
    }
}

function configurarCatalogo() {
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');
    let contadorCarrito = 0;
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function() {
            const producto = this.getAttribute('data-producto');
            const precio = this.getAttribute('data-precio');
            
            // Efecto visual
            this.textContent = '✓ Agregado';
            this.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            this.disabled = true;
            
            // Mostrar mensaje de confirmación
            setTimeout(() => {
                alert(`¡${producto} agregado al carrito! 🛒\nPrecio: $${precio}`);
            }, 300);
            
            // Incrementar contador
            contadorCarrito++;
            actualizarContadorCarrito(contadorCarrito);
            
            // Restaurar botón después de 2 segundos
            setTimeout(() => {
                this.textContent = 'Agregar al Carrito';
                this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                this.disabled = false;
            }, 2000);
        });
    });
}

function actualizarContadorCarrito(contador) {
    // Buscar si ya existe un contador en el menú
    let contadorElement = document.querySelector('.contador-carrito');
    
    if (!contadorElement) {
        // Crear contador si no existe
        const enlaceCarrito = document.querySelector('a[href="carrito.html"]');
        if (enlaceCarrito) {
            contadorElement = document.createElement('span');
            contadorElement.className = 'contador-carrito';
            contadorElement.style.cssText = `
                background: #e74c3c;
                color: white;
                border-radius: 50%;
                padding: 2px 6px;
                font-size: 0.8rem;
                margin-left: 5px;
            `;
            enlaceCarrito.appendChild(contadorElement);
        }
    }
    
    if (contadorElement) {
        contadorElement.textContent = contador;
        contadorElement.style.display = contador > 0 ? 'inline' : 'none';
    }
}

function configurarCarrito() {
    const inputsCantidad = document.querySelectorAll('.input-cantidad');
    
    inputsCantidad.forEach(input => {
        input.addEventListener('change', function() {
            // Actualizar subtotal de la fila
            const fila = this.closest('tr');
            const precio = parseFloat(fila.querySelector('.precio-producto').textContent.replace('$', ''));
            const cantidad = parseInt(this.value);
            const subtotal = fila.querySelector('.subtotal');
            
            if (!isNaN(precio) && !isNaN(cantidad)) {
                subtotal.textContent = `$${(precio * cantidad).toFixed(2)}`;
            }
            
            calcularTotal();
        });
        
        input.addEventListener('input', function() {
            // Validar que no sea menor que 1
            if (this.value < 1) {
                this.value = 1;
            }
            if (this.value > 10) {
                this.value = 10;
            }
        });
    });
    
    // Calcular total inicial
    calcularTotal();
    
    // Configurar botón de pago
    const btnCheckout = document.querySelector('.btn-checkout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            const total = document.getElementById('total-compra').textContent;
            if (confirm(`¿Proceder al pago por ${total}?`)) {
                this.textContent = 'Procesando...';
                this.disabled = true;
                
                setTimeout(() => {
                    alert('¡Pago procesado exitosamente! 🎉\nGracias por tu compra.');
                    // En una implementación real, aquí redirigiríamos a la página de confirmación
                }, 2000);
            }
        });
    }
}

function calcularTotal() {
    let total = 0;
    const filas = document.querySelectorAll('tbody tr');
    
    filas.forEach(fila => {
        const precio = parseFloat(fila.querySelector('.precio-producto').textContent.replace('$', ''));
        const cantidad = parseInt(fila.querySelector('.input-cantidad').value);
        
        if (!isNaN(precio) && !isNaN(cantidad)) {
            total += precio * cantidad;
        }
    });
    
    const elementoTotal = document.getElementById('total-compra');
    if (elementoTotal) {
        elementoTotal.textContent = `$${total.toFixed(2)}`;
        elementoTotal.style.color = '#e74c3c';
        elementoTotal.style.fontWeight = 'bold';
    }
}

function configurarBusqueda() {
    const formularioBusqueda = document.getElementById('formulario-busqueda');
    const inputBusqueda = document.getElementById('input-busqueda');
    const resultadosBusqueda = document.getElementById('resultados-busqueda');
    
    if (formularioBusqueda && inputBusqueda && resultadosBusqueda) {
        formularioBusqueda.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const termino = inputBusqueda.value.trim();
            
            if (termino) {
                // Mostrar animación de carga
                resultadosBusqueda.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <p>Buscando "${termino}"...</p>
                    </div>
                `;
                
                // Simular búsqueda con delay
                setTimeout(() => {
                    const productosFicticios = [
                        {
                            nombre: `Producto relacionado con "${termino}"`,
                            descripcion: `Este producto está perfectamente relacionado con tu búsqueda de ${termino}. Características premium y calidad garantizada.`
                        },
                        {
                            nombre: `${termino} Premium`,
                            descripcion: `Versión premium de ${termino} con todas las funciones avanzadas que necesitas.`
                        },
                        {
                            nombre: `Kit Completo ${termino}`,
                            descripcion: `Todo lo que necesitas para ${termino} en un solo paquete. Incluye accesorios y garantía extendida.`
                        }
                    ];
                    
                    let html = `<h3>🔍 Resultados para la búsqueda de "${termino}"</h3>`;
                    html += `<p>Se encontraron ${productosFicticios.length} productos relacionados:</p>`;
                    html += '<div class="productos-resultados">';
                    
                    productosFicticios.forEach((producto, index) => {
                        html += `
                            <div class="producto">
                                <h4>${producto.nombre}</h4>
                                <p>${producto.descripcion}</p>
                                <button class="btn-agregar-carrito" onclick="agregarDesdeBusqueda(${index})" 
                                        style="margin-top: 0.5rem; padding: 0.5rem 1rem;">
                                    Agregar al Carrito
                                </button>
                            </div>
                        `;
                    });
                    
                    html += '</div>';
                    resultadosBusqueda.innerHTML = html;
                    
                }, 1500);
            } else {
                resultadosBusqueda.innerHTML = '<p style="color: #e74c3c; text-align: center;">⚠️ Por favor, ingresa un término de búsqueda</p>';
            }
        });
        
        // Permitir búsqueda al presionar Enter
        inputBusqueda.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                formularioBusqueda.dispatchEvent(new Event('submit'));
            }
        });
    }
}

// Función global para agregar desde búsqueda
function agregarDesdeBusqueda(index) {
    alert(`Producto ${index + 1} agregado al carrito desde búsqueda! 🛒`);
    // Aquí se podría implementar la lógica real para agregar al carrito
}

// Funciones para eliminar productos del carrito
function eliminarProducto(boton) {
    const fila = boton.closest('tr');
    const producto = fila.getAttribute('data-producto');
    const precio = fila.getAttribute('data-precio');
    
    // Animación de eliminación
    fila.classList.add('producto-eliminado');
    
    // Mostrar confirmación
    setTimeout(() => {
        if (confirm(`¿Estás seguro de que quieres eliminar "${producto}" del carrito?`)) {
            fila.remove();
            verificarCarritoVacio();
            calcularTotal();
            actualizarContadorCarritoGlobal(-1); // Reducir contador global
        } else {
            // Si cancela, quitar la animación
            fila.classList.remove('producto-eliminado');
        }
    }, 300);
}

function verificarCarritoVacio() {
    const cuerpoCarrito = document.getElementById('cuerpo-carrito');
    const tablaCarrito = document.getElementById('tabla-carrito');
    const resumenCarrito = document.getElementById('resumen-carrito');
    const carritoVacio = document.getElementById('carrito-vacio');
    
    if (cuerpoCarrito.children.length === 0) {
        // Carrito vacío
        tablaCarrito.style.display = 'none';
        resumenCarrito.style.display = 'none';
        carritoVacio.style.display = 'block';
    } else {
        // Hay productos
        tablaCarrito.style.display = 'table';
        resumenCarrito.style.display = 'block';
        carritoVacio.style.display = 'none';
    }
}

function actualizarContadorCarritoGlobal(cambio) {
    // Esta función actualizaría un contador global si estuviera implementado
    // Por ahora, solo muestra un mensaje en consola
    console.log(`Contador del carrito actualizado: ${cambio}`);
    
    // En una implementación real, aquí actualizarías el contador en el menú
    let contadorActual = parseInt(localStorage.getItem('contadorCarrito') || '3');
    contadorActual += cambio;
    localStorage.setItem('contadorCarrito', contadorActual);
    
    // Actualizar contador visual en el menú (si existe)
    const contadorElement = document.querySelector('.contador-carrito');
    if (contadorElement) {
        if (contadorActual > 0) {
            contadorElement.textContent = contadorActual;
            contadorElement.style.display = 'inline';
        } else {
            contadorElement.style.display = 'none';
        }
    }
}

// Modificar la función configurarCarrito para incluir la verificación inicial
function configurarCarrito() {
    const inputsCantidad = document.querySelectorAll('.input-cantidad');
    
    inputsCantidad.forEach(input => {
        input.addEventListener('change', function() {
            // Actualizar subtotal de la fila
            const fila = this.closest('tr');
            const precio = parseFloat(fila.querySelector('.precio-producto').textContent.replace('$', ''));
            const cantidad = parseInt(this.value);
            const subtotal = fila.querySelector('.subtotal');
            
            if (!isNaN(precio) && !isNaN(cantidad)) {
                subtotal.textContent = `$${(precio * cantidad).toFixed(2)}`;
            }
            
            calcularTotal();
        });
        
        input.addEventListener('input', function() {
            // Validar que no sea menor que 1
            if (this.value < 1) {
                this.value = 1;
            }
            if (this.value > 10) {
                this.value = 10;
            }
        });
    });
    
    // Verificar si el carrito está vacío al cargar la página
    verificarCarritoVacio();
    
    // Calcular total inicial
    calcularTotal();
    
    // Configurar botón de pago
    const btnCheckout = document.querySelector('.btn-checkout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            const total = document.getElementById('total-compra').textContent;
            if (confirm(`¿Proceder al pago por ${total}?`)) {
                this.textContent = 'Procesando...';
                this.disabled = true;
                
                setTimeout(() => {
                    alert('¡Pago procesado exitosamente! 🎉\nGracias por tu compra.');
                    // Limpiar carrito después del pago
                    const cuerpoCarrito = document.getElementById('cuerpo-carrito');
                    cuerpoCarrito.innerHTML = '';
                    verificarCarritoVacio();
                    localStorage.setItem('contadorCarrito', '0');
                    
                    // Restaurar botón
                    setTimeout(() => {
                        this.textContent = 'Proceder al Pago';
                        this.disabled = false;
                    }, 1000);
                }, 2000);
            }
        });
    }
}
// ===== SISTEMA DE CARRITO DINÁMICO =====

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar producto al carrito desde el catálogo
function agregarAlCarrito(nombre, precio, imagen) {
    console.log('Agregando producto:', nombre, precio, imagen);
    
    // Buscar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        // Si ya existe, aumentar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, agregar nuevo producto
        carrito.push({
            nombre: nombre,
            precio: parseFloat(precio),
            imagen: imagen,
            cantidad: 1
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar interfaz
    actualizarInterfazCarrito();
    actualizarContadorCarrito();
    
    // Mostrar mensaje de confirmación
    mostrarMensajeAgregado(nombre);
    
    return false; // Prevenir comportamiento por defecto
}

// Función para actualizar la interfaz del carrito
function actualizarInterfazCarrito() {
    const cuerpoCarrito = document.getElementById('cuerpo-carrito');
    const contenidoCarrito = document.getElementById('contenido-carrito');
    const carritoVacio = document.getElementById('carrito-vacio');
    
    if (!cuerpoCarrito) return; // Si no estamos en la página del carrito
    
    if (carrito.length === 0) {
        // Mostrar carrito vacío
        if (contenidoCarrito) contenidoCarrito.style.display = 'none';
        if (carritoVacio) carritoVacio.style.display = 'block';
    } else {
        // Mostrar productos del carrito
        if (contenidoCarrito) contenidoCarrito.style.display = 'block';
        if (carritoVacio) carritoVacio.style.display = 'none';
        
        // Limpiar tabla
        cuerpoCarrito.innerHTML = '';
        
        // Agregar productos
        carrito.forEach((producto, index) => {
            const fila = document.createElement('tr');
            fila.setAttribute('data-indice', index);
            fila.setAttribute('data-producto', producto.nombre);
            fila.setAttribute('data-precio', producto.precio);
            
            const subtotal = producto.precio * producto.cantidad;
            
            fila.innerHTML = `
                <td>
                    <div class="cart-product">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="cart-product-image">
                        <div class="cart-product-info">
                            <span class="product-name">${producto.nombre}</span>
                            <span class="product-description">${obtenerDescripcion(producto.nombre)}</span>
                        </div>
                    </div>
                </td>
                <td class="precio-producto">$${producto.precio.toFixed(2)}</td>
                <td>
                    <div class="quantity-controls">
                        <button type="button" class="btn-quantity btn-decrease" onclick="cambiarCantidadCarrito(${index}, -1)">-</button>
                        <input type="number" class="input-cantidad" value="${producto.cantidad}" min="1" max="10" onchange="actualizarCantidadInput(${index}, this.value)">
                        <button type="button" class="btn-quantity btn-increase" onclick="cambiarCantidadCarrito(${index}, 1)">+</button>
                    </div>
                </td>
                <td class="subtotal">$${subtotal.toFixed(2)}</td>
                <td>
                    <button type="button" class="btn-eliminar" onclick="eliminarProductoCarrito(${index})" title="Eliminar producto">
                        🗑️ Eliminar
                    </button>
                </td>
            `;
            
            cuerpoCarrito.appendChild(fila);
        });
    }
    
    calcularTotalCarrito();
}

// Función para actualizar cantidad desde input
function actualizarCantidadInput(indice, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad);
    if (nuevaCantidad < 1) nuevaCantidad = 1;
    if (nuevaCantidad > 10) nuevaCantidad = 10;
    
    carrito[indice].cantidad = nuevaCantidad;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarInterfazCarrito();
}

// Función para obtener descripción del producto
function obtenerDescripcion(nombreProducto) {
    const descripciones = {
        'Smartphone XYZ': '128GB, Cámara 48MP',
        'Laptop ABC': 'Intel i7, 16GB RAM',
        'Audífonos Pro': 'Cancelación de ruido',
        'Smartwatch Plus': 'GPS, Monitor cardiaco',
        'Tablet Max': '10 pulgadas, 64GB',
        'Cámara Digital': '24.2MP, Lente 18-55mm'
    };
    
    return descripciones[nombreProducto] || 'Producto premium';
}

// Función para cambiar cantidad en el carrito
function cambiarCantidadCarrito(indice, cambio) {
    const producto = carrito[indice];
    let nuevaCantidad = producto.cantidad + cambio;
    
    // Validar límites
    if (nuevaCantidad < 1) nuevaCantidad = 1;
    if (nuevaCantidad > 10) nuevaCantidad = 10;
    
    producto.cantidad = nuevaCantidad;
    
    // Guardar cambios
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarInterfazCarrito();
    actualizarContadorCarrito();
}

// Función para eliminar producto del carrito
function eliminarProductoCarrito(indice) {
    const producto = carrito[indice].nombre;
    
    if (confirm(`¿Estás seguro de que quieres eliminar "${producto}" del carrito?`)) {
        // Eliminar producto
        carrito.splice(indice, 1);
        
        // Guardar cambios
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarInterfazCarrito();
        actualizarContadorCarrito();
        
        // Mostrar mensaje
        mostrarMensajeEliminado(producto);
    }
}

// Función para calcular total del carrito
function calcularTotalCarrito() {
    let subtotal = 0;
    
    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });
    
    // Calcular envío (gratis sobre $500)
    const envio = subtotal >= 500 ? 0 : 15.99;
    const total = subtotal + envio;
    
    // Actualizar elementos en el DOM
    const elementoSubtotal = document.getElementById('subtotal-compra');
    const elementoEnvio = document.getElementById('envio-compra');
    const elementoTotal = document.getElementById('total-compra');
    
    if (elementoSubtotal) elementoSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (elementoEnvio) elementoEnvio.textContent = envio === 0 ? 'GRATIS' : `$${envio.toFixed(2)}`;
    if (elementoTotal) elementoTotal.textContent = `$${total.toFixed(2)}`;
    
    // Estilo para envío gratis
    if (elementoEnvio) {
        if (envio === 0) {
            elementoEnvio.style.color = '#28a745';
            elementoEnvio.style.fontWeight = 'bold';
        } else {
            elementoEnvio.style.color = '';
            elementoEnvio.style.fontWeight = '';
        }
    }
}

// Función para actualizar contador en el menú
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    
    // Actualizar en todas las páginas
    const enlacesCarrito = document.querySelectorAll('a[href="carrito.html"]');
    
    enlacesCarrito.forEach(enlaceCarrito => {
        let contadorElement = enlaceCarrito.querySelector('.contador-carrito');
        
        if (!contadorElement) {
            contadorElement = document.createElement('span');
            contadorElement.className = 'contador-carrito';
            contadorElement.style.cssText = `
                background: #e74c3c;
                color: white;
                border-radius: 50%;
                padding: 2px 6px;
                font-size: 0.8rem;
                margin-left: 5px;
            `;
            enlaceCarrito.appendChild(contadorElement);
        }
        
        if (totalItems > 0) {
            contadorElement.textContent = totalItems;
            contadorElement.style.display = 'inline';
        } else {
            contadorElement.style.display = 'none';
        }
    });
}

// Función para mostrar mensaje de producto agregado
function mostrarMensajeAgregado(producto) {
    const mensaje = document.createElement('div');
    mensaje.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    mensaje.textContent = `✅ ${producto} agregado al carrito`;
    
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        mensaje.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (document.body.contains(mensaje)) {
                document.body.removeChild(mensaje);
            }
        }, 300);
    }, 3000);
}

// Función para mostrar mensaje de eliminación
function mostrarMensajeEliminado(producto) {
    const mensaje = document.createElement('div');
    mensaje.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    mensaje.textContent = `🗑️ ${producto} eliminado del carrito`;
    
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        mensaje.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (document.body.contains(mensaje)) {
                document.body.removeChild(mensaje);
            }
        }, 300);
    }, 3000);
}

// Configuración del carrito
function configurarCarrito() {
    // Cargar carrito desde localStorage
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Actualizar interfaz
    actualizarInterfazCarrito();
    
    // Configurar botón de pago
    const btnCheckout = document.querySelector('.btn-checkout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Agrega algunos productos primero.');
                return;
            }
            
            const total = document.getElementById('total-compra').textContent;
            
            if (confirm(`¿Proceder al pago por ${total}?\n\nSe redirigirá a la pasarela de pago.`)) {
                this.textContent = 'Procesando...';
                this.disabled = true;
                
                // Simular proceso de pago
                setTimeout(() => {
                    alert('¡Pago procesado exitosamente! 🎉\nGracias por tu compra.\nRecibirás un correo con los detalles de tu pedido.');
                    
                    // Vaciar carrito después del pago
                    carrito = [];
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarInterfazCarrito();
                    actualizarContadorCarrito();
                    
                    // Restaurar botón
                    setTimeout(() => {
                        this.textContent = 'Proceder al Pago';
                        this.disabled = false;
                    }, 1000);
                }, 3000);
            }
        });
    }
}

// Configuración del catálogo
function configurarCatalogo() {
    // Los botones ya tienen onclick, pero podemos agregar verificación adicional
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');
    
    botonesAgregar.forEach(boton => {
        // Remover cualquier evento existente para evitar duplicados
        boton.replaceWith(boton.cloneNode(true));
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada - Carrito actual:', carrito);
    
    // Configurar carrito si estamos en la página del carrito
    if (window.location.pathname.endsWith('carrito.html') || window.location.pathname.includes('carrito.html')) {
        configurarCarrito();
    }
    
    // Configurar catálogo si estamos en esa página
    if (window.location.pathname.endsWith('catalogo.html') || window.location.pathname.includes('catalogo.html')) {
        configurarCatalogo();
    }
    
    // Actualizar contador en todas las páginas
    actualizarContadorCarrito();
    
    // Agregar estilos de animación si no existen
    if (!document.querySelector('#animaciones-carrito')) {
        const style = document.createElement('style');
        style.id = 'animaciones-carrito';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});