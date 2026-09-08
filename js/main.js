/* ============================================================
   4J Design — Main JavaScript
   Menú móvil, scroll reveal, carousel, WhatsApp, filtros
   ============================================================ */

(function () {
    'use strict';

    /* ── Config ── */
    var TELEFONO = '1234567890'; // Cambiar al número real de WhatsApp

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
            input.focus();
            input.classList.add('input-focus');
        }
        var pedido = document.getElementById('pedido');
        if (pedido) {
            pedido.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    /* ===========================================================
       SEND TO WHATSAPP
       =========================================================== */
    window.enviarWhatsApp = function () {
        var nombre = document.getElementById('nombre');
        var producto = document.getElementById('producto');
        var talla = document.getElementById('talla');
        var color = document.getElementById('color');
        var detalles = document.getElementById('detalles');
        var cantidad = document.getElementById('cantidad');

        var nombreVal = nombre ? nombre.value.trim() : '';
        var productoVal = producto ? producto.value.trim() : '';
        var tallaVal = talla ? talla.value : '';
        var colorVal = color ? color.value : '';
        var detallesVal = detalles ? detalles.value.trim() : '';
        var cantidadVal = cantidad ? cantidad.value : '1';

        if (!nombreVal || !productoVal) {
            // Shake animation on empty fields
            if (!nombreVal && nombre) {
                nombre.style.borderColor = '#ef4444';
                setTimeout(function () { nombre.style.borderColor = ''; }, 2000);
            }
            if (!productoVal && producto) {
                producto.style.borderColor = '#ef4444';
                setTimeout(function () { producto.style.borderColor = ''; }, 2000);
            }
            alert('Por favor completa los campos de nombre y producto.');
            return;
        }

        var lineas = [
            'Hola! Quisiera realizar un pedido en *4J Design*:',
            '',
            '*Nombre:* ' + nombreVal,
            '*Producto:* ' + productoVal,
            '*Talla:* ' + (tallaVal || 'No especificada'),
        ];

        if (colorVal) lineas.push('*Color:* ' + colorVal);
        if (cantidadVal && cantidadVal !== '1') lineas.push('*Cantidad:* ' + cantidadVal);
        if (detallesVal) lineas.push('*Detalles:* ' + detallesVal);

        lineas.push('', '---', 'Enviado desde 4J Design');

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

        // Render catalog if container exists
        if (typeof renderCatalog === 'function') {
            renderCatalog('productGrid');
        }
    });

})();
