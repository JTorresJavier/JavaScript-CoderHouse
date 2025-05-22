// ✅ FUNCIONES CONSTRUCTORAS
function Producto(id, nombre, precio, categoria) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.categoria = categoria;
}

function ItemCarrito(producto) {
  this.id = producto.id;
  this.nombre = producto.nombre;
  this.precio = producto.precio;
}

// ✅ ARRAY DE PRODUCTOS usando la función constructora
const productos = [
  new Producto(1, "Laptop", 200000, "Electrónica"),
  new Producto(2, "Remera", 30000, "Ropa"),
  new Producto(3, "Libro de JS", 15000, "Libros"),
  new Producto(4, "Auriculares", 35000, "Electrónica")
];

// ✅ ALMACENAMIENTO LOCAL
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
renderCarrito(); // Mostrar si ya hay datos en localStorage

// ✅ DOM - Obtención de elementos
const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const totalSinIVA = document.getElementById("totalSinIVA");
const totalConIVA = document.getElementById("totalConIVA");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const btnVaciar = document.getElementById("vaciarCarrito");

// ✅ FUNCIONES DE RENDER Y EVENTOS
function renderProductos(lista) {
  productList.innerHTML = "";
  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <p>Categoría: ${p.categoria}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;
    productList.appendChild(div);
  });
}

// ✅ Agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push(new ItemCarrito(producto));
    guardarCarrito(); // actualizar localStorage
    renderCarrito();
  }
}

// ✅ Vaciar carrito (DOM + evento)
btnVaciar.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  renderCarrito();
});

// ✅ Mostrar carrito + eliminar productos individualmente
function renderCarrito() {
  cartList.innerHTML = "";
  let total = 0;

  carrito.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.nombre} - $${p.precio}
      <button class="eliminar-item" data-index="${index}">❌</button>
    `;
    cartList.appendChild(li);
    total += p.precio;
  });

  totalSinIVA.textContent = total.toFixed(2);
  totalConIVA.textContent = (total * 1.21).toFixed(2);

  // ✅ Evento eliminar producto individual
  document.querySelectorAll(".eliminar-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      carrito.splice(index, 1);
      guardarCarrito();
      renderCarrito();
    });
  });
}

// ✅ Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ✅ Buscar y filtrar productos (funciones del orden superior)
function filtrarYBuscar() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categoryFilter.value;

  const filtrados = productos.filter(p => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(texto);
    const coincideCategoria = !categoria || p.categoria === categoria;
    return coincideBusqueda && coincideCategoria;
  });

  renderProductos(filtrados);
}

// ✅ EVENTOS
searchInput.addEventListener("input", filtrarYBuscar);
categoryFilter.addEventListener("change", filtrarYBuscar);

// ✅ INICIAL
renderProductos(productos);
