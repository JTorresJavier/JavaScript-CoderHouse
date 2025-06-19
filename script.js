// Función constructora y almacenamiento
function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

// Array de productos (arrays y objetos)
const productos = [
  new Producto("Camiseta", 5000),
  new Producto("Gorra", 3000),
  new Producto("Zapatillas", 15000),
];

// Obtener elementos del DOM
const contenedor = document.getElementById("productos");
const carritoContenedor = document.getElementById("carrito");
const btnVaciar = document.getElementById("vaciar");

// Cargar carrito desde localStorage o inicializar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos (DOM y eventos)
productos.forEach((producto, index) => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>$${producto.precio}</p>
    <button onclick="agregarAlCarrito(${index})">Agregar</button>
  `;
  contenedor.appendChild(div);
});

// Agregar producto al carrito (funciones y parámetros)
function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  guardarCarrito();
  renderizarCarrito();
}

// Mostrar el carrito
function renderizarCarrito() {
  carritoContenedor.innerHTML = "";
  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <p>${producto.nombre} - $${producto.precio}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    carritoContenedor.appendChild(div);
  });

  // Función del orden superior: calcular total con reduce
  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
  carritoContenedor.appendChild(totalDiv);
}

// Eliminar producto
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  renderizarCarrito();
}

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
});

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Inicializar
renderizarCarrito();
