// 1. Arreglos y Objetos (mínimo 1 de cada uno)
// Arreglo de objetos que simula nuestra base de datos de películas
const movies = [
    { id: 1, title: "Inception", genre: "Ciencia Ficción" },
    { id: 2, title: "The Dark Knight", genre: "Acción" },
    { id: 3, title: "Interstellar", genre: "Ciencia Ficción" },
    { id: 4, title: "Parasite", genre: "Drama" },
    { id: 5, title: "Avengers: Endgame", genre: "Acción" },
    { id: 6, title: "Spirited Away", genre: "Animación" },
    { id: 7, title: "The Matrix", genre: "Ciencia Ficción" },
    { id: 8, title: "Joker", genre: "Drama" }
];

// Arreglo para guardar los favoritos (uso de let porque puede cambiar si lo vaciamos después, o const si solo usamos push/splice)
let favorites = [];

// 2. Manipulación del DOM (querySelector)
const moviesContainer = document.querySelector('#moviesContainer');
const favoritesContainer = document.querySelector('#favoritesContainer');
const searchInput = document.querySelector('#searchInput');

// 3. Funciones y renderizado dinámico
// Arrow function requerida por la rúbrica
const renderMovies = (movieList) => {
    // Limpiamos el contenedor antes de renderizar
    moviesContainer.innerHTML = '';

    // Uso de if para cuando no hay resultados en la búsqueda
    if (movieList.length === 0) {
        moviesContainer.innerHTML = '<p>No se encontraron películas.</p>';
        return; // Salimos de la función
    }

    // Uso de ciclo (forEach)
    movieList.forEach(movie => {
        // Verificar si ya está en favoritos
        const isFavorite = favorites.some(fav => fav.id === movie.id);

        // Modificación dinámica del HTML
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.genre}</p>
            <button class="btn-fav ${isFavorite ? 'remove' : ''}" onclick="toggleFavorite(${movie.id})">
                ${isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
            </button>
        `;
        
        moviesContainer.appendChild(movieCard);
    });
};

// Función para renderizar los favoritos en el panel lateral
function renderFavorites() {
    favoritesContainer.innerHTML = '';

    // Uso de if
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>Aún no tienes favoritos.</p>';
        return;
    }

    // Uso de ciclo (for clásico u otro)
    for (let i = 0; i < favorites.length; i++) {
        const fav = favorites[i];
        
        const favElement = document.createElement('div');
        favElement.className = 'favorite-item';
        favElement.innerHTML = `
            <span>${fav.title}</span>
            <button onclick="toggleFavorite(${fav.id})" title="Quitar">❌</button>
        `;
        
        favoritesContainer.appendChild(favElement);
    }
}

// 4. Sistema de favoritos
// Función propia para agregar o quitar favoritos
function toggleFavorite(id) {
    // Buscamos si la película ya está en favoritos
    const index = favorites.findIndex(fav => fav.id === id);

    if (index !== -1) {
        // Si ya está, la quitamos (uso de let/const y condicionales)
        favorites.splice(index, 1);
    } else {
        // Si no está, la buscamos en el arreglo original y la agregamos
        const movieToAdd = movies.find(m => m.id === id);
        if (movieToAdd) {
            favorites.push(movieToAdd);
        }
    }

    // Volvemos a renderizar para que los botones y la lista se actualicen
    renderMovies(movies); // Podríamos pasarle la lista filtrada actual, pero por simplicidad pasamos todas o disparamos la búsqueda
    triggerSearch(); // Esto mantiene el filtro activo cuando damos click a favorito
    renderFavorites();
}

// 5. Búsqueda o filtro dinámico
// Evento para el buscador (addEventListener)
searchInput.addEventListener('input', triggerSearch);

function triggerSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    // Filtramos usando arrow function dentro de filter
    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchTerm) || 
               movie.genre.toLowerCase().includes(searchTerm);
    });

    renderMovies(filteredMovies);
}

// Render inicial al cargar la página
renderMovies(movies);
renderFavorites();
