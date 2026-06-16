// 1. Variables, Arreglos y Objetos (let, const)
const productos = [
    {
        id: 1,
        nombre: "Chaquetas Térmicas Impermeables",
        descripcion: "Costuras termoselladas, forro cortavientos de alta resistencia térmica. Ideal para temporadas frías.",
        precio: "Desde $12.50 USD",
        moq: "MOQ: 50 unidades",
        badge: "Top Ventas",
        icono: "🧥",
        categoria: "chaquetas"
    },
    {
        id: 2,
        nombre: "Zapatillas Deportivas Urban Pro",
        descripcion: "Suelas de goma vulcanizada de alta tracción y malla transpirable de fibra elástica. Estilo urbano moderno.",
        precio: "Desde $18.90 USD",
        moq: "MOQ: 30 pares",
        badge: "Premium",
        icono: "👟",
        categoria: "zapatillas"
    },
    {
        id: 3,
        nombre: "Pack Calcetines Deportivos Algodón",
        descripcion: "Tejido de alto rendimiento en algodón peinado con soporte elástico y zonas de amortiguación reforzadas.",
        precio: "Desde $0.65 USD",
        moq: "MOQ: 500 packs",
        badge: "Pack Mayorista",
        icono: "🧦",
        categoria: "calcetines"
    },
    {
        id: 4,
        nombre: "Mochilas de Cordura Porta-Laptops",
        descripcion: "Compartimento acolchado para laptops de hasta 16\", cierres YKK repelentes al agua y costuras de alta resistencia.",
        precio: "Desde $7.20 USD",
        moq: "MOQ: 100 unidades",
        badge: "Urbano",
        icono: "🎒",
        categoria: "mochilas"
    },
    {
        id: 5,
        nombre: "Bananos Ajustables de Ripstop",
        descripcion: "Bananos (cangureras) compactas con múltiples bolsillos organizadores. Impermeables y ligeros para uso diario.",
        precio: "Desde $3.10 USD",
        moq: "MOQ: 150 unidades",
        badge: "Tendencia",
        icono: "💼",
        categoria: "bananos"
    }
];

// Arreglo para guardar los favoritos (modificable con let)
let favoritos = [];

// 2. Manipulación del DOM (querySelector)
const catalogGrid = document.querySelector('#catalogGrid');
const searchInput = document.querySelector('#searchInput');
const favoritesList = document.querySelector('#favoritesList');
const favCount = document.querySelector('#favCount');

// 3. Funciones y renderizado dinámico (Arrow function)
const renderProductos = (listaProductos) => {
    // Limpiamos el contenedor
    catalogGrid.innerHTML = '';

    // Uso de condicional if (requerimiento de la rúbrica)
    if (listaProductos.length === 0) {
        catalogGrid.innerHTML = '<p class="no-results">No se encontraron productos con esa búsqueda.</p>';
        return;
    }

    // Uso de ciclo forEach para iterar y modificar el HTML
    listaProductos.forEach(producto => {
        // Arrow function interna
        const esFavorito = favoritos.some(fav => fav.id === producto.id);

        const card = document.createElement('article');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-badge">${producto.badge}</div>
            <div class="product-icon">${producto.icono}</div>
            <div class="product-body">
                <h3>${producto.nombre}</h3>
                <p class="product-desc">${producto.descripcion}</p>
                <div class="product-meta">
                    <span class="price-wholesale">${producto.precio}</span>
                    <span class="moq">${producto.moq}</span>
                </div>
                <!-- Funcionalidad del sistema de favoritos con modificación dinámica -->
                <button class="btn btn-fav ${esFavorito ? 'btn-remove' : 'btn-add'}" onclick="toggleFavorito(${producto.id})">
                    ${esFavorito ? 'Quitar de Favoritos ❌' : 'Agregar a Favoritos ⭐'}
                </button>
            </div>
        `;
        
        catalogGrid.appendChild(card);
    });
};

// Función para renderizar los favoritos
function renderFavoritos() {
    favoritesList.innerHTML = '';
    favCount.textContent = favoritos.length;

    if (favoritos.length === 0) {
        favoritesList.innerHTML = '<p class="empty-favs">No hay favoritos guardados.</p>';
        return;
    }

    // Ciclo for tradicional requerido por la rúbrica (como alternativa a forEach)
    for (let i = 0; i < favoritos.length; i++) {
        const fav = favoritos[i];
        
        const favItem = document.createElement('div');
        favItem.className = 'fav-item';
        favItem.innerHTML = `
            <span class="fav-icon">${fav.icono}</span>
            <span class="fav-name">${fav.nombre}</span>
            <button class="btn-remove-fav" onclick="toggleFavorito(${fav.id})" title="Quitar">❌</button>
        `;
        
        favoritesList.appendChild(favItem);
    }
}

// 4. Sistema de favoritos (Función propia)
function toggleFavorito(id) {
    const index = favoritos.findIndex(fav => fav.id === id);

    if (index !== -1) {
        // Eliminar del arreglo si ya existe
        favoritos.splice(index, 1);
    } else {
        // Agregar al arreglo
        const producto = productos.find(p => p.id === id);
        if (producto) {
            favoritos.push(producto);
        }
    }

    // Actualizar ambas vistas y mantener filtro de búsqueda si lo hay
    triggerBusqueda(); 
    renderFavoritos();
}

// 5. Búsqueda o filtro dinámico (Eventos y Funciones)
function triggerBusqueda() {
    const termino = searchInput.value.toLowerCase();

    // Filtro dinámico 
    const filtrados = productos.filter(producto => {
        return producto.nombre.toLowerCase().includes(termino) || 
               producto.categoria.toLowerCase().includes(termino);
    });

    renderProductos(filtrados);
}

// addEventListener para búsqueda dinámica
searchInput.addEventListener('input', triggerBusqueda);

// Inicializar la vista al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderProductos(productos);
    renderFavoritos();
});
