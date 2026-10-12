/* ============================================================
   4J Design — Main JavaScript
   Menú móvil, scroll reveal, carousel, WhatsApp, filtros
   ============================================================ */

(function () {
    'use strict';

    /* ── Config ── */
    var TELEFONO = '584127468362'; // WhatsApp 4J Design (formato internacional, sin espacios ni símbolos)

    /* ===========================================================
       MOBILE MENU
       =========================================================== */
    var menuToggle = document.getElementById('menuToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var menuOpen = false;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            menuOpen = !menuOpen;
            if (menuOpen) {
                mobileMenu.classList.remove('hidden');
                // Force reflow for animation
                void mobileMenu.offsetHeight;
                mobileMenu.classList.add('menu-open');
                menuToggle.classList.add('hamburger-active');
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.remove('menu-open');
                menuToggle.classList.remove('hamburger-active');
                menuToggle.setAttribute('aria-expanded', 'false');
                setTimeout(function () {
                    mobileMenu.classList.add('hidden');
                }, 400);
            }
        });
    }

    window.closeMobileMenu = function () {
        if (menuOpen && mobileMenu) {
            menuOpen = false;
            mobileMenu.classList.remove('menu-open');
            menuToggle.classList.remove('hamburger-active');
            menuToggle.setAttribute('aria-expanded', 'false');
            setTimeout(function () {
                mobileMenu.classList.add('hidden');
            }, 400);
        }
    };

    /* ===========================================================
       NAVBAR SCROLL EFFECT
       =========================================================== */
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }, { passive: true });
    }

    /* ===========================================================
       ACTIVE NAV LINK HIGHLIGHT
       =========================================================== */
    var navLinks = document.querySelectorAll('nav a[href^="#"]');
    var sections = [];

    function updateActiveLink() {
        var scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('text-dorado');
                    link.classList.add('text-gris-claro/70');
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('text-dorado');
                        link.classList.remove('text-gris-claro/70');
                    }
                });
            }
        });
    }

    document.querySelectorAll('section[id]').forEach(function (section) {
        sections.push(section);
    });

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    /* ===========================================================
       SCROLL REVEAL ANIMATIONS
       =========================================================== */
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback: show everything
            revealElements.forEach(function (el) {
                el.classList.add('revealed');
            });
        }
    }

    window.initScrollReveal = initScrollReveal;

    /* ===========================================================
       PRODUCT SELECTION (scroll to form)
       =========================================================== */
    window.seleccionarProducto = function (nombreProducto) {
        var input = document.getElementById('producto');
        if (input) {
            input.value = nombreProducto;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.classList.add('input-focus');
            input.focus({ preventScroll: true }); // el scroll lo controlamos abajo
            // Feedback visual: resalta brevemente el campo autocompletado
            input.style.borderColor = '#d4af37';
            setTimeout(function () { input.style.borderColor = ''; }, 1600);
        }

        var pedido = document.getElementById('pedido');
        if (pedido) {
            var offset = 80; // altura del navbar fijo
            var top = pedido.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        }
    };

    /* ===========================================================
       SEND TO WHATSAPP
       Genera un mensaje estructurado y lo abre en wa.me
       =========================================================== */

    /* Resalta en rojo un campo obligatorio que falta */
    function marcarCampoVacio(field) {
        if (!field) return;
        field.style.borderColor = '#ef4444';
        setTimeout(function () { field.style.borderColor = ''; }, 2000);
    }

    /* Los pedidos de DTF Solo no llevan prenda: no requieren talla ni color */
    function esPedidoDTF(texto) {
        return /^dtf\s*solo/i.test(String(texto || '').trim());
    }

    /* Ajusta las etiquetas de talla/color según el producto elegido */
    function actualizarEtiquetasPorProducto() {
        var producto = document.getElementById('producto');
        var lblTalla = document.querySelector('label[for="talla"]');
        var lblColor = document.querySelector('label[for="color"]');
        if (!producto) return false;

        var esDTF = esPedidoDTF(producto.value);
        if (lblTalla) lblTalla.textContent = esDTF ? 'Talla (no aplica en DTF)' : 'Talla *';
        if (lblColor) lblColor.textContent = esDTF ? 'Color de Prenda (no aplica en DTF)' : 'Color de Prenda';
        return esDTF;
    }

    window.enviarWhatsApp = function () {
        var nombre = document.getElementById('nombre');
        var producto = document.getElementById('producto');
        var talla = document.getElementById('talla');
        var color = document.getElementById('color');
        var detalles = document.getElementById('detalles');
        var cantidad = document.getElementById('cantidad');

        var nombreVal = nombre ? nombre.value.trim() : '';
        var productoVal = producto ? producto.value.trim() : '';
        var tallaVal = talla ? talla.value.trim() : '';
        var colorVal = color ? color.value.trim() : '';
        var detallesVal = detalles ? detalles.value.trim() : '';
        var cantidadVal = cantidad ? String(cantidad.value).trim() : '';

        var esDTF = esPedidoDTF(productoVal);

        /* ── Validación de campos obligatorios ── */
        var faltantes = [];

        if (!nombreVal) { faltantes.push('Cliente'); marcarCampoVacio(nombre); }
        if (!productoVal) { faltantes.push('Producto'); marcarCampoVacio(producto); }
        if (!esDTF && !tallaVal) { faltantes.push('Talla'); marcarCampoVacio(talla); }

        if (faltantes.length) {
            alert('Faltan datos obligatorios: ' + faltantes.join(', ') + '.\n\n' +
                (esDTF
                    ? 'En los pedidos de solo DTF solo necesitas el producto (A4, Tabloide, Medio metro o Un metro).'
                    : 'Para las prendas además del nombre y el producto necesitas indicar la talla.'));
            var mapa = { Cliente: nombre, Producto: producto, Talla: talla };
            var primerCampo = mapa[faltantes[0]];
            if (primerCampo && typeof primerCampo.focus === 'function') primerCampo.focus();
            return;
        }

        /* ── Cantidad (por defecto 1) ── */
        var cantidadNum = parseInt(cantidadVal, 10);
        if (!cantidadNum || cantidadNum < 1 || isNaN(cantidadNum)) cantidadNum = 1;
        cantidadVal = String(cantidadNum);

        /* ── Construcción del mensaje ── */
        var lineas = [
            '🛒 *NUEVO PEDIDO - 4J DESIGN* 🛒',
            '',
            '👤 *Cliente:* ' + nombreVal,
            '🛍️ *Producto:* ' + productoVal,
        ];

        if (esDTF) {
            // El DTF se pide solo por medidas ya establecidas: sin talla ni color de prenda
            lineas.push('📏 *Medida:* definida en el producto (impresión / transfer, sin prenda)');
        } else {
            lineas.push('👕 *Talla:* ' + tallaVal);
            lineas.push('🎨 *Color:* ' + (colorVal || 'Por definir'));
        }

        lineas.push('🔢 *Cantidad:* ' + cantidadVal);
        lineas.push('📝 *Detalles:* ' + (detallesVal || 'Sin detalles adicionales'));
        lineas.push('');
        lineas.push('¡Hola! Me gustaría confirmar este pedido.');

        var mensaje = encodeURIComponent(lineas.join('\n'));
        window.open('https://wa.me/' + TELEFONO + '?text=' + mensaje, '_blank');
    };

    /* ===========================================================
       TESTIMONIALS / GALLERY CAROUSEL
       =========================================================== */
    var carouselState = {
        current: 0,
        total: 0,
        autoPlayInterval: null,
    };

    function initCarousel() {
        var track = document.getElementById('carouselTrack');
        var dotsContainer = document.getElementById('carouselDots');
        if (!track) return;

        var slides = track.querySelectorAll('.carousel-slide');
        carouselState.total = slides.length;
        carouselState.current = 0;

        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (var i = 0; i < carouselState.total; i++) {
                var dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dot.dataset.index = i;
                dot.addEventListener('click', function () {
                    goToSlide(parseInt(this.dataset.index));
                });
                dotsContainer.appendChild(dot);
            }
        }

        goToSlide(0);
        startAutoPlay();
    }

    function goToSlide(index) {
        var track = document.getElementById('carouselTrack');
        if (!track) return;

        carouselState.current = index;
        var slideWidth = track.parentElement.offsetWidth;
        track.style.transform = 'translateX(-' + (index * slideWidth) + 'px)';

        // Update dots
        var dots = document.querySelectorAll('.carousel-dot');
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        var next = (carouselState.current + 1) % carouselState.total;
        goToSlide(next);
    }

    function prevSlide() {
        var prev = (carouselState.current - 1 + carouselState.total) % carouselState.total;
        goToSlide(prev);
    }

    function startAutoPlay() {
        stopAutoPlay();
        carouselState.autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        if (carouselState.autoPlayInterval) {
            clearInterval(carouselState.autoPlayInterval);
        }
    }

    window.carouselNext = function () {
        nextSlide();
        startAutoPlay();
    };

    window.carouselPrev = function () {
        prevSlide();
        startAutoPlay();
    };

    // Handle resize
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            goToSlide(carouselState.current);
        }, 250);
    });

    // Pause on hover
    var carouselContainer = document.getElementById('testimonialCarousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);

        // Touch support
        var touchStartX = 0;
        var touchEndX = 0;

        carouselContainer.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        carouselContainer.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            startAutoPlay();
        }, { passive: true });
    }

    /* ===========================================================
       CATALOG FILTER BUTTONS
       =========================================================== */
    function initFilterButtons() {
        var filterBtns = document.querySelectorAll('[data-filter]');
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) {
                    b.classList.remove('bg-vinotinto', 'text-limpio', 'border-dorado/40');
                    b.classList.add('bg-negro-card', 'text-gris-claro/60', 'border-dorado/10');
                });
                this.classList.add('bg-vinotinto', 'text-limpio', 'border-dorado/40');
                this.classList.remove('bg-negro-card', 'text-gris-claro/60', 'border-dorado/10');

                var category = this.dataset.filter;
                if (typeof filterCatalog === 'function') {
                    filterCatalog(category);
                }
            });
        });
    }

    /* ===========================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       =========================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = 80; // navbar height
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ===========================================================
       INITIALIZE
       =========================================================== */
    document.addEventListener('DOMContentLoaded', function () {
        initScrollReveal();
        initCarousel();
        initFilterButtons();

        // Talla/color solo aplican a prendas: en DTF Solo no son necesarios
        var campoProducto = document.getElementById('producto');
        if (campoProducto) {
            campoProducto.addEventListener('input', actualizarEtiquetasPorProducto);
            actualizarEtiquetasPorProducto();
        }

        // Render catalog if container exists
        if (typeof renderCatalog === 'function') {
            renderCatalog('productGrid');
        }
    });

})();
