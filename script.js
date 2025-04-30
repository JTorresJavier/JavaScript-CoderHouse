const productos = [
  { id: 1, nombre: "Laptop", precio: 200000, categoria: "Electrónica" },
  { id: 2, nombre: "Remera", precio: 30000, categoria: "Ropa" },
  { id: 3, nombre: "Libro de JS", precio: 15000, categoria: "Libros" },
  { id: 4, nombre: "Auriculares", precio: 35000, categoria: "Electrónica" }
];

let carrito = [];

const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const totalSinIVA = document.getElementById("totalSinIVA");
const totalConIVA = document.getElementById("totalConIVA");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

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

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    renderCarrito();
  }
}

function renderCarrito() {
  cartList.innerHTML = "";
  let total = 0;
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    cartList.appendChild(li);
    total += p.precio;
  });

  totalSinIVA.textContent = total.toFixed(2);
  totalConIVA.textContent = (total * 1.21).toFixed(2);
}

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

// Eventos
searchInput.addEventListener("input", filtrarYBuscar);
categoryFilter.addEventListener("change", filtrarYBuscar);

// Inicial
renderProductos(productos);
