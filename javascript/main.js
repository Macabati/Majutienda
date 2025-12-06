//Productos

const productos = [
    { id: 1, nombre: "Termo", precio: 25000, img: "imagenes/termo.jpeg" },
    { id: 2, nombre: "Termo con mate", precio: 28000, img: "imagenes/termomate.jpeg" },
    { id: 3, nombre: "Vaso Quencher", precio: 18000, img: "imagenes/quencher.jpeg" },
    { id: 4, nombre:"Mate", precio: 10000, img: "imagenes/mates.jpeg" },
];

//variables DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const buttonVaciar = document.getElementById("vaciar");


//cargar carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


//mostrar productos
function mostrarProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <img src="${prod.img}" al="${prod.nombre}" class="foto-producto">
        <h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio}</p>
        <button data-id="${prod.id}"> Agregar al carrito</button>
        `;

        contenedorProductos.appendChild(div);
    });
}

//agregar productos
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    const itemCarrito = carrito.find(p => p.id === id);

    if (itemCarrito) {
        itemCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    mostrarCarrito();
}

//mostrar carrito
function mostrarCarrito() {
    contenedorCarrito.innerHTML ="";

    if (carrito.length === 0){
        contenedorCarrito.innerHTML = "<p>Carrito Vacio</p>";
        return;
    }

    carrito.forEach (item => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <h3>${item.nombre}</h3>
        <p>Precio: $${item.precio}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Subtotal: $${item.precio * item.cantidad}</p>
        `;
        contenedorCarrito.appendChild(div);
    });
}

//Storage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Eventos
contenedorProductos.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = Number(e.target.dataset.id);
        agregarAlCarrito(id);
    }
});

buttonVaciar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
});

//Iniciar
mostrarProductos();
mostrarCarrito();