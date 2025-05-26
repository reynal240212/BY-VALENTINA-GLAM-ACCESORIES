const productos = [
  {
    id: 'prod-01',
    nombre: 'Double Golden Contrast Hoops',
    precio: 45000,
    imagen: 'images/products/Double Golden Contrast Hoops.webp',
    descripcion: 'Elegantes aretes de argolla dorada...'
  },
  {
    id: 'prod-02',
    nombre: 'Golden Serenity Trio',
    precio: 30000,
    imagen: 'images/products/Golden Serenity Trio.webp',
    descripcion: 'Un exquisito conjunto de tres collares...'
  },
  {
    id: 'prod-03',
    nombre: 'Cherry Pop Studs',
    precio: 35000,
    imagen: 'images/products/Cherry Pop Studs.webp',
    descripcion: 'Añade un toque de color divertido...'
  },
  {
    id: 'prod-04',
    nombre: 'Sacred Heart Bracelet',
    precio: 55000,
    imagen: 'images/products/Sacred Heart Bracelet.avif',
    descripcion: 'Una delicada pulsera que presenta...'
  },
  {
    id: 'prod-05',
    nombre: 'Colorful Zircon Flower Ring Set',
    precio: 45000,
    imagen: 'images/products/Colorful Zircon Flower Ring Set.jpg',
    descripcion: 'Juego de tres anillos statement...'
  },
  {
    id: 'prod-06',
    nombre: 'Triple Elegance Wedding Band Set',
    precio: 40000,
    imagen: 'images/products/Triple Elegance Wedding Band Set.jpg',
    descripcion: 'Este juego de anillos combina...'
  },
  {
    id: 'prod-07',
    nombre: 'Brazalete Elegance',
    precio: 25000,
    imagen: 'images/products/BrazaleteElegant_1.webp',
    descripcion: 'Luce radiante con estos brazaletes...'
  },
  {
    id: 'prod-08',
    nombre: 'Black and Gold Clover Set',
    precio: 90000,
    imagen: 'images/products/Black and Gold Clover Set.jpg',
    descripcion: 'Un elegante conjunto a juego...'
  },
  {
    id: 'prod-09',
    nombre: 'Radiant Halo Engagement Ring',
    precio: 200000,
    imagen: 'images/products/radianthaloengamentring.webp',
    descripcion: 'Un deslumbrante anillo de compromiso...'
  },
  {
    id: 'prod-10',
    nombre: 'Reloj Sophia',
    precio: 110000,
    imagen: 'images/products/Reloj Sophia.jpg',
    descripcion: 'Reloj de pulsera con correa de acero...'
  }
];


document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');

    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productCardHTML = `
            <div class="product-img-container">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="product-img"
                >
                ${producto.hasOwnProperty('descuento') ? `<span class="product-badge">${producto.descuento}% OFF</span>` : ''}
            // </div>

            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-description">${producto.descripcion.substring(0, 80)}...</p>

                <div class="product-price-container">
                    <span class="product-price">$${producto.precio.toLocaleString('es-CO')}</span>
                    ${producto.hasOwnProperty('precioAnterior') ? `<span class="product-old-price">$${producto.precioAnterior.toLocaleString('es-AR')}</span>` : ''}
                </div>
                <button class="add-to-cart-btn"data-product-id="${producto.id}"> Añadir al carrito</button>
            </div>
        `;

        productCard.innerHTML = productCardHTML;
        productGrid.appendChild(productCard);
    });
});
