let carrito = [];

// Utils
const getEl = (selector) => document.querySelector(selector);
const getAll = (selector) => document.querySelectorAll(selector);

// Guardar y cargar carrito desde localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const guardado = localStorage.getItem('carrito');
    if (guardado) carrito = JSON.parse(guardado);
}

// Gestión del carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return console.warn(`❗ Producto con ID ${productoId} no encontrado.`);

    const existente = carrito.find(item => item.id === productoId);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarCarrito();
}

function eliminarItem(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarrito();
    actualizarCarrito();
}

function vaciarCarrito() {
    if (confirm("🗑️ ¿Estás seguro de vaciar el carrito?")) {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
    }
}

// Actualizar visual del carrito
function actualizarCarrito() {
    const itemsContainer = getEl('#modal-carrito-items');
    const totalPrecio = getEl('#modal-total-precio');
    const contador = getEl('.cart-count');

    if (!itemsContainer || !totalPrecio || !contador) {
        console.error('⚠️ No se encontraron los elementos del DOM necesarios.');
        return;
    }

    itemsContainer.innerHTML = '';
    let total = 0, cantidad = 0;

    if (carrito.length === 0) {
        itemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            cantidad += item.cantidad;

            itemsContainer.insertAdjacentHTML('beforeend', `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image">
                        <span class="cart-item-name">${item.nombre} (x${item.cantidad})</span>
                        <span class="cart-item-price">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                    </div>
                    <button class="eliminar-item-btn" data-id="${item.id}">❌</button>
                </div>
            `);
        });

        // Agregar eventos a los botones de eliminar
        getAll('.eliminar-item-btn').forEach(btn => {
            btn.addEventListener('click', () => eliminarItem(btn.dataset.id));
        });
    }

    contador.textContent = cantidad;
    totalPrecio.textContent = `$${total.toLocaleString('es-AR')}`;
}

// Modal
function cerrarModalCarrito() {
    const modal = getEl('#cartModal');
    if (modal) modal.style.display = 'none';
}

// Procesar compra
async function procesarCompra() {
    const totalStr = getEl('#modal-total-precio')?.textContent || '$0';
    const total = parseFloat(totalStr.replace('$', '').replace(/\./g, '').replace(',', '.'));

    if (carrito.length === 0) {
        return alert('🛒 Tu carrito está vacío. Agrega productos antes de comprar.');
    }

    const confirmar = confirm(`🛍️ El total es $${total.toLocaleString('es-AR')}. ¿Deseas finalizar la compra?`);
    if (confirmar) {
        alert('✅ ¡Compra realizada con éxito!');
        vaciarCarrito();
        cerrarModalCarrito();
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    actualizarCarrito();

    const modal = getEl('#cartModal');

    getEl('#eliminar-todos-btn')?.addEventListener('click', vaciarCarrito);
    getEl('#mostrar-carrito')?.addEventListener('click', () => {
        actualizarCarrito();
        if (modal) modal.style.display = 'block';
    });

    getEl('.close-cart-modal')?.addEventListener('click', cerrarModalCarrito);

    window.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModalCarrito();
    });

    getEl('.product-grid')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) agregarAlCarrito(btn.dataset.productId);
    });

    getEl('#checkout-button')?.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert("🛒 Tu carrito está vacío.");
        } else {
            alert("✅ Compra finalizada. ¡Gracias!");
            vaciarCarrito();
            cerrarModalCarrito();
        }
    });

    getEl('#comprar-btn')?.addEventListener('click', procesarCompra);
});
// Cerrar el modal al presionar la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = getEl('#cartModal');
        if (modal && modal.style.display === 'block') {
            cerrarModalCarrito();
        }
    }
});
// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (e) => {
    const modal = getEl('#cartModal');
    if (modal && e.target === modal) {
        cerrarModalCarrito();
    }
});
// Cerrar el modal al hacer clic en el botón de cerrar
getEl('.close-cart-modal')?.addEventListener('click', cerrarModalCarrito);
// Cerrar el modal al hacer clic en el botón de eliminar todos
getEl('#eliminar-todos-btn')?.addEventListener('click', vaciarCarrito);
// Cerrar el modal al hacer clic en el botón de procesar compra
getEl('#comprar-btn')?.addEventListener('click', procesarCompra);
// Cerrar el modal al hacer clic en el botón de mostrar carrito
getEl('#mostrar-carrito')?.addEventListener('click', () => {
    const modal = getEl('#cartModal');
    if (modal) {
        modal.style.display = 'block';
        actualizarCarrito();
    }
});
