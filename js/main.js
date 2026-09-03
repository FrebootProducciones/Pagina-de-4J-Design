(function () {
    'use strict';

    const TELEFONO = '1234567890';

    // ── Mobile Menu ──
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    window.closeMobileMenu = function () {
        if (mobileMenu) mobileMenu.classList.add('hidden');
    };

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-negro/95', 'shadow-lg');
                navbar.classList.remove('bg-negro/80');
            } else {
                navbar.classList.remove('bg-negro/95', 'shadow-lg');
                navbar.classList.add('bg-negro/80');
            }
        });
    }

    // ── Select product and scroll ──
    window.seleccionarProducto = function (nombreProducto) {
        const input = document.getElementById('producto');
        if (input) {
            input.value = nombreProducto;
            input.focus();
        }
        const pedido = document.getElementById('pedido');
        if (pedido) {
            pedido.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // ── Send to WhatsApp ──
    window.enviarWhatsApp = function () {
        const nombre = document.getElementById('nombre').value.trim();
        const producto = document.getElementById('producto').value.trim();
        const talla = document.getElementById('talla').value;
        const color = document.getElementById('color') ? document.getElementById('color').value : '';
        const detalles = document.getElementById('detalles').value.trim();
        const cantidad = document.getElementById('cantidad') ? document.getElementById('cantidad').value : '1';

        if (!nombre || !producto) {
            alert('Por favor completa los campos de nombre y producto.');
            return;
        }

        const lineas = [
            'Hola! Quisiera realizar un pedido:',
            '',
            `*Nombre:* ${nombre}`,
            `*Producto:* ${producto}`,
            `*Talla:* ${talla || 'No especificada'}`,
        ];

        if (color) lineas.push(`*Color:* ${color}`);
        if (cantidad && cantidad !== '1') lineas.push(`*Cantidad:* ${cantidad}`);
        if (detalles) lineas.push(`*Detalles:* ${detalles}`);

        lineas.push('', '— Enviado desde 4J Design');

        const mensaje = encodeURIComponent(lineas.join('\n'));
        window.open(`https://wa.me/${TELEFONO}?text=${mensaje}`, '_blank');
    };
})();
