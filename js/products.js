/* ============================================================
   4J Design — Listado oficial de precios + catálogo
   Franelas (Tela Terry), Suéteres y servicio DTF
   ============================================================ */

/* ----------------------------------------------------------
   1. LISTADO OFICIAL DE PRECIOS
   Cada grupo genera una o varias tarjetas en el catálogo.
   Para agregar una imagen, coloca su ruta en `image`
   (ej: 'assets/img/franela-oversize.jpg'). Si queda vacía,
   se muestra el emoji como placeholder.
   ---------------------------------------------------------- */
const PRICE_LIST = [
    {
        category: 'Franelas Oversize',
        sublabel: 'Tela Terry',
        tag: 'Tela Terry',
        emoji: '👕',
        image: '',
        note: 'Todo diseño adicional tiene un costo extra.',
        items: [
            {
                option: 'Diseño minimalista',
                price: '$18',
                description: 'Franela oversize en tela Terry con diseño minimalista en un solo lado. Corte amplio y ligero para uso diario.',
            },
            {
                option: 'Diseño mediano/grande (a un solo lado)',
                price: '$20',
                description: 'Franela oversize en tela Terry con estampado mediano o grande en una sola cara. Máxima presencia para tu arte.',
            },
            {
                option: 'Diseño grande + diseño pequeño',
                price: '$22',
                description: 'Franela oversize en tela Terry con estampado grande en el frente y un diseño pequeño en espalda o manga.',
            },
        ],
    },
    {
        category: 'Franelas Normales',
        sublabel: 'Tela Terry',
        tag: 'Tela Terry',
        emoji: '👚',
        image: '',
        note: 'Todo diseño adicional tiene un costo extra.',
        items: [
            {
                option: 'Diseño minimalista',
                price: '$16',
                description: 'Franela clásica en tela Terry con diseño minimalista en un solo lado. Tallaje estándar y cómodo.',
            },
            {
                option: 'Diseño mediano/grande (a un solo lado)',
                price: '$18',
                description: 'Franela clásica en tela Terry con estampado mediano o grande en una sola cara.',
            },
            {
                option: 'Diseño grande + diseño pequeño',
                price: '$20',
                description: 'Franela clásica en tela Terry con estampado grande en el frente y un diseño pequeño adicional.',
            },
        ],
    },
    {
        category: 'Suéteres',
        sublabel: 'Tela Terry',
        tag: 'Tela Terry',
        emoji: '🧥',
        image: '',
        note: 'Todo diseño adicional tiene un costo extra.',
        items: [
            {
                option: 'Diseño pequeño / mediano',
                price: '$22',
                description: 'Suéter personalizado con estampado pequeño o mediano en una sola cara. Ideal para equipos y regalos.',
            },
            {
                option: 'Diseño grande',
                price: '$25',
                description: 'Suéter personalizado con estampado grande de alta cobertura sobre tela Terry.',
            },
        ],
    },
    {
        category: 'Franelas Sublimadas Deportivas',
        sublabel: 'Sublimación deportiva',
        tag: 'Sublimación',
        emoji: '🏃',
        image: '',
        note: 'Todo diseño adicional tiene un costo extra.',
        items: [
            {
                option: 'Tela muselina',
                price: '$15',
                description: 'Franela deportiva sublimada en tela muselina. Liviana y fresca, ideal para equipos, entrenamientos y promociones.',
            },
            {
                option: 'Tela atlética dry fit',
                price: '$18',
                description: 'Franela deportiva sublimada en tela atlética dry fit. Secado rápido y alta absorción de sudor.',
            },
        ],
    },
    {
        category: 'DTF Solo',
        sublabel: 'Impresión / Transfer',
        tag: 'Impresión DTF',
        emoji: '🖨️',
        image: '',
        note: '',
        items: [
            {
                option: 'Tamaño A4',
                price: '$5',
                description: 'Hoja de transfer DTF tamaño A4 (21 × 29,7 cm). Solo la impresión, sin prenda.',
            },
            {
                option: 'Tamaño Tabloide',
                price: '$6',
                description: 'Hoja de transfer DTF tamaño Tabloide (27,9 × 43,2 cm). Más área para diseños grandes.',
            },
            {
                option: 'Medio metro',
                price: '$8',
                description: 'Media metro continuo de transfer DTF (aproximadamente 50 cm de largo).',
            },
            {
                option: 'Un metro',
                price: '$16',
                description: 'Metro continuo de transfer DTF (aproximadamente 100 cm de largo). La mejor opción por cantidad.',
            },
        ],
    },
];

/* ----------------------------------------------------------
   2. LISTADO PLANO DE PRODUCTOS (una tarjeta por variante)
   ---------------------------------------------------------- */
const PRODUCTS = [];
PRICE_LIST.forEach(function (group, groupIndex) {
    group.items.forEach(function (item, itemIndex) {
        PRODUCTS.push({
            id: groupIndex * 10 + itemIndex + 1,
            category: group.category,      // valor del botón de filtro
            sublabel: group.sublabel,      // "Tela Terry" / "Impresión / Transfer"
            option: item.option,           // variante dentro de la categoría
            name: group.category + ' - ' + item.option,  // texto que se envía al formulario
            price: item.price,
            priceLabel: 'Precio: ' + item.price,
            description: item.description,
            note: group.note,
            tag: group.tag,
            emoji: group.emoji,
            image: group.image,
        });
    });
});

/* ----------------------------------------------------------
   3. UTILIDADES
   ---------------------------------------------------------- */
function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* Bloque de imagen (o placeholder con emoji si no hay foto) */
function mediaHTML(product) {
    const fallback =
        '<div class="w-full h-72 bg-gradient-to-br from-negro-light to-vinotinto-dark/30 flex items-center justify-center">' +
            '<span class="text-6xl" aria-hidden="true">' + product.emoji + '</span>' +
        '</div>';

    if (!product.image) return fallback;

    return (
        '<img src="' + escapeHTML(product.image) + '" alt="' + escapeHTML(product.name) + '" ' +
            'class="w-full h-72 object-cover" ' +
            'loading="lazy" ' +
            'onerror="this.style.display=\'none\'; this.nextElementSibling.classList.remove(\'hidden\')">' +
        '<div class="hidden w-full h-72 bg-gradient-to-br from-negro-light to-vinotinto-dark/30 flex items-center justify-center">' +
            '<span class="text-6xl" aria-hidden="true">' + product.emoji + '</span>' +
        '</div>'
    );
}

/* Tarjeta de producto */
function buildCard(product, index) {
    const card = document.createElement('article');
    card.className =
        'card-zoom group relative flex flex-col bg-card-gradient rounded-2xl border border-dorado/10 shadow-card overflow-hidden hover:shadow-card-hover hover:border-dorado/25 transition-all duration-500 reveal';
    card.style.transitionDelay = (index * 80) + 'ms';

    const noteHTML = product.note
        ? '<div class="mt-4 pt-3 border-t border-dorado/10">' +
              '<p class="text-[11px] leading-snug text-dorado/60">' +
                  '<span aria-hidden="true">⚠ </span>' + escapeHTML(product.note) +
              '</p>' +
          '</div>'
        : '';

    card.innerHTML =
        '<div class="relative overflow-hidden shrink-0">' +
            mediaHTML(product) +
            '<span class="absolute top-4 left-4 bg-vinotinto/90 text-limpio text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-dorado/30">' +
                escapeHTML(product.tag) +
            '</span>' +
            '<span class="absolute top-4 right-4 bg-negro/70 text-dorado text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">' +
                escapeHTML(product.price) +
            '</span>' +
        '</div>' +
        '<div class="p-6 flex flex-col flex-1">' +
            '<span class="text-[10px] font-bold uppercase tracking-wider text-dorado/50 mb-1 block">' +
                escapeHTML(product.category) + ' · ' + escapeHTML(product.sublabel) +
            '</span>' +
            '<h3 class="text-lg font-bold text-limpio mb-2 group-hover:text-dorado transition-colors duration-300">' +
                escapeHTML(product.option) +
            '</h3>' +
            '<p class="text-sm text-gris-claro/50 mb-5 line-clamp-3">' +
                escapeHTML(product.description) +
            '</p>' +
            noteHTML +
            '<button type="button" data-product="' + escapeHTML(product.name) + '" ' +
                'class="mt-auto w-full py-3 bg-vinotinto/20 text-dorado font-semibold text-sm rounded-xl border border-dorado/30 ' +
                'hover:bg-vinotinto hover:text-limpio hover:border-vinotinto hover:shadow-vinotinto-md transition-all duration-300 cursor-pointer uppercase tracking-wider">' +
                'Encargar' +
            '</button>' +
        '</div>';

    return card;
}

/* Crea las tarjetas y conecta el botón "Encargar" */
function renderCards(list, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    list.forEach(function (product, index) {
        container.appendChild(buildCard(product, index));
    });

    // Botón "Encargar" → scroll suave a #pedido + autocompletar #producto
    container.querySelectorAll('[data-product]').forEach(function (button) {
        button.addEventListener('click', function () {
            const seleccion = this.getAttribute('data-product');
            if (typeof window.seleccionarProducto === 'function') {
                window.seleccionarProducto(seleccion);
            }
        });
    });

    // Re-observe new elements for scroll reveal
    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }
}

/* ----------------------------------------------------------
   4. RENDER DEL CATÁLOGO
   ---------------------------------------------------------- */
function renderCatalog(containerId) {
    renderCards(PRODUCTS, containerId || 'productGrid');
}

/* Filtrar por categoría */
function filterCatalog(category) {
    const list =
        !category || category === 'Todos'
            ? PRODUCTS
            : PRODUCTS.filter(function (p) {
                  return p.category === category;
              });

    renderCards(list, 'productGrid');
}

window.renderCatalog = renderCatalog;
window.filterCatalog = filterCatalog;
window.PRODUCTS = PRODUCTS;
window.PRICE_LIST = PRICE_LIST;
