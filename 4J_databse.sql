-- 1. ROLES Y USUARIOS (Autenticación y RBAC)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE -- 'administrador', 'vendedor'
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    rol_id INT NOT NULL REFERENCES roles(id),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CLIENTES
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL, -- Número de WhatsApp/Teléfono principal
    email VARCHAR(100),
    direccion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. STOCK / INVENTARIO
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL, -- ej: "Franela Anime Luffy"
    tecnica_estampado VARCHAR(50) NOT NULL, -- 'DTF', 'Sublimacion'
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE variantes_producto (
    id SERIAL PRIMARY KEY,
    producto_id INT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
    talla VARCHAR(10) NOT NULL, -- 'S', 'M', 'L', 'XL', 'Oversize'
    color VARCHAR(30) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock_actual INT NOT NULL DEFAULT 0 CHECK (stock_actual >= 0),
    sku VARCHAR(50) UNIQUE,
    CONSTRAINT uq_variante UNIQUE (producto_id, talla, color)
);

-- 4. PEDIDOS
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL REFERENCES clientes(id),
    usuario_id INT REFERENCES usuarios(id), -- Vendedor que procesó o registró el pedido
    estado VARCHAR(30) NOT NULL DEFAULT 'pendiente', -- 'pendiente', 'en_produccion', 'completado', 'cancelado'
    total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    observaciones TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE detalle_pedidos (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    variante_id INT NOT NULL REFERENCES variantes_producto(id),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2) NOT NULL -- Precio congelado al momento del pedido
);

-- 5. VENTAS (Facturación y Salida Efectiva de Caja/Stock)
CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    pedido_id INT UNIQUE REFERENCES pedidos(id), -- 1 a 1 con pedido (opcional si la venta proviene de un pedido)
    cliente_id INT NOT NULL REFERENCES clientes(id),
    usuario_id INT NOT NULL REFERENCES usuarios(id), -- Vendedor que cierra la venta
    metodo_pago VARCHAR(50) NOT NULL, -- 'Pago Movil', 'Zelle', 'Efectivo', etc.
    monto_total DECIMAL(10, 2) NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);