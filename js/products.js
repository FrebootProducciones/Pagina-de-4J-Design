/* ============================================================
   4J Design — Product Catalog Data
   Catálogo dinámico de productos de sublimación y estampado DTF
   ============================================================ */

const PRODUCTS = [
    {
        id: 1,
        name: 'Franela Graphic Tee DTF',
        category: 'Camisas / Flanelas',
        tag: 'DTF Premium',
        price: '$15.00',
        description: 'Impresión DTF de alta definición en algodón premium. Diseño urbano oversized con acabado duradero.',
        image: 'assets/img/producto-1.jpg',
        emoji: '👕',
    },
    {
        id: 2,
        name: 'Franela Personalizada 100% Algodón',
        category: 'Camisas / Flanelas',
        tag: 'Personalizable',
        price: '$18.00',
        description: 'Sublimación full color sobre algodón 100%. Diseña tu arte y lo imprimimos con acabado profesional.',
        image: 'assets/img/producto-2.jpg',
        emoji: '👕',
    },
    {
        id: 3,
        name: 'Gorra Personalizada DTF',
        category: 'Gorras',
        tag: 'Sublimación',
        price: '$12.00',
        description: 'Estampado DTF en gorras de alta calidad. Diseños que resaltan tu marca personal o equipo.',
        image: 'assets/img/producto-3.jpg',
        emoji: '🧢',
    },
    {
        id: 4,
        name: 'Taza Cerámica Sublimada',
        category: 'Tazas Cerámicas',
        tag: 'Sublimación',
        price: '$8.00',
        description: 'Taza cerámica de 11oz con sublimación full color. Acabado brillante, resistente al lavado.',
        image: 'assets/img/producto-4.jpg',
        emoji: '☕',
    },
    {
        id: 5,
        name: 'Termo Térmico Personalizado',
        category: 'Mugs Térmicos',
        tag: 'Sublimación Premium',
        price: '$14.00',
        description: 'Termo térmico de acero inoxidable con sublimación. Mantiene temperatura por horas. Ideal para regalos.',
        image: 'assets/img/producto-5.jpg',
        emoji: '🫗',
    },
    {
        id: 6,
        name: 'Frasco Térmico Premium',
        category: 'Mugs Térmicos',
        tag: 'Sublimación Premium',
        price: '$16.00',
        description: 'Frasco térmico de doble pared con diseño personalizado. Perfecto para empresas y eventos corporativos.',
        image: 'assets/img/producto-6.jpg',
        emoji: '🍶',
    },
    {
        id: 7,
        name: 'Playera DTF Estampado Premium',
        category: 'Camisas / Flanelas',
        tag: 'DTF Premium',
        price: '$16.00',
        description: 'Playera poliéster/algodón con estampado DTF de alta resistencia. Colores vivos que no se desvanecen.',
        image: 'assets/img/producto-7.jpg',
        emoji: '👔',
    },
    {
        id: 8,
        name: 'Gorra Bordada + DTF',
        category: 'Gorras',
        tag: 'Bordado + DTF',
        price: '$15.00',
        description: 'Gorra con bordado Frontal + estampado DTF trasero. Combinación premium para marcas exigentes.',
        image: 'assets/img/producto-8.jpg',
        emoji: '🧢',
    },
    {
        id: 9,
        name: 'Kit Regalo Personalizado',
        category: 'Regalos Personalizados',
        tag: 'Combo',
        price: '$25.00',
        description: 'Kit que incluye taza + frasco térmico + gorra personalizados. Perfecto para regalo corporativo o evento.',
        image: 'assets/img/producto-9.jpg',
        emoji: '🎁',
    },
];

/* Renderiza el catálogo en el contenedor指定 */
function renderCatalog(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    PRODUCTS.forEach(function (product, index) {
        const card = document.createElement('article');
        card.className =
            'card-zoom group relative bg-card-gradient rounded-2xl border border-dorado/10 shadow-card overflow-hidden hover:shadow-card-hover hover:border-dorado/25 transition-all duration-500 reveal';
        card.style.transitionDelay = (index * 80) + 'ms';

        card.innerHTML =
            '<div class="relative overflow-hidden">' +
                '<img src="' + product.image + '" alt="' + product.name + '" ' +
                    'class="w-full h-72 object-cover" ' +
                    'loading="lazy" ' +
                    'onerror="this.style.display=\'none\'; this.nextElementSibling.classList.remove(\'hidden\')">' +
                '<div class="hidden w-full h-72 bg-gradient-to-br from-negro-light to-vinotinto-dark/30 flex items-center justify-center">' +
                    '<span class="text-6xl">' + product.emoji + '</span>' +
                '</div>' +
                '<span class="absolute top-4 left-4 bg-vinotinto/90 text-limpio text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-dorado/30">' +
                    product.tag +
                '</span>' +
                '<span class="absolute top-4 right-4 bg-negro/70 text-dorado text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">' +
                    product.price +
                '</span>' +
            '</div>' +
            '<div class="p-6">' +
                '<span class="text-[10px] font-bold uppercase tracking-wider text-dorado/50 mb-1 block">' +
                    product.category +
                '</span>' +
                '<h3 class="text-lg font-bold text-limpio mb-2 group-hover:text-dorado transition-colors duration-300">' +
                    product.name +
                '</h3>' +
                '<p class="text-sm text-gris-claro/50 mb-5 line-clamp-2">' +
                    product.description +
                '</p>' +
                '<button onclick="seleccionarProducto(\'' + product.name.replace(/'/g, "\\'") + ' - ' + product.price + '\')" ' +
                    'class="w-full py-3 bg-vinotinto/20 text-dorado font-semibold text-sm rounded-xl border border-dorado/30 ' +
                    'hover:bg-vinotinto hover:text-limpio hover:border-vinotinto hover:shadow-vinotinto-md transition-all duration-300 cursor-pointer uppercase tracking-wider">' +
                    'Encargar' +
                '</button>' +
            '</div>';

        container.appendChild(card);
    });

    // Re-observe new elements for scroll reveal
    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }
}

/* Filtrar por categoría */
function filterCatalog(category) {
    var container = document.getElementById('productGrid');
    if (!container) return;

    if (category === 'Todos') {
        renderCatalog('productGrid');
        return;
    }

    var filtered = PRODUCTS.filter(function (p) {
        return p.category === category;
    });

    container.innerHTML = '';

    filtered.forEach(function (product, index) {
        var card = document.createElement('article');
        card.className =
            'card-zoom group relative bg-card-gradient rounded-2xl border border-dorado/10 shadow-card overflow-hidden hover:shadow-card-hover hover:border-dorado/25 transition-all duration-500 reveal';
        card.style.transitionDelay = (index * 80) + 'ms';

        card.innerHTML =
            '<div class="relative overflow-hidden">' +
                '<img src="' + product.image + '" alt="' + product.name + '" ' +
                    'class="w-full h-72 object-cover" ' +
                    'loading="lazy" ' +
                    'onerror="this.style.display=\'none\'; this.nextElementSibling.classList.remove(\'hidden\')">' +
                '<div class="hidden w-full h-72 bg-gradient-to-br from-negro-light to-vinotinto-dark/30 flex items-center justify-center">' +
                    '<span class="text-6xl">' + product.emoji + '</span>' +
                '</div>' +
                '<span class="absolute top-4 left-4 bg-vinotinto/90 text-limpio text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-dorado/30">' +
                    product.tag +
                '</span>' +
                '<span class="absolute top-4 right-4 bg-negro/70 text-dorado text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">' +
                    product.price +
                '</span>' +
            '</div>' +
            '<div class="p-6">' +
                '<span class="text-[10px] font-bold uppercase tracking-wider text-dorado/50 mb-1 block">' +
                    product.category +
                '</span>' +
                '<h3 class="text-lg font-bold text-limpio mb-2 group-hover:text-dorado transition-colors duration-300">' +
                    product.name +
                '</h3>' +
                '<p class="text-sm text-gris-claro/50 mb-5 line-clamp-2">' +
                    product.description +
                '</p>' +
                '<button onclick="seleccionarProducto(\'' + product.name.replace(/'/g, "\\'") + ' - ' + product.price + '\')" ' +
                    'class="w-full py-3 bg-vinotinto/20 text-dorado font-semibold text-sm rounded-xl border border-dorado/30 ' +
                    'hover:bg-vinotinto hover:text-limpio hover:border-vinotinto hover:shadow-vinotinto-md transition-all duration-300 cursor-pointer uppercase tracking-wider">' +
                    'Encargar' +
                '</button>' +
            '</div>';

        container.appendChild(card);
    });

    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }
}

window.renderCatalog = renderCatalog;
window.filterCatalog = filterCatalog;
window.PRODUCTS = PRODUCTS;
