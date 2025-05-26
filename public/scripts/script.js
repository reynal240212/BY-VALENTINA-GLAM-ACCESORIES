// Archivo: script.js
 

 // Datos de los productos
 const productos = [
  {
   id: "prod-01",
   nombre: "Double Golden Contrast Hoops",
   precio: 45000,
   imagen: "public/images/producto1.jpg",
   descripcion: "Elegantes aretes de argolla dorada...",
  },
  {
   id: "prod-02",
   nombre: "Golden Serenity Trio",
   precio: 30000,
   imagen: "public/images/producto2.jpg",
   descripcion: "Un exquisito conjunto de tres collares...",
  },
  {
   id: "prod-03",
   nombre: "Cherry Pop Studs",
   precio: 35000,
   imagen: "public/images/producto3.jpg",
   descripcion: "Añade un toque de color divertido...",
  },
  {
   id: "prod-04",
   nombre: "Sacred Heart Bracelet",
   precio: 55000,
   imagen: "public/images/producto4.jpg",
   descripcion: "Una delicada pulsera que presenta...",
  },
  {
   id: "prod-05",
   nombre: "Colorful Zircon Flower Ring Set",
   precio: 45000,
   imagen: "public/images/producto5.jpg",
   descripcion: "Juego de tres anillos statement...",
  },
  {
   id: "prod-06",
   nombre: "Triple Elegance Wedding Band Set",
   precio: 40000,
   imagen: "public/images/producto6.jpg",
   descripcion: "Este juego de anillos combina...",
  },
  {
   id: "prod-07",
   nombre: "Brazalete Elegance",
   precio: 25000,
   imagen: "public/images/producto7.jpg",
   descripcion: "Luce radiante con estos brazaletes...",
  },
  {
   id: "prod-08",
   nombre: "Black and Gold Clover Set",
   precio: 90000,
   imagen: "public/images/producto8.jpg",
   descripcion: "Un elegante conjunto a juego...",
  },
  {
   id: "prod-09",
   nombre: "Radiant Halo Engagement Ring",
   precio: 20000,
   imagen: "public/products/radianthaloengamentring.webp",
   descripcion: "Un deslumbrante anillo de compromiso...",
  },
  {
   id: "prod-10",
   nombre: "Reloj Sophia",
   precio: 110000,
   imagen: "images/products/Reloj Sophia.jpg",
   descripcion: "Reloj de pulsera con correa de acero...",
  },
  // Agrega más productos aquí
 ];
 

 // Carrito de compras
 let carrito = [];
 

 // Elementos del DOM
 let productGrid = document.querySelector(".product-grid");
 const cartCountSpan = document.querySelector(".cart-count");
 const modalCarritoItemsDiv = document.getElementById("modal-carrito-items");
 const modalTotalPrecioSpan = document.getElementById("modal-total-precio");
 const mostrarCarritoBtn = document.getElementById("mostrar-carrito");
 const cartModal = document.getElementById("cartModal");
 const cerrarCarritoModalBtn = document.querySelector(".close-cart-modal");
 const vaciarCarritoBtn = document.getElementById("eliminar-todos-btn");
 const checkoutBtn = document.getElementById("checkout-button");
 

 // Función para guardar el carrito en el localStorage
 function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
 }
 

 // Función para cargar el carrito desde el localStorage
 function cargarCarrito() {
  const savedCart = localStorage.getItem("carrito");
  if (savedCart) {
   try {
    carrito = JSON.parse(savedCart);
   } catch (error) {
    console.error("Error al cargar el carrito desde localStorage:", error);
    carrito = []; // Restablecer el carrito si falla la carga
   }
  }
  actualizarCarritoVisual();
 }
 

 // Función para actualizar la visualización del carrito
 function actualizarCarritoVisual() {
  if (cartCountSpan) {
   cartCountSpan.textContent = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
   );
  }
  if (modalCarritoItemsDiv) {
   modalCarritoItemsDiv.innerHTML = ""; // Limpiar el contenido anterior
   if (carrito.length === 0) {
    modalCarritoItemsDiv.innerHTML =
     "<p class='empty-cart-message'>El carrito está vacío</p>";
   } else {
    carrito.forEach((item) => {
     const modalItemDiv = document.createElement("div");
     modalItemDiv.classList.add("cart-item");
     modalItemDiv.innerHTML = `
             <img src="${item.imagen}" alt="${item.nombre}" style="width:50px; height: auto; margin-right: 10px;">
             <span>${item.nombre} x ${item.cantidad}</span>
             <span>$${item.precio.toLocaleString("es-AR")}</span>
             <button class="remove-item-btn" data-product-id="${item.id}">X</button>
         `;
     modalCarritoItemsDiv.appendChild(modalItemDiv);
    });
   }
  }
  if (modalTotalPrecioSpan) {
   const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
   );
   modalTotalPrecioSpan.textContent = total.toLocaleString("es-AR");
  }
 }
 

 // Función para agregar un producto al carrito
 function agregarAlCarrito(productoId) {
  const producto = productos.find((prod) => prod.id === productoId);
  if (producto) {
   const existingItem = carrito.find((item) => item.id === productoId);
   if (existingItem) {
    existingItem.cantidad++;
   } else {
    carrito.push({ ...producto, cantidad: 1 });
   }
   guardarCarrito();
   actualizarCarritoVisual();
  }
 }
 

 // Función para eliminar un producto del carrito
 function eliminarDelCarrito(productoId) {
  const index = carrito.findIndex((item) => item.id === productoId);
  if (index !== -1) {
   carrito.splice(index, 1);
   guardarCarrito();
   actualizarCarritoVisual();
  }
 }
 

 // Función para vaciar el carrito
 function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarritoVisual();
 }
 

 // Función para manejar el checkout
 function handleCheckout() {
  if (carrito.length > 0) {
   const productosParaURL = carrito.map((item) => ({
    nombre: item.nombre,
    precio: item.precio,
    cantidad: item.cantidad,
    imagen: item.imagen,
   }));
   const productosJSON = encodeURIComponent(JSON.stringify(productosParaURL));
   window.location.href = `checkout.html?productos=${productosJSON}`;
  } else {
   alert("Tu carrito está vacío. Agrega productos antes de continuar.");
  }
 }
 

 // Función para crear las tarjetas de producto
 function crearTarjetasDeProducto() {
  if (!productGrid) {
   console.error(
    "El contenedor de productos (.product-grid) no se encontró en el DOM."
   );
   return;
  }
 

  productGrid.innerHTML = ""; // Limpiar el grid antes de agregar las tarjetas
 

  productos.forEach((producto) => {
   const productCard = document.createElement("div");
   productCard.classList.add("product-card");
   productCard.innerHTML = `
         <div class="product-img-container">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
          ${
           producto.hasOwnProperty("descuento")
            ? `<span class="product-badge">${producto.descuento}% OFF</span>`
            : ""
          }
         </div>
         <div class="product-info">
          <h3 class="product-title">${producto.nombre}</h3>
          <p class="product-description">${producto.descripcion.substring(
           0,
           80
          )}...</p>
          <div class="product-price-container">
           <span class="product-price">$${producto.precio.toLocaleString(
            "es-AR"
           )}</span>
           ${
            producto.hasOwnProperty("precioAnterior")
             ? `<span class="product-old-price">$${producto.precioAnterior.toLocaleString(
               "es-AR"
              )}</span>`
             : ""
           }
          </div>
          <button class="add-to-cart-btn" data-product-id="${
           producto.id
          }">Añadir al carrito</button>
         </div>
        `;
   productGrid.appendChild(productCard);
  });
 

  // Agregar event listeners a los botones "Añadir al carrito" después de crearlos
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
   button.addEventListener("click", (event) => {
    const productId = event.target.dataset.productId;
    agregarAlCarrito(productId);
   });
  });
 }
 

 // Event listeners
 document.addEventListener("DOMContentLoaded", () => {
  productGrid = document.querySelector(".product-grid");
  crearTarjetasDeProducto();
  cargarCarrito();
 

  if (mostrarCarritoBtn && cartModal && cerrarCarritoModalBtn) {
   mostrarCarritoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    actualizarCarritoVisual();
    cartModal.style.display = "block";
   });
 

   cerrarCarritoModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
   });
 

   window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
     cartModal.style.display = "none";
    }
   });
  }
 

  if (modalCarritoItemsDiv) {
   modalCarritoItemsDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item-btn")) {
     const productoId = event.target.dataset.productId;
     eliminarDelCarrito(productoId);
    }
   });
  }
 

  if (vaciarCarritoBtn) {
   vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  }
 

  if (checkoutBtn) {
   checkoutBtn.addEventListener("click", handleCheckout);
  }
 });