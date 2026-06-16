# DirectFactory - Ventas Al Mayor (Evaluación Sumativa 2)

## Descripción del Proyecto
Este proyecto es una página web para una empresa de distribución de ropa y calzado al por mayor llamada DirectFactory. La página funciona como un catálogo interactivo donde los usuarios pueden ver productos, agregarlos a favoritos y buscarlos en tiempo real. Para esta evaluación, integré JavaScript puro (Vanilla JS) para darle vida a la sección del catálogo que antes era estática, cumpliendo con los requisitos de manipulación del DOM, arreglos, objetos, ciclos y funciones (incluyendo arrow functions).

## Estructura de Carpetas
```text
proyecto/
│
├── css/
│   └── styles.css        # Hoja de estilos con variables CSS, Flexbox y media queries.
│
├── js/
│   └── main.js           # Archivo principal de JavaScript con toda la lógica dinámica.
│
├── img/
│   ├── hero.png          # Imagen principal (banner).
│   └── qc.png            # Imagen para la sección de control de calidad.
│
├── index.html            # Estructura semántica en HTML5 de la página.
└── README.md             # Documentación del proyecto (este archivo).
```

## Prompts Utilizados
Para apoyarme con el desarrollo e integrar correctamente los requerimientos de la rúbrica, utilicé Inteligencia Artificial como guía. Traté de hacer consultas específicas para entender cómo hacer las cosas en vez de pedirle que hiciera todo de golpe. Aquí algunos de los prompts que usé:

1. *"Hola, tengo un catálogo en HTML que está estático. Necesito pasarlo a un arreglo de objetos en JavaScript. ¿Me puedes mostrar un ejemplo de cómo estructurar un arreglo de objetos que tenga id, nombre, precio y categoría?"*
2. *"¿Cómo puedo usar un `forEach` para recorrer mi arreglo de productos y mostrarlos en un div usando `innerHTML` o `createElement` en JavaScript puro?"*
3. *"Necesito implementar un buscador en tiempo real. Tengo un input con el id 'searchInput'. ¿Cuál es la mejor forma de filtrar un arreglo en base a lo que el usuario escribe usando una arrow function?"*
4. *"Quiero hacer un sistema de favoritos. ¿Cómo verifico si un objeto ya existe dentro de un arreglo 'favoritos' antes de hacerle push, y si ya existe, cómo lo elimino usando `splice`?"*

## Validación y Correcciones Realizadas
Durante el desarrollo, me encontré con algunos problemas que tuve que corregir y validar:

1. **Problema con los eventos del buscador:** Al principio la búsqueda solo funcionaba cuando le daba enter o quitaba el foco. Lo corregí cambiando el evento a `'input'`, así el filtro es dinámico mientras voy escribiendo.
2. **Duplicidad de productos al renderizar:** Cada vez que filtraba, los productos se agregaban abajo de los anteriores en lugar de reemplazarlos. Validé que necesitaba limpiar el contenedor (`catalogGrid.innerHTML = ''`) antes del ciclo `forEach` o al principio de la función.
3. **Estado del botón de favoritos:** El botón no cambiaba de texto. Tuve que validar usando `some()` si el ID del producto ya estaba en el array de favoritos para usar una variable booleana `esFavorito` y cambiar dinámicamente la clase y el texto del botón.
4. **Archivos fuera de lugar:** Al principio tenía el `index.html` y este `README.md` dentro de la carpeta `/js` lo que estaba mal. Corregí la estructura de carpetas moviéndolos a la raíz para que el proyecto siga el estándar correcto de una web.
